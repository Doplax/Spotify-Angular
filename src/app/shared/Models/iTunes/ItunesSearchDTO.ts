/**
 * iTunes Search API response types
 * Endpoint: https://itunes.apple.com/search?term=...&entity=song
 */

export interface ItunesSearchResponse {
  resultCount: number;
  results: ItunesTrack[];
}

export interface ItunesTrack {
  wrapperType: string;      // "track"
  kind: string;             // "song"
  artistId: number;
  collectionId: number;
  trackId: number;          // unique track ID
  artistName: string;
  collectionName: string;   // album name
  trackName: string;        // song name
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;       // 30-second .m4a preview audio URL
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;    // cover art (100x100)
  collectionPrice: number;
  trackPrice: number;
  releaseDate: string;      // ISO date
  collectionExplicitness: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis: number;  // duration in ms
  country: string;
  currency: string;
  primaryGenreName: string;
  isStreamable: boolean;
}
