import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnInit {
  state = 'paused';
  mockCover: any = {
    cover: 'https://m.media-amazon.com/images/I/51OfTDxHYuL._UXNaN_FMjpg_QL85_.jpg',
    title: 'Rap Sin Corte',
    name: 'Rap Sin Corte V',
  };
  constructor() {}

  ngOnInit(): void {
    console.log('hola');
  }
}
