import { Component, OnDestroy, OnInit } from '@angular/core';
import * as rawData from '@data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from 'src/app/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page', // Selector for the component
  templateUrl: './tracks-page.component.html', // Template file
  styleUrl: './tracks-page.component.scss', // Stylesheet file
})
export class TracksPageComponent implements OnInit, OnDestroy {
  // Array to hold trending tracks
  public tracksTrending: Array<TrackModel> = [];
  // Array to hold random tracks
  public tracksRandom: Array<TrackModel> = [];

  // Array to hold subscriptions to observables
  listObservers$: Array<Subscription> = [];

  // Inject TrackService into the component
  constructor(private tracksService: TrackService) {}

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit(): void {
    // Subscribe to the trending tracks observable and update `tracksTrending` and `tracksRandom` when new data arrives
    const observer1$ = this.tracksService.dataTracksTrending$.subscribe(
      (response) => {
        this.tracksTrending = response;
        this.tracksRandom = response;
        console.log('Canciones trending =>', response); // Log the trending tracks to the console
      }
    );

    // Subscribe to the random tracks observable and update `tracksTrending` with concatenated data
    const observer2$ = this.tracksService.dataTracksRandom$.subscribe(
      (response) => {
        this.tracksTrending = [...this.tracksRandom, ...response]; // Concatenate the current and new tracks
        console.log('Canciones Random =>', response); // Log the random tracks to the console
      }
    );

    // Store the subscriptions in `listObservers$`
    this.listObservers$ = [observer1$, observer2$];
  }

  // Lifecycle hook that is called before the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from all observables to prevent memory leaks
    this.listObservers$.forEach((u) => u.unsubscribe());
  }
}
