import { Component, Input, OnInit } from '@angular/core';

//TODO poner la duracion del objeto audio haciendo fetch a hub.actions[1].uri

@Component({
  selector: 'search-artist-card',
  styleUrl: './artist-card.component.scss',
  templateUrl: './artist-card.component.html',
  standalone: false
})
export class ArtistCardComponent implements OnInit {
  @Input() artistData: any = "";

  public adamid: string = "";
  public avatar: string = "";
  public name: string = "";
  public weburl: string = "";

  ngOnInit(): void {
    this.adamid = this.artistData.adamid;
    this.avatar = this.artistData.avatar;
    this.name = this.artistData.name;
    this.weburl = this.artistData.weburl;
  }
}