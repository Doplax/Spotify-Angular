import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@shared/Models/Tracks';
import { ShazamSongDetailsDto } from '@shared/Models/Shazam/ShazamSongDetailsDTO';

@Injectable({ providedIn: 'root' })
export class ShazamService {
  private readonly BASE_URL = environment.shazamApi.baseUrl;
  private readonly HEADERS = environment.shazamApi.headers;

  constructor(private http: HttpClient) {}


  // --------- CUSTOM ----------
  public readonly custom = {
    //Provisional Custom Endpoint
    getOverviewTracks$: (): Observable<TrackModel[]> => {
      const url = `${this.BASE_URL}/overview.json`;

      return this.http.get(url, { headers: this.HEADERS }).pipe(
        map((data: any) => data),
        catchError((err) => of([]))
      );
    },
  };

  // --------- OVERVIEW ----------
  public readonly overView = {

    getListEvents$: (
      artistId: string,
      locale: string = 'en-US',
      from?: string,
      to?: string,
      limit: number = 50,
      offset: number = 0
    ): Observable<any> => {
      let params = `artistId=${artistId}&l=${locale}&limit=${limit}&offset=${offset}`;
      if (from) params += `&from=${from}`;
      if (to) params += `&to=${to}`;

      // const url = `${this.BASE_URL}/shazam-events/list`;
      const url = `${this.BASE_URL}/shazam-events/list.json`; // !Mocked

      return this.http.get(url, { headers: this.HEADERS }).pipe(
        map((data: any) => data),
        catchError((err) => of([]))
      );
    },

    search$: (
      term: string,
      locale: string = 'en-US',
      offset: number = 0,
      limit: number = 5
    ): Observable<any> => {
      const url = environment.production
        ? `${environment.shazamApi.baseUrl}/search?term=${encodeURIComponent(term )}&locale=${locale}&offset=${offset}&limit=${limit}`
        : `${environment.shazamApi.baseUrl}/search.json`; // Mocked URL

      return this.http.get(url, { headers: this.HEADERS }).pipe(
        map((data: any) => data),
        catchError((err) => {
          console.error('Error in search$', err);
          return of([]);
        })
      );
    },
  };

  // --------- SONGS ----------
  public readonly songs = {};

  // --------- CHART ----------
  public readonly chart = {};

  // --------- ARTISTS ----------
  public readonly artists = {};

  // --------- SHAZAM SONGS ----------
  public readonly shazamSongs = {

    getSongDetails$: (
      id: string,
      locale: string = 'en-US'
    ): Observable<any> => {

      const url = environment.production
        ? `${this.BASE_URL}/shazam-songs/get-details?id=${id}&locale=${locale}`
        : `${this.BASE_URL}/shazam-songs/get-details.json`; // Mocked

      return this.http.get(url, { headers: this.HEADERS }).pipe(
        map((data) => data),
        catchError((err) => {
          console.error('Error in getSongDetails$', err);
          return [];
        })
      );
    },

    getListSimilarities$: (
      similarityId: string,
      locale: string = 'en-US'
    ): Observable<any> => {

      const url = environment.production
        ? `${this.BASE_URL}/shazam-songs/list-similarities?id=${similarityId}&locale=${locale}`
        : `${this.BASE_URL}/shazam-songs/list-similarities.json`;

      return this.http.get(url, { headers: this.HEADERS }).pipe(
        map((data) => data),
        catchError((err) => {
          console.error('Error in getSimilarities$', err);
          return [];
        })
      );
    },
  };

  public readonly albums = {
    getAlbumDetails$:(id: string, locale: string = 'en-US'): Observable<any> =>{

      const url = environment.production
      ? `${this.BASE_URL}/albums/get-details?id=${id}&l=${locale}`
      : `${this.BASE_URL}/albums/get-details.json`;

      return this.http.get(url, { headers: this.HEADERS }).pipe(
        map((data: any) => data),
        catchError((err) => {
          console.error('Error in getAlbumDetails$', err);
          return of([]);
        })
      );
    },

    getAlbumRelatedArtist$:(
      id: string,
      locale: string = 'en-US'
    ): Observable<any> =>{

      const url = environment.production
        ? `${this.BASE_URL}/albums/get-related-artist?id=${id}&l=${locale}`
        : `${this.BASE_URL}/albums/get-related-artist.json`

      return this.http.get(url, { headers: this.HEADERS }).pipe(
        map((data: any) => data),
        catchError((err) => {
          console.error('Error in getAlbumRelatedArtist$', err);
          return of([]);
        })
      );
    }
  };





  // PARSER
  shazamParser(shazamResponse: ShazamSongDetailsDto): TrackModel {
    const songId = shazamResponse.data[0].id; // Example: "40333609"
    const songObject = shazamResponse.resources['shazam-songs'][songId];

    if (!songObject) {
      console.error('Song object not found for ID:', songId, shazamResponse);
      return {} as TrackModel;
    }

    const attrs = songObject.attributes;
    const albumId = songObject.relationships.albums.data[0].id;
    const albumObject = shazamResponse.resources.albums[albumId];
    const artistId = songObject.relationships.artists.data[0].id;
    const previewUrl = attrs.streaming.preview;
    const artistObject = shazamResponse.resources.artists[artistId];

    const track: TrackModel = {
      name: attrs.title,
      album: albumObject.attributes.name,
      cover: attrs.images.coverArt,
      url: previewUrl,
      _id: songObject.id,
    };

    return track;
  }
}
