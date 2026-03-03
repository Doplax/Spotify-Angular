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
          this.topTrack = tracks[0] ?? null;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    });
  }
}

