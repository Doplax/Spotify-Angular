import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'search-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
  standalone: false,
})
export class TrackComponent implements OnInit {
  @Input() trackData!: TrackModel;

  public trackTitle: string = '';
  public coverUrl: string = '';
  public subtitles: string = '';

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    this.trackTitle = this.trackData.name;
    this.coverUrl = this.trackData.cover;
    this.subtitles = this.trackData.artist?.name ?? this.trackData.album;
  }

  play(): void {
    this.multimediaService.trackInfo$.next(this.trackData);
  }
}
