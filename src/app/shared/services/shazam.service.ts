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

  //Provisional Custom Endpoint
  getOverviewTracks$(): Observable<TrackModel[]> {
    const url = `${this.BASE_URL}/overview.json`;

    return this.http.get(url, { headers: this.HEADERS }).pipe(
      map((data: any) => data),
      catchError((err) => of([]))
    );
  }

  /**
   * Fetches a list of Shazam events for a given artist.
   *
   * @param artistId - The unique identifier for the artist.
   * @param locale - The language code (default: 'en-US').
   * @param from - The start date for filtering events (optional).
   * @param to - The end date for filtering events (optional).
   * @param limit - The maximum number of events to return (default: 50).
   * @param offset - The starting index for pagination (default: 0).
   * @returns Observable containing the API response.
   *
   * @example
   * getListEvents$('73406786', 'en-US', '2022-12-31', '2023-01-15', 50, 0)
   * // Returns: Observable<any> with response data
   */
  getListEvents$(
    artistId: string,
    locale: string = 'en-US',
    from?: string,
    to?: string,
    limit: number = 50,
    offset: number = 0
  ): Observable<any> {
    let params = `artistId=${artistId}&l=${locale}&limit=${limit}&offset=${offset}`;
    if (from) params += `&from=${from}`;
    if (to) params += `&to=${to}`;

    // const url = `${this.BASE_URL}/shazam-events/list`;
    const url = `${this.BASE_URL}/shazam-events/list.json`; // !Mocked

    return this.http.get(url, { headers: this.HEADERS }).pipe(
      map((data: any) => data),
      catchError((err) => of([]))
    );
  }

  /**
   * Searches for tracks, artists, and albums using the Shazam API.
   *
   * @param term - The search term to look for (e.g. song title, artist name).
   * @param locale - The language code (default: 'en-US').
   * @param offset - The starting index for pagination (default: 0).
   * @param limit - The maximum number of results to return (default: 5).
   * @returns Observable containing the search results.
   *
   * @example
   * search$('kiss the rain', 'en-US', 0, 5)
   * // Returns: Observable with search results
   */
  search$(
    term: string,
    locale: string = 'en-US',
    offset: number = 0,
    limit: number = 5
  ): Observable<any> {
    const url = environment.production
    ? `${environment.shazamApi.baseUrl}/search?term=${encodeURIComponent(term)}&locale=${locale}&offset=${offset}&limit=${limit}`
    : `${environment.shazamApi.baseUrl}/search.json`; // Mocked URL

    console.log(this.HEADERS);
    return this.http.get(url, { headers: this.HEADERS }).pipe(
      map((data: any) => data),
      catchError((err) => {
        console.error('Error in search$', err);
        return of([]);
      })
    );
  }

  /**
   * Gets detailed information about a specific song from Shazam API.
   *
   * @param id - The unique identifier for the song.
   * @param locale - The language code (default: 'en-US').
   * @returns Observable containing the song details.
   *
   * @example
   * getSongDetails$('40333609', 'en-US')
   * // Returns: Observable with song details
   */
  getSongDetails$(id: string, locale: string = 'en-US'): Observable<any> {
    // const url = `${this.BASE_URL}/shazam-songs/get-details?id=${id}&locale=${locale}`;
    const url = `${this.BASE_URL}/shazam-songs/get-details.json`; // !Mocked

    return this.http.get(url, { headers: this.HEADERS }).pipe(
      map((data) => data),
      catchError((err) => {
        console.error('Error in getSongDetails$', err);
        return [];
      })
    );
  }

  /**
   * Gets similar tracks for a given song from Shazam API.
   *
   * @param similarityId - The similarity identifier for the song.
   * @param locale - The language code (default: 'en-US').
   * @returns Observable containing similar tracks data.
   *
   * @example
   * getSimilarities$('track-similarities-id-424767377', 'en-US')
   * // Returns: Observable with similar tracks
   */
  getSimilarities$(
    similarityId: string,
    locale: string = 'en-US'
  ): Observable<any> {
    // const url = `${this.BASE_URL}/shazam-songs/list-similarities?id=${similarityId}&locale=${locale}`;
    const url = `${this.BASE_URL}/shazam-songs/list-similarities.json`; // !Mocked

    return this.http.get(url, { headers: this.HEADERS }).pipe(
      map((data) => data),
      catchError((err) => {
        console.error('Error in getSimilarities$', err);
        return [];
      })
    );
  }

  /**
   * Gets detailed information about a specific album from Shazam API.
   *
   * @param id - The unique identifier for the album.
   * @param locale - The language code (default: 'en-US').
   * @returns Observable containing the album details.
   *
   * @example
   * getAlbumDetails$('850576570', 'en-US')
   * // Returns: Observable with album details
   */
  getAlbumDetails$(id: string, locale: string = 'en-US'): Observable<any> {
    // const url = `${this.BASE_URL}/albums/get-details?id=${id}&l=${locale}`;
    const url = `${this.BASE_URL}/albums/get-details.json`; // !Mocked

    return this.http.get(url, { headers: this.HEADERS }).pipe(
      map((data: any) => data),
      catchError((err) => {
        console.error('Error in getAlbumDetails$', err);
        return of([]);
      })
    );
  }

  /**
   * Gets related artist information for a specific album from Shazam API.
   *
   * @param id - The unique identifier for the album.
   * @param locale - The language code (default: 'en-US').
   * @returns Observable containing the related artist information.
   *
   * @example
   * getAlbumRelatedArtist$('850569437', 'en-US')
   * // Returns: Observable with related artist data
   */
  getAlbumRelatedArtist$(
    id: string,
    locale: string = 'en-US'
  ): Observable<any> {
    // const url = `${this.BASE_URL}/albums/get-related-artist?id=${id}&l=${locale}`;
    const url = `${this.BASE_URL}/albums/get-related-artist.json`; // !Mocked

    return this.http.get(url, { headers: this.HEADERS }).pipe(
      map((data: any) => data),
      catchError((err) => {
        console.error('Error in getAlbumRelatedArtist$', err);
        return of([]);
      })
    );
  }

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
