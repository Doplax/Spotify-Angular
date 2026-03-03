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
  @Input() artistData!: TrackModel;

  public avatar: string = '';
  public name: string = '';
  public artistName: string = '';

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    this.avatar = this.artistData.cover;
    this.name = this.artistData.name;
    this.artistName = this.artistData.artist?.name ?? '';
  }

  play(): void {
    this.multimediaService.trackInfo$.next(this.artistData);
  }
}
