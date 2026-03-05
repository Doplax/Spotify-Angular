import { CardPlayerMode } from '@shared/enums';
import { TrackModel } from '@shared/Models/Tracks';

// ---------------------------------------------------------------------------
// iTunes Genre IDs
// Reference: https://affiliate.itunes.apple.com/resources/documentation/genre-mapping/
// ---------------------------------------------------------------------------
export const ITUNES_GENRES = {
  POP:        14,
  ROCK:       21,
  HIP_HOP:    18,
  ELECTRONIC: 7,
  RNB_SOUL:   15,
  LATIN:      12,
  COUNTRY:    6,
  JAZZ:       11,
  CLASSICAL:  5,
  REGGAETON:  1011, // mapped as Latin sub-genre
} as const;

// ---------------------------------------------------------------------------
// Section configuration — drives what HomeSectionsService will fetch
// ---------------------------------------------------------------------------
export interface HomeSectionConfig {
  title: string;
  mode: CardPlayerMode;
  /** iTunes genre ID — undefined = all-genres top chart */
  genreId?: number;
  limit: number;
}

export const HOME_SECTIONS: HomeSectionConfig[] = [
  {
    title: '🔥 Lo más escuchado ahora',
    mode: CardPlayerMode.Small,
    genreId: undefined,   // global top chart
    limit: 25,
  },
  {
    title: '🎤 Pop',
    mode: CardPlayerMode.Big,
    genreId: ITUNES_GENRES.POP,
    limit: 20,
  },
  {
    title: '🎸 Rock',
    mode: CardPlayerMode.Big,
    genreId: ITUNES_GENRES.ROCK,
    limit: 20,
  },
  {
    title: '🎧 Hip-Hop & Rap',
    mode: CardPlayerMode.Big,
    genreId: ITUNES_GENRES.HIP_HOP,
    limit: 20,
  },
  {
    title: '⚡ Electrónica',
    mode: CardPlayerMode.Big,
    genreId: ITUNES_GENRES.ELECTRONIC,
    limit: 20,
  },
  {
    title: '🎶 R&B / Soul',
    mode: CardPlayerMode.Big,
    genreId: ITUNES_GENRES.RNB_SOUL,
    limit: 20,
  },
  {
    title: '💃 Latin',
    mode: CardPlayerMode.Big,
    genreId: ITUNES_GENRES.LATIN,
    limit: 20,
  },
  {
    title: '🤠 Country',
    mode: CardPlayerMode.Big,
    genreId: ITUNES_GENRES.COUNTRY,
    limit: 20,
  },
  {
    title: '🎷 Jazz',
    mode: CardPlayerMode.Big,
    genreId: ITUNES_GENRES.JAZZ,
    limit: 20,
  },
];

// ---------------------------------------------------------------------------
// Runtime section (with actual data bound in)
// ---------------------------------------------------------------------------
export interface HomeSection extends HomeSectionConfig {
  tracks: TrackModel[];
  isLoading: boolean;
}
