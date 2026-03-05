import { TrackModel } from './Tracks';

export type PlaylistSource =
  | { type: 'genre'; genreId: number }
  | { type: 'search'; term: string };

export interface PlaylistModel {
  id: string;
  title: string;
  description: string;
  color: string;        // CSS color for the gradient header
  source: PlaylistSource;
  limit: number;
  tracks?: TrackModel[];
}

export const STATIC_PLAYLISTS: PlaylistModel[] = [
  {
    id: 'top-global',
    title: 'Lo más escuchado',
    description: 'Los hits globales del momento',
    color: '#E8115B',
    source: { type: 'genre', genreId: 0 },   // 0 = all genres
    limit: 30,
  },
  {
    id: 'pop-hits',
    title: 'Pop Hits',
    description: 'Los mejores éxitos del pop actual',
    color: '#BC5900',
    source: { type: 'genre', genreId: 14 },
    limit: 25,
  },
  {
    id: 'rock-classics',
    title: 'Rock Clásico',
    description: 'Los grandes clásicos del rock',
    color: '#BA5D07',
    source: { type: 'search', term: 'rock classic hits' },
    limit: 25,
  },
  {
    id: 'hip-hop',
    title: 'Hip-Hop',
    description: 'El mejor rap y hip-hop del mundo',
    color: '#477D95',
    source: { type: 'genre', genreId: 18 },
    limit: 25,
  },
  {
    id: 'electronic',
    title: 'Electrónica',
    description: 'House, techno y electrónica',
    color: '#0D73EC',
    source: { type: 'genre', genreId: 7 },
    limit: 25,
  },
  {
    id: 'latin',
    title: 'Latina',
    description: 'Reggaetón, salsa y más',
    color: '#8D67AB',
    source: { type: 'genre', genreId: 12 },
    limit: 25,
  },
  {
    id: 'bad-bunny',
    title: 'Bad Bunny',
    description: 'Los mejores temas de Bad Bunny',
    color: '#1D8A5A',
    source: { type: 'search', term: 'bad bunny' },
    limit: 20,
  },
  {
    id: 'taylor-swift',
    title: 'Taylor Swift',
    description: 'El universo musical de Taylor Swift',
    color: '#C62B6D',
    source: { type: 'search', term: 'taylor swift' },
    limit: 20,
  },
  {
    id: 'rnb-soul',
    title: 'R&B y Soul',
    description: 'Ritmo y blues para el alma',
    color: '#C62B6D',
    source: { type: 'genre', genreId: 15 },
    limit: 25,
  },
  {
    id: 'jazz',
    title: 'Jazz Essentials',
    description: 'Las mejores piezas de jazz',
    color: '#1DB954',
    source: { type: 'genre', genreId: 11 },
    limit: 20,
  },
];
