import { Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';
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
  currentTrack!:any // TODO: Change any for TrackModel
  progressBarValue!:number;

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const playerStatusObserver$ = this.multimediaService.playerStatus$.subscribe((response) => {
      this.state = response});
    const trackInfoObserver$ = this.multimediaService.trackInfo$.subscribe((response) => this.currentTrack = response );
    const progressBarValueObserver$ = this.multimediaService.playerPercentage$.subscribe((response) => this.progressBarValue = response);

    this.listObservers$ = [playerStatusObserver$, trackInfoObserver$, progressBarValueObserver$]
  }

  handlePosition(event:MouseEvent):void {
    const { clientX } = event;
    const elNative:HTMLElement = this.progressBar.nativeElement;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = clickX / width * 100;
    console.log({percentageFromX});

    //this.multimediaService.audio.currentTime
    //console.log({mockCover: this.mockCover});
    console.log({progressBarValue: this.progressBarValue});
    console.log({currentTime: this.multimediaService.currentSong.currentTime});
    console.log(this.currentTrack);

    this.multimediaService.seekAudio(percentageFromX);
  }

  prueba():void {
    alert('prueba');
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((e) => e.unsubscribe());
  }
}
