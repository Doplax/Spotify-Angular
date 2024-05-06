import { Component ,OnInit } from '@angular/core';
import  * as rawData from '@data/tracks.json'
import { TrackModel } from '@core/models/tracks.model'

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.scss'
})
export class TracksPageComponent implements OnInit {

  public tracks:Array<TrackModel> = []

  ngOnInit(): void {
      const {data} : any = (rawData as any).default
      this.tracks = data
  }
}
