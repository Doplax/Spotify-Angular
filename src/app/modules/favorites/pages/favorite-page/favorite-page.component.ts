import { Component } from '@angular/core';
import { TrackModel } from '@shared/Models/Tracks';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.scss',
  standalone: false,
})
export class FavoritePageComponent {
  public tracksList: TrackModel[] = [];
}
