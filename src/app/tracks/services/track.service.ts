import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TrackModel } from '@core/models/tracks.model';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { createLinkedSignal } from '@angular/core/primitives/signals';
import { ShazamSongDetailsDto } from '@shared/Models/ShazamSongDetailsDto';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  private skipById(
    listTracks: TrackModel[],
    id: number
  ): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter((a) => a._id !== id);
      resolve(listTmp);
    });
  }

  /**
   * data:[..1,..2,..3]
   *
   * @returns
   */
  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/api/tracks`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  /**
   *
   * @returns random songs
   */
  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/api/tracks`).pipe(
      mergeMap(({ data }: any) => this.skipById(data, 1)),
      catchError((err) => {
        console.error('something went wrong...', err);
        return of([]);
      })
    );
  }

  //getShazamDetails$() : Observable<TrackModel> {
  //  //const url = 'https://shazam.p.rapidapi.com/shazam-songs/get-details?id=40333609&locale=en-US';
  //  const url = 'assets/mock/mock-tracks.json'
  //  return this.httpClient
  //    .get(url, {
  //      headers: {
  //        'x-rapidapi-key':
  //          'd4ed69f6e0mshe373bdb43774fdap160ccbjsn5a99751e5b77',
  //        'x-rapidapi-host': 'shazam.p.rapidapi.com',
  //      },
  //    })
  //    .pipe(
  //      map((data: any) => {
  //        console.log('Shazam Service:', data);
  //        //return data
  //        return this.shazamParser(data);
  //      })
  //    );
  //}

  getShazamOverviewMusic$() : Observable<TrackModel[]> {
    //const url = 'https://shazam.p.rapidapi.com/shazam-songs/get-details?id=40333609&locale=en-US';
    const url = 'assets/mock/overview-music.json'
    return this.httpClient
      .get(url, {
        headers: {
          'x-rapidapi-key':
            'd4ed69f6e0mshe373bdb43774fdap160ccbjsn5a99751e5b77',
          'x-rapidapi-host': 'shazam.p.rapidapi.com',
        },
      })
      .pipe(
        map((data: any) => {
          console.log('Shazam Service:', data);
          //return data
          const response =  data.songs.map((song: ShazamSongDetailsDto) => {
            return this.shazamParser(song);
          })
          return response;
        })
      );
  }

  shazamParser(song : ShazamSongDetailsDto) : TrackModel  {
    const shazamResponse = song; /* your full object here */

    const songId = shazamResponse.data[0].id; // <-- get ID dynamically
    const songObject = shazamResponse.resources['shazam-songs'][songId]; // <-- now works for any song

    if (!songObject) { // <-- add safety
      console.error('Song object not found for ID:', songId, song);
      return {} as TrackModel;
    }

    const attrs = songObject.attributes; // <-- main song info

    const albumId = songObject.relationships.albums.data[0].id; // <-- album ID
    const albumObject = shazamResponse.resources.albums[albumId]; // <-- album info

    const artistId = songObject.relationships.artists.data[0].id; // <-- artist ID
    const artistObject = shazamResponse.resources.artists[artistId]; // <-- artist info

    const previewUrl = attrs.streaming.preview; // <-- song preview

    const track: TrackModel = {
      name: attrs.title, // "River Flows In You"
      album: albumObject.attributes.name, // "Yiruma 2nd Album 'First Love' (The Original & the Very First Recording)"
      cover: attrs.images.coverArt, // "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5f/f4/9b/5ff49b8c-d0bb-3748-14f4-131edfb332ce/first_love_3000.jpg/400x400cc.jpg"
      duration: 0, // <-- Not present, so set to 0 or undefined
      url: previewUrl, // song preview URL
      _id: songObject.id, // "40333609"
      //artist: {
      //  name: artistObject.attributes.name, // "Yiruma"
      //}, // <-- assuming ArtistModel has at least 'name'
    };
    return track;
  }
}
