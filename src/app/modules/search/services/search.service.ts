import { Injectable } from '@angular/core';
import { ItunesService } from '@shared/services/itunes.service';
import { TrackModel } from '@shared/Models/Tracks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private itunesService: ItunesService) {}

  /**
   * Searches for songs using the iTunes API and returns internal TrackModel objects.
   *
   * @param term - Search query
   * @param limit - Number of results (default 15)
   * @returns Observable<TrackModel[]>
   */
  search$(term: string, limit: number = 15): Observable<TrackModel[]> {
    return this.itunesService.searchTracks$(term, limit);
  }
}

