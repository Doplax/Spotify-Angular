import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';
import { SearchService } from '@modules/search/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { CardPlayerMode } from '@shared/enums';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss',
    standalone: false
})
export class SearchPageComponent implements OnInit {
  public tracks: TrackModel[] = [];
  public topTrack: TrackModel | null = null;
  public CardPlayerMode = CardPlayerMode;
  public isLoading: boolean = false;
  public searchTerm: string = '';

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.receiveData();
  }

  receiveData(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const term = params.get('term') || '';
      this.searchTerm = term;

      if (!term) return;

      this.isLoading = true;
      this.searchService.search$(term).subscribe({
        next: (tracks) => {
          this.tracks = tracks;
          // Find the most frequent artist and use their first track for the card
          this.topTrack = this.getTopArtistTrack(tracks);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    });
  }

  /**
   * Returns the first track of the artist that appears most frequently
   * in the search results — that's the most relevant artist for the query.
   */
  private getTopArtistTrack(tracks: TrackModel[]): TrackModel | null {
    if (!tracks.length) return null;

    const countMap = new Map<string, number>();
    for (const t of tracks) {
      const name = t.artist?.name ?? '';
      countMap.set(name, (countMap.get(name) ?? 0) + 1);
    }

    let topArtist = '';
    let maxCount = 0;
    countMap.forEach((count, name) => {
      if (count > maxCount) { maxCount = count; topArtist = name; }
    });

    return tracks.find((t) => (t.artist?.name ?? '') === topArtist) ?? tracks[0];
  }
}

