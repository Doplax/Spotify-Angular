import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
    selector: 'app-card-player',
    templateUrl: './card-player.component.html',
    styleUrls: ['./card-player.component.scss'],
    standalone: false
})
export class CardPlayerComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() mode: 'small' | 'big' = 'small'
  @Input() track!: TrackModel;
  public isPlaying: boolean = false;
  public trackInfo: TrackModel | null = null;

  // Comparar el ID de la cancion con la que suena en el reproductor
  constructor(private multimediaService: MultimediaService) {
    this.multimediaService.playerStatus$.subscribe((response) => {
      this.isPlaying = response === 'playing';
    });
    this.multimediaService.trackInfo$.subscribe((response) => {
      this.trackInfo = response;
    });
   }

  ngOnInit(): void {
  }

  playSong(track: TrackModel): void {
    this.multimediaService.trackInfo$.next(track)
  }

  tooglePlay(): void {
    this.multimediaService.tooglePlayer();
  }
}
