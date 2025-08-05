import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
import { CardPlayerMode } from '@shared/enums';

@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrl: './tracks-page.component.scss',
    standalone: false
})
export class TracksPageComponent implements OnInit, OnDestroy {
  public tracksTrending: Array<TrackModel> = [];
  public tracksRandom: Array<TrackModel> = [];
  public tracksPrueba: TrackModel[] = [];

  public isLoading: boolean = false;
  public CardPlayerMode = CardPlayerMode

  listObservers$: Array<Subscription> = [];

  constructor(
    private trackService: TrackService,
  ) {}

  ngOnInit(): void {
    this.loadDataAll();
  }

  getOverviewTracks(): void {
    this.isLoading = true;
    this.trackService.getOverviewTracks$().subscribe({
      next: (tracks) => {
        this.tracksPrueba = tracks;
      },
      error: (err) => {
        console.error('Error loading tracks', err);
        this.tracksPrueba = [];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  async loadDataAll(): Promise<void> {
    this.isLoading = true;
    try {
      this.getOverviewTracks()
      //const [trending, random] = await Promise.all([
      //  this.trackService.getAllTracks$().toPromise(),
      //  this.trackService.getAllRandom$().toPromise()
      //]);

      //this.tracksTrending = trending;
      //this.tracksRandom = random;
    } catch (e) {
      console.error('Error loading tracks', e);
      this.tracksTrending = [];
      this.tracksRandom = [];
      this.tracksPrueba = [];
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {}
}
