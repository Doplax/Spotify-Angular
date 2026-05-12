import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PlaylistModel, STATIC_PLAYLISTS } from '@shared/Models/Playlist';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';
import { PlaylistService } from '@shared/services/playlist.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false,
})
export class SideBarComponent implements OnInit, OnDestroy {
  public readonly playlists: PlaylistModel[] = STATIC_PLAYLISTS;

  /** Maps playlist.id → cover URL of the first track */
  public coverMap: Record<string, string> = {};

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private playlistService: PlaylistService,
    private multimediaService: MultimediaService
  ) {}

  ngOnInit(): void {
    // Request enough tracks to guarantee we get at least one with a cover.
    // RSS feed ignores very small limits; 5 is a safe minimum.
    this.playlists.forEach((playlist: PlaylistModel) => {
      this.playlistService
        .loadTracks$(playlist.id, 5)
        .pipe(takeUntil(this.destroy$))
        .subscribe((tracks: TrackModel[]) => {
          const trackWithCover = tracks.find((t: TrackModel) => !!t.cover);
          if (trackWithCover) {
            this.coverMap[playlist.id] = trackWithCover.cover;
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(playlist: PlaylistModel): void {
    this.router.navigate(['/favorites', playlist.id]);
  }

  playPlaylist(event: MouseEvent, playlist: PlaylistModel): void {
    event.stopPropagation();
    this.playlistService
      .loadTracks$(playlist.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((tracks: TrackModel[]) => {
        if (tracks.length) {
          this.multimediaService.setQueue(tracks, 0);
          this.router.navigate(['/favorites', playlist.id]);
        }
      });
  }
}
