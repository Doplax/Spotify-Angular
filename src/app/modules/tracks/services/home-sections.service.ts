import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItunesService } from '@shared/services/itunes.service';
import {
  HOME_SECTIONS,
  HomeSection,
  HomeSectionConfig,
} from '@modules/tracks/models/home-sections.model';

@Injectable({ providedIn: 'root' })
export class HomeSectionsService {
  constructor(private itunesService: ItunesService) {}

  /**
   * Fetches all home sections in parallel.
   * Each section uses the iTunes top-songs RSS feed filtered by genre.
   *
   * @returns Observable that emits the full array of HomeSection objects
   *         once ALL requests have resolved.
   */
  loadAllSections$(): Observable<HomeSection[]> {
    const requests$ = HOME_SECTIONS.map((config: HomeSectionConfig) =>
      this.itunesService.getTopTracks$(config.limit, config.genreId).pipe(
        map((tracks) => ({
          ...config,
          tracks,
          isLoading: false,
        } as HomeSection))
      )
    );

    return forkJoin(requests$);
  }
}
