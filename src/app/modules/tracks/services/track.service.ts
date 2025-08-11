import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TrackModel } from '@shared/Models/Tracks';
import { ShazamSongDetailsDto } from '@shared/Models/Shazam/ShazamSongDetailsDTO';
import { ShazamService } from '@shared/services/shazam.service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {

  constructor(private shazamService: ShazamService) {}

  getOverviewTracks$(){
    return this.shazamService.getOverviewTracks$().pipe(
      map((data: any) =>  {
        console.log('Tracks Service:', data.songs);

        return data.songs.map((track: any) => {
          //console.log('Tracks Service:', track);
          return this.shazamService.shazamParser(track);
        });
      }),)
  }

  /**
   * Gets artist events using ShazamService, and processes them if needed.
   *
   * @param artistId - The unique identifier for the artist.
   * @param locale - The language code.
   * @param from - The start date for events (optional).
   * @param to - The end date for events (optional).
   * @param limit - Max events to return.
   * @param offset - Starting index for pagination.
   * @returns Observable with processed events data.
   *
   * @example
   * getArtistEvents$('73406786', 'en-US', '2022-12-31', '2023-01-15', 50, 0)
   */
  getArtistEvents$(
    artistId: string,
    locale: string = 'en-US',
    from?: string,
    to?: string,
    limit: number = 50,
    offset: number = 0
  ): Observable<any> {
    return this.shazamService
      .getListEvents$(artistId, locale, from, to, limit, offset)
      .pipe(
        map((data) => {
          // Process data if needed
          return data;
        })
      );
  }

  /**
   * Searches for tracks, artists, and albums using Shazam API.
   *
   * @param term - The search term to look for.
   * @param locale - The language code.
   * @param offset - Starting index for pagination.
   * @param limit - Max results to return.
   * @returns Observable with processed search results.
   *
   * @example
   * search$('kiss the rain', 'en-US', 0, 5)
   */
  search$(
    term: string,
    locale: string = 'en-US',
    offset: number = 0,
    limit: number = 5
  ): Observable<any> {
    return this.shazamService.search$(term, locale, offset, limit).pipe(
      map((data) => {
        // Process search results if needed
        return data;
      })
    );
  }

  /**
   * Gets detailed information about a specific song from Shazam API.
   *
   * @param id - The unique identifier for the song.
   * @param locale - The language code.
   * @returns Observable with processed song details, optionally converted to TrackModel.
   *
   * @example
   * getSongDetails$('40333609', 'en-US')
   */
  getSongDetails$(id: string, locale: string = 'en-US'): Observable<any> {
    return this.shazamService.getSongDetails$(id, locale).pipe(
      map((data) => {
        // You could convert to TrackModel here if needed
        // const track = this.shazamParser(data);
        return data;
      })
    );
  }

  /**
   * Gets similar tracks for a given song from Shazam API.
   *
   * @param similarityId - The similarity identifier for the song.
   * @param locale - The language code.
   * @returns Observable with processed similar tracks data.
   *
   * @example
   * getSimilarities$('track-similarities-id-424767377', 'en-US')
   */
  getSimilarities$(
    similarityId: string,
    locale: string = 'en-US'
  ): Observable<any> {
    return this.shazamService.getSimilarities$(similarityId, locale).pipe(
      map((data) => {
        // Process similar tracks data if needed
        return data;
      })
    );
  }

  /**
   * Gets detailed information about a specific album from Shazam API.
   *
   * @param id - The unique identifier for the album.
   * @param locale - The language code.
   * @returns Observable with processed album details.
   *
   * @example
   * getAlbumDetails$('850576570', 'en-US')
   */
  getAlbumDetails$(id: string, locale: string = 'en-US'): Observable<any> {
    return this.shazamService.getAlbumDetails$(id, locale).pipe(
      map((data) => {
        // Process album details if needed
        return data;
      })
    );
  }

  /**
   * Gets related artist information for a specific album from Shazam API.
   *
   * @param id - The unique identifier for the album.
   * @param locale - The language code.
   * @returns Observable with processed related artist data.
   *
   * @example
   * getAlbumRelatedArtist$('850569437', 'en-US')
   */
  getAlbumRelatedArtist$(
    id: string,
    locale: string = 'en-US'
  ): Observable<any> {
    return this.shazamService.getAlbumRelatedArtist$(id, locale).pipe(
      map((data) => {
        // Process related artist data if needed
        return data;
      })
    );
  }

  /**
   * Parses Shazam song details and converts them to TrackModel format.
   *
   * @param song - Shazam song details response
   * @returns TrackModel formatted object
   */

}
