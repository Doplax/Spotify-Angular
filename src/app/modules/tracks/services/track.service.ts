import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackModel } from '@shared/Models/Tracks';
import { ItunesService } from '@shared/services/itunes.service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(private itunesService: ItunesService) {}

  /**
   * Gets the global iTunes top songs chart.
   *
   * @param limit - Number of top songs to fetch (default 25)
   * @returns Observable<TrackModel[]>
   */
  getOverviewTracks$(limit: number = 25): Observable<TrackModel[]> {
    return this.itunesService.getTopTracks$(limit);
  }

  /**
   * Searches for a track by term (replaces the artist-events / song-details flow).
   *
   * @param term - Artist name or song title
   * @param limit - Number of results
   * @returns Observable<TrackModel[]>
   */
  searchTracks$(term: string, limit: number = 15): Observable<TrackModel[]> {
    return this.itunesService.searchTracks$(term, limit);
  }

  /**
   * Gets a single track by its iTunes trackId.
   *
   * @param trackId - iTunes numeric track ID
   * @returns Observable<TrackModel | null>
   */
  getTrackById$(trackId: number): Observable<TrackModel | null> {
    return this.itunesService.getTrackById$(trackId);
  }
}
