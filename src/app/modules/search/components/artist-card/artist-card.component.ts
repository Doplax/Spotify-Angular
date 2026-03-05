import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'search-artist-card',
  styleUrl: './artist-card.component.scss',
  templateUrl: './artist-card.component.html',
  standalone: false
})
export class ArtistCardComponent implements OnInit {
  /** First track whose artist info drives the card display */
  @Input() firstTrack!: TrackModel;

  public avatar: string = '';
  public artistName: string = '';
  public isPlaying: boolean = false;

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    this.avatar = this.firstTrack.cover;
    this.artistName = this.firstTrack.artist?.name ?? this.firstTrack.name;

    this.multimediaService.trackInfo$.subscribe((track) => {
      this.isPlaying =
        !!track && track.artist?.name === this.artistName;
    });
  }

  play(): void {
    this.multimediaService.trackInfo$.next(this.firstTrack);
  }
}
