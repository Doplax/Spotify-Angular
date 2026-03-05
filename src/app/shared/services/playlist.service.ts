import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaylistModel, STATIC_PLAYLISTS } from '@shared/Models/Playlist';
import { TrackModel } from '@shared/Models/Tracks';
import { ItunesService } from '@shared/services/itunes.service';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  constructor(private itunesService: ItunesService) {}

  /** Returns the full list of static playlists (without tracks). */
  getAllPlaylists(): PlaylistModel[] {
    return STATIC_PLAYLISTS;
  }

  /** Returns one playlist definition (without tracks). */
  getPlaylistById(id: string): PlaylistModel | undefined {
    return STATIC_PLAYLISTS.find((p) => p.id === id);
  }

  /**
   * Loads the tracks for a playlist from iTunes.
   * @param playlistId - The playlist id
   * @param limitOverride - Optional override for number of tracks (useful to fetch just 1 for the cover)
   */
  loadTracks$(playlistId: string, limitOverride?: number): Observable<TrackModel[]> {
    const playlist = this.getPlaylistById(playlistId);
    if (!playlist) return of([]);

    const { source, limit } = playlist;
    const effectiveLimit = limitOverride ?? limit;

    if (source.type === 'genre') {
      const genreId = source.genreId === 0 ? undefined : source.genreId;
      return this.itunesService.getTopTracks$(effectiveLimit, genreId);
    }

    // type === 'search'
    return this.itunesService.searchTracks$(source.term, effectiveLimit);
  }
}
