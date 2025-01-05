import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from 'src/app/tracks/services/track.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.scss',
})
export class FavoritePageComponent implements OnInit {
  tracksList: Array<TrackModel> = [];

  constructor(private trackService: TrackService) {
    this.loadData();
  }

  ngOnInit(): void {}

  async loadData(): Promise<any> {
    this.tracksList = await this.trackService.getAllTracks$().toPromise();
    console.log(this.tracksList);
  }
}
