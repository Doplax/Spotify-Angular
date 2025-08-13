import { Component, Input, OnInit } from '@angular/core';
import { ShazamSearchDTO } from '@shared/Models/Shazam/';

@Component({
  selector: 'search-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
  standalone: false,
})
export class TrackComponent implements OnInit {
  @Input() trackData!: ShazamSearchDTO.Track;

  public trackTitle: string = "";
  public coverUrl: string = "";
  public trackUrl: string = "";
  public subtitles: string = "";
  public isExplicit: boolean = false;

  ngOnInit(): void {
    this.trackTitle = this.trackData.title;
    this.coverUrl = this.trackData.images.coverart;
    this.trackUrl = this.trackData.hub.actions[1].uri!;
    this.isExplicit = this.trackData.hub.explicit;
    this.subtitles = this.trackData.subtitle;
    console.log(this.trackData)
  }
}