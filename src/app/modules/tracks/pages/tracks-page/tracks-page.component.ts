import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from 'src/app/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.scss',
})
export class TracksPageComponent implements OnInit, OnDestroy {
  public tracksTrending: Array<TrackModel> = [];
  public tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private tracksService: TrackService) {}

  ngOnInit(): void {
    this.tracksService.getAllTracks$().subscribe(
      response => { console.log(response) }
    )
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((u) => u.unsubscribe());
  }
}
