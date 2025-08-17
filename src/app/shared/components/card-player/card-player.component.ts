import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';
import { CardPlayerMode } from '@shared/enums';


@Component({
    selector: 'shared-card-player',
    templateUrl: './card-player.component.html',
    styleUrls: ['./card-player.component.scss'],
    standalone: false
})
export class CardPlayerComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() mode: CardPlayerMode = CardPlayerMode.Small;
  @Input() track!: TrackModel;
  public CardPlayerMode = CardPlayerMode;
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
