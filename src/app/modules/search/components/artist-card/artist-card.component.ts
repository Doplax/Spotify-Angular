import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'search-artist-card',
  styleUrl: './artist-card.component.scss',
  templateUrl: './artist-card.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistCardComponent implements OnInit, OnDestroy {
  /** First track whose artist info drives the card display */
  @Input() firstTrack!: TrackModel;

  public avatar: string = '';
  public artistName: string = '';
  public isPlaying: boolean = false;

  private readonly destroy$ = new Subject<void>();

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    this.avatar = this.firstTrack.cover;
    this.artistName = this.firstTrack.artist?.name ?? this.firstTrack.name;

    this.multimediaService.trackInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((track: TrackModel | null) => {
        this.isPlaying = !!track && track.artist?.name === this.artistName;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  play(): void {
    this.multimediaService.trackInfo$.next(this.firstTrack);
  }
}
