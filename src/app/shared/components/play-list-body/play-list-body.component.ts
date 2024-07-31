import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.scss',
})
export class PlayListBodyComponent implements OnInit {
  @Input() tracks: Array<TrackModel> = [];
  optionSort: { property: string | null; order: string } = {
    property: null,
    order: 'asc',
  };
  constructor() {}

  ngOnInit(): void {

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
