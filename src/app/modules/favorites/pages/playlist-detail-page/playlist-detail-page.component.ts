import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaylistModel } from '@shared/Models/Playlist';
import { TrackModel } from '@shared/Models/Tracks';
import { PlaylistService } from '@shared/services/playlist.service';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-playlist-detail-page',
  templateUrl: './playlist-detail-page.component.html',
  styleUrl: './playlist-detail-page.component.scss',
  standalone: false,
})
export class PlaylistDetailPageComponent implements OnInit, OnDestroy {
  public playlist: PlaylistModel | undefined;
  public tracks: TrackModel[] = [];
  public isLoading = true;
  public currentTrack: TrackModel | null = null;
  public currentIndex: number = -1;

  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    public multimediaService: MultimediaService,
  ) {}

  ngOnInit(): void {
    const id$ = this.route.paramMap.subscribe((params) => {
      const id = params.get('id') ?? '';
      this.playlist = this.playlistService.getPlaylistById(id);
      this.isLoading = true;
      this.tracks = [];

      this.playlistService.loadTracks$(id).subscribe({
        next: (tracks) => {
          this.tracks = tracks;
          this.isLoading = false;
        },
        error: () => { this.isLoading = false; },
      });
    });

    const track$ = this.multimediaService.trackInfo$.subscribe((t) => {
      this.currentTrack = t;
    });

    const idx$ = this.multimediaService.queueIndex$.subscribe((i) => {
      this.currentIndex = i;
    });

    this.subs.push(id$, track$, idx$);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  /** Play the entire playlist from a specific track index. */
  playFrom(index: number): void {
    this.multimediaService.setQueue(this.tracks, index);
  }

  /** Play the playlist from the beginning. */
  playAll(): void {
    this.playFrom(0);
  }

  /** Is this track currently playing? */
  isPlaying(track: TrackModel): boolean {
    return this.currentTrack?._id === track._id;
  }

  formatDuration(ms: number): string {
    if (!ms) return '--:--';
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }
}
