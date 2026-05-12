import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';
import { CardPlayerMode } from '@shared/enums';

@Component({
  selector: 'shared-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPlayerComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean = false;
  @Input() mode: CardPlayerMode = CardPlayerMode.Small;
  @Input() track!: TrackModel;

  public readonly CardPlayerMode = CardPlayerMode;
  public isPlaying: boolean = false;
  public trackInfo: TrackModel | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private multimediaService: MultimediaService) {}

  ngOnInit(): void {
    this.multimediaService.playerStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: string) => {
        this.isPlaying = status === 'playing';
      });

    this.multimediaService.trackInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((track: TrackModel | null) => {
        this.trackInfo = track;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  playSong(track: TrackModel): void {
    this.multimediaService.trackInfo$.next(track);
  }

  tooglePlay(): void {
    this.multimediaService.tooglePlayer();
  }
}
