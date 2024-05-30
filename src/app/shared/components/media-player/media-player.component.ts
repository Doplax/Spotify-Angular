import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from "@shared/services/multimedia.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  state = 'paused';
  mockCover: any = {
    cover: 'https://m.media-amazon.com/images/I/51OfTDxHYuL._UXNaN_FMjpg_QL85_.jpg',
    title: 'Rap Sin Corte',
    name: 'Rap Sin Corte V',
  };

  listObservers$: Array<Subscription> = [];

  constructor( private multimediaService:MultimediaService) {}

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log('Recibiendo canción...', response);
      }
    )

    const observer2$: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log('Recibiendo canción...', response);
      }
    )

    this.listObservers$ = [ observer1$, observer2$]
  }

  ngOnDestroy(): void {
    console.log('BOOM');
    this.listObservers$.forEach( e => e.unsubscribe() )
  }


}
