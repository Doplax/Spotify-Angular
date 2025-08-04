import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from 'src/app/tracks/services/track.service';
import { Subscription } from 'rxjs';

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

  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    //this.loadDataAll();
    this.getOverviewMusic();
  }

  getOverviewMusic(){
    this.trackService.getShazamOverviewMusic$().subscribe({
      next: (data) => {
        console.log('Shazam Component:', data);
        debugger
        this.tracksPrueba = data;
      },
      error: (error) => {
        console.error('Error fetching Shazam details:', error);
      }
    });
  }

  async loadDataAll(): Promise<void> {
    this.isLoading = true;
    try {
      const [trending, random] = await Promise.all([
        this.trackService.getAllTracks$().toPromise(),
        this.trackService.getAllRandom$().toPromise()
      ]);

      this.tracksTrending = trending;
      this.tracksRandom = random;
    } catch (e) {
      console.error('Error loading tracks', e);
      this.tracksTrending = [];
      this.tracksRandom = [];
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {}
}
