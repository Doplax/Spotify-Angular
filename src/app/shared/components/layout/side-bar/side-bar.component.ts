import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistModel, STATIC_PLAYLISTS } from '@shared/Models/Playlist';
import { MultimediaService } from '@shared/services/multimedia.service';
import { PlaylistService } from '@shared/services/playlist.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
    standalone: false
})
export class SideBarComponent implements OnInit {
  public playlists: PlaylistModel[] = STATIC_PLAYLISTS;

  constructor(
    private router: Router,
    private playlistService: PlaylistService,
    private multimediaService: MultimediaService,
  ) {}

  ngOnInit(): void {}

  navigateTo(playlist: PlaylistModel): void {
    this.router.navigate(['/favorites', playlist.id]);
  }

  playPlaylist(event: MouseEvent, playlist: PlaylistModel): void {
    event.stopPropagation();   // don't trigger navigate
    this.playlistService.loadTracks$(playlist.id).subscribe((tracks) => {
      if (tracks.length) {
        this.multimediaService.setQueue(tracks, 0);
        this.router.navigate(['/favorites', playlist.id]);
      }
    });
  }
}
