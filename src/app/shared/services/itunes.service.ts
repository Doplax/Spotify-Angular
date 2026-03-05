import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItunesSearchResponse, ItunesTrack } from '@shared/Models/iTunes/ItunesSearchDTO';
import { TrackModel } from '@shared/Models/Tracks';

@Injectable({ providedIn: 'root' })
export class ItunesService {
  private readonly BASE_URL = environment.itunesApi.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Searches the iTunes API for songs matching the given term.
   *
   * @param term - Search query (artist, song, album...)
   * @param limit - Number of results to return (max 200)
   * @param country - Two-letter ISO country code (default: 'us')
   * @returns Observable with the raw iTunes API response
   *
   * @example
   * search$('bad bunny', 10)
   */
  search$(
    term: string,
    limit: number = 15,
    country: string = 'us'
  ): Observable<ItunesSearchResponse> {
    const url = `${this.BASE_URL}/search?term=${encodeURIComponent(term)}&entity=song&limit=${limit}&country=${country}`;

    return this.http.get<ItunesSearchResponse>(url).pipe(
      catchError((err) => {
        console.error('[ItunesService] Error in search$', err);
        return of({ resultCount: 0, results: [] });
      })
    );
  }

  /**
   * Searches the iTunes API and maps the results to the internal TrackModel format.
   *
   * @param term - Search query
   * @param limit - Number of results
   * @returns Observable<TrackModel[]>
   */
  searchTracks$(term: string, limit: number = 15): Observable<TrackModel[]> {
    return this.search$(term, limit).pipe(
      map((response) =>
        response.results
          .filter((track) => !!track.previewUrl)
          .map((track) => this.itunesParser(track))
      )
    );
  }

  /**
   * Fetches top songs for a given genre using the iTunes RSS feed.
   * This is a free endpoint with no auth required.
   *
   * @param limit - Number of top songs to fetch (max 200)
   * @param genreId - iTunes genre ID (optional). Omit for all genres.
   * @returns Observable<TrackModel[]>
   *
   * @example
   * getTopTracks$(25)
   */
  getTopTracks$(limit: number = 25, genreId?: number): Observable<TrackModel[]> {
    const genre = genreId ? `genre=${genreId}/` : '';
    const rssUrl = `${this.BASE_URL}/us/rss/topsongs/${genre}limit=${limit}/json`;

    return this.http.get<any>(rssUrl).pipe(
      switchMap((response) => {
        const entries: any[] = response?.feed?.entry ?? [];
        // Extract numeric iTunes track IDs from the RSS entries
        const ids: string[] = entries
          .map((e) => e?.id?.attributes?.['im:id'])
          .filter(Boolean);

        if (!ids.length) return of([]);

        // Batch lookup: one request to get full track data including previewUrl
        const lookupUrl = `${this.BASE_URL}/lookup?id=${ids.join(',')}&entity=song`;
        return this.http.get<ItunesSearchResponse>(lookupUrl).pipe(
          map((res) =>
            res.results
              .filter((r) => r.wrapperType === 'track' && !!r.previewUrl)
              .map((r) => this.itunesParser(r))
          ),
          catchError((err) => {
            console.error('[ItunesService] Error in getTopTracks$ lookup', err);
            return of([]);
          })
        );
      }),
      catchError((err) => {
        console.error('[ItunesService] Error in getTopTracks$ rss', err);
        return of([]);
      })
    );
  }

  /**
   * Looks up a specific track by its iTunes trackId.
   *
   * @param trackId - iTunes numeric track ID
   * @returns Observable<TrackModel | null>
   */
  getTrackById$(trackId: number): Observable<TrackModel | null> {
    const url = `${this.BASE_URL}/lookup?id=${trackId}&entity=song`;

    return this.http.get<ItunesSearchResponse>(url).pipe(
      map((response) => {
        const track = response.results.find((r) => r.wrapperType === 'track');
        return track ? this.itunesParser(track) : null;
      }),
      catchError((err) => {
        console.error('[ItunesService] Error in getTrackById$', err);
        return of(null);
      })
    );
  }

  /**
   * Converts a raw ItunesTrack (from /search endpoint) into the internal TrackModel.
   *
   * @param track - Raw iTunes track object
   * @returns TrackModel
   */
  itunesParser(track: ItunesTrack): TrackModel {
    // Use the highest available artwork resolution and replace 100x100 with 300x300
    const cover = track.artworkUrl100.replace('100x100', '300x300');

    return {
      _id: track.trackId,
      name: track.trackName,
      album: track.collectionName,
      cover,
      url: track.previewUrl,
      artist: {
        name: track.artistName,
        nickname: track.artistName,
        nationality: track.country,
        cover,
      },
    };
  }

  /**
   * Converts a raw iTunes RSS feed entry into the internal TrackModel.
   * RSS entries have a different shape from the /search response.
   *
   * @param entry - Raw RSS feed entry object
   * @returns TrackModel
   */
  itunesRssParser(entry: any): TrackModel {
    const cover: string = entry['im:image']?.[2]?.label ?? '';
    const artistName: string = entry['im:artist']?.label ?? '';

    return {
      _id: entry.id?.attributes?.['im:id'] ?? 0,
      name: entry['im:name']?.label ?? '',
      album: entry['im:collection']?.['im:name']?.label ?? '',
      cover,
      url: entry?.link?.attributes?.href ?? '',
      artist: {
        name: artistName,
        nickname: artistName,
        nationality: '',
        cover,
      },
    };
  }
}
