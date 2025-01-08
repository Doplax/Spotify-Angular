import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  state = 'paused';
  mockCover!: TrackModel;

  listObservers$: Array<Subscription> = [];

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    this.multimediaService.trackInfo$.subscribe((response) => {
      console.log(response);
    })
  }

  ngOnDestroy(): void {
    console.log('BOOM');
    this.listObservers$.forEach((e) => e.unsubscribe());
  }
}
