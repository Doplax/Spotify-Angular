import { Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.scss'],
    standalone: false
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObservers$: Array<Subscription> = [];
  state: string = 'paused';
  mockCover!: TrackModel;


  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const playerStatusObserver$ = this.multimediaService.playerStatus$.subscribe((response) => {
      this.state = response
    });

    this.listObservers$ = [playerStatusObserver$]
  }

  handlePosition(event:MouseEvent):void {
    const { clientX } = event;
    const elNative:HTMLElement = this.progressBar.nativeElement;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = clickX / width * 100;
    this.multimediaService.seekAudio(percentageFromX);
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((e) => e.unsubscribe());
  }
}
