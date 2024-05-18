import { Component, OnInit } from '@angular/core';
import * as dataRaw from '@data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.scss',
})
export class PlayListBodyComponent implements OnInit {
  tracks: Array<TrackModel> = [];
  constructor() {}

  ngOnInit(): void {
    const { data }: any = (dataRaw as any).default;
    this.tracks = data;
  }
}
