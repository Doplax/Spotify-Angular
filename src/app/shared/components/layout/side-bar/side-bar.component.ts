import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PlaylistModel, STATIC_PLAYLISTS } from '@shared/Models/Playlist';
import { TrackModel } from '@shared/Models/Tracks';
import { MultimediaService } from '@shared/services/multimedia.service';
import { PlaylistService } from '@shared/services/playlist.service';

type SortMode = 'recientes' | 'alfabetico' | 'creador';

interface SortOption {
  id: SortMode;
  label: string;
  icon: string;
}

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

  public readonly sortOptions: SortOption[] = [
    { id: 'recientes',  label: 'Recientes',   icon: 'schedule' },
    { id: 'alfabetico', label: 'Alfabético',  icon: 'sort_by_alpha' },
    { id: 'creador',    label: 'Creador',     icon: 'person' },
  ];
  public currentSort: SortMode = 'recientes';

  public isCollapsed = false;

  @HostBinding('class.is-collapsed')
  get collapsedClass(): boolean {
    return this.isCollapsed;
  }

  private readonly destroy$ = new Subject<void>();
  private readonly playlistsOriginalOrder: PlaylistModel[] = [...STATIC_PLAYLISTS];

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

  // ── Sidebar icon actions ─────────────────────────────────────────────────

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  createPlaylist(): void {
    // Navigate to placeholder so the action is observable.
    // Future: open a create-playlist dialog and persist to backend.
    this.router.navigate(['/favorites']);
  }

  createFolder(): void {
    this.router.navigate(['/favorites']);
  }

  setSort(mode: SortMode): void {
    if (this.currentSort === mode) return;
    this.currentSort = mode;

    switch (mode) {
      case 'alfabetico':
        this.playlists.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'creador':
        // No creator field in the static data → fall back to id (stable, distinct).
        this.playlists.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'recientes':
      default:
        this.playlists.length = 0;
        this.playlists.push(...this.playlistsOriginalOrder);
        break;
    }
  }

  get currentSortOption(): SortOption {
    return this.sortOptions.find((o) => o.id === this.currentSort) ?? this.sortOptions[0];
  }
}
