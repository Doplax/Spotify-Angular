import { Component } from '@angular/core';
import incomingTracks from '@data/tracks.json'

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.scss'
})
export class TracksPageComponent {

  public tracks:Array<any> = incomingTracks.data
}
