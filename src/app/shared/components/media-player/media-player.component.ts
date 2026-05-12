import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  standalone: false,
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLElement>;

  public state: string = 'paused';
  public currentTrack: TrackModel | null = null;
  public progressBarValue: number = 0;

  private listObservers$: Subscription[] = [];

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const playerStatus$ = this.multimediaService.playerStatus$
      .subscribe((status: string) => (this.state = status));

    const trackInfo$ = this.multimediaService.trackInfo$
      .subscribe((track: TrackModel | null) => (this.currentTrack = track));

    const progress$ = this.multimediaService.playerPercentage$
      .subscribe((value: number) => (this.progressBarValue = value));

    this.listObservers$ = [playerStatus$, trackInfo$, progress$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((sub: Subscription) => sub.unsubscribe());
  }

  handlePosition(event: MouseEvent): void {
    const { clientX } = event;
    const elNative = this.progressBar.nativeElement;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX / width) * 100;

    this.multimediaService.seekAudio(percentageFromX);
  }
}
