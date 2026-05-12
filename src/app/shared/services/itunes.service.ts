import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ItunesRssResponse,
  ItunesRssEntry,
  ItunesSearchResponse,
  ItunesTrack,
} from '@shared/Models/iTunes/ItunesSearchDTO';
import { TrackModel } from '@shared/Models/Tracks';
import { LoggerService } from '@shared/services/logger.service';

const MIN_SEARCH_LENGTH = 2;
const MAX_SEARCH_LENGTH = 100;
const MAX_RESULT_LIMIT = 200;
const COUNTRY_CODE_REGEX = /^[a-zA-Z]{2}$/;

@Injectable({ providedIn: 'root' })
export class ItunesService {
  private readonly BASE_URL = environment.itunesApi.baseUrl;

  constructor(private http: HttpClient, private logger: LoggerService) {}

  /**
   * Searches the iTunes API for songs matching the given term.
   *
   * @param term - Search query (artist, song, album...)
   * @param limit - Number of results to return (clamped to 1..200)
   * @param country - Two-letter ISO country code (default: 'us')
   * @returns Observable with the raw iTunes API response
   */
  search$(
    term: string,
    limit: number = 15,
    country: string = 'us'
  ): Observable<ItunesSearchResponse> {
    const cleanTerm = (term ?? '').trim();
    if (
      cleanTerm.length < MIN_SEARCH_LENGTH ||
      cleanTerm.length > MAX_SEARCH_LENGTH
    ) {
      return of({ resultCount: 0, results: [] });
    }

    const safeLimit = this.clampLimit(limit);
    const safeCountry = COUNTRY_CODE_REGEX.test(country) ? country : 'us';

    const url = `${this.BASE_URL}/search?term=${encodeURIComponent(
      cleanTerm
    )}&entity=song&limit=${safeLimit}&country=${safeCountry}`;

    return this.http.get<ItunesSearchResponse>(url).pipe(
      catchError((err: unknown) => {
        this.logger.error('[ItunesService] Error in search$', err);
        return of<ItunesSearchResponse>({ resultCount: 0, results: [] });
      })
    );
  }

  /**
   * Searches the iTunes API and maps the results to the internal TrackModel format.
   */
  searchTracks$(term: string, limit: number = 15): Observable<TrackModel[]> {
    return this.search$(term, limit).pipe(
      map((response: ItunesSearchResponse) =>
        response.results
          .filter((track: ItunesTrack) => !!track.previewUrl)
          .map((track: ItunesTrack) => this.itunesParser(track))
      )
    );
  }

  /**
   * Fetches top songs for a given genre using the iTunes RSS feed.
   * This is a free endpoint with no auth required.
   */
  getTopTracks$(limit: number = 25, genreId?: number): Observable<TrackModel[]> {
    const safeLimit = this.clampLimit(limit);
    const genre = genreId ? `genre=${genreId}/` : '';
    const rssUrl = `${this.BASE_URL}/us/rss/topsongs/${genre}limit=${safeLimit}/json`;

    return this.http.get<ItunesRssResponse>(rssUrl).pipe(
      switchMap((response: ItunesRssResponse) => {
        const entries: ItunesRssEntry[] = response?.feed?.entry ?? [];
        // Extract numeric iTunes track IDs from the RSS entries
        const ids: string[] = entries
          .map((e: ItunesRssEntry) => e?.id?.attributes?.['im:id'])
          .filter((id): id is string => Boolean(id));

        if (!ids.length) return of<TrackModel[]>([]);

        // Batch lookup: one request to get full track data including previewUrl
        const lookupUrl = `${this.BASE_URL}/lookup?id=${ids.join(',')}&entity=song`;
        return this.http.get<ItunesSearchResponse>(lookupUrl).pipe(
          map((res: ItunesSearchResponse) =>
            res.results
              .filter((r: ItunesTrack) => r.wrapperType === 'track' && !!r.previewUrl)
              .map((r: ItunesTrack) => this.itunesParser(r))
          ),
          catchError((err: unknown) => {
            this.logger.error('[ItunesService] Error in getTopTracks$ lookup', err);
            return of<TrackModel[]>([]);
          })
        );
      }),
      catchError((err: unknown) => {
        this.logger.error('[ItunesService] Error in getTopTracks$ rss', err);
        return of<TrackModel[]>([]);
      })
    );
  }

  /**
   * Looks up a specific track by its iTunes trackId.
   */
  getTrackById$(trackId: number): Observable<TrackModel | null> {
    const url = `${this.BASE_URL}/lookup?id=${trackId}&entity=song`;

    return this.http.get<ItunesSearchResponse>(url).pipe(
      map((response: ItunesSearchResponse) => {
        const track = response.results.find((r: ItunesTrack) => r.wrapperType === 'track');
        return track ? this.itunesParser(track) : null;
      }),
      catchError((err: unknown) => {
        this.logger.error('[ItunesService] Error in getTrackById$', err);
        return of<TrackModel | null>(null);
      })
    );
  }

  /**
   * Converts a raw ItunesTrack (from /search endpoint) into the internal TrackModel.
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
   */
  itunesRssParser(entry: ItunesRssEntry): TrackModel {
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

  private clampLimit(limit: number): number {
    if (!Number.isFinite(limit) || limit < 1) return 15;
    return Math.min(Math.floor(limit), MAX_RESULT_LIMIT);
  }
}
