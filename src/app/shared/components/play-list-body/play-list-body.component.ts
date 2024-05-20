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
  optionSort: { property: string | null; order: string } = {
    property: null,
    order: 'asc',
  };
  constructor() {}

  ngOnInit(): void {
    const { data }: any = (dataRaw as any).default;
    this.tracks = data;
  }

  changeSort(property: string): void {
    const { order } = this.optionSort
    console.log('si');
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }


  }
}
