export interface ExploreCategory {
  id: string;
  label: string;
  color: string;         // background gradient / solid color
  textColor?: string;    // defaults to white
}

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  { id: 'musica',            label: 'Música',                 color: '#E8115B' },
  { id: 'podcasts',          label: 'Pódcasts',               color: '#006450' },
  { id: 'eventos',           label: 'Eventos en directo',     color: '#9B1FBF' },
  { id: 'especial',          label: 'Especialmente para ti',  color: '#1F3264' },
  { id: 'new-releases',      label: 'New Releases',           color: '#E8115B' },
  { id: 'pop',               label: 'Pop',                    color: '#BC5900' },
  { id: 'hip-hop',           label: 'Hip-Hop',                color: '#477D95' },
  { id: 'latin',             label: 'Latina',                 color: '#8D67AB' },
  { id: 'rock',              label: 'Rock',                   color: '#BA5D07' },
  { id: 'electronic',        label: 'Electrónica / Dance',    color: '#0D73EC' },
  { id: 'rnb',               label: 'R&B',                    color: '#C62B6D' },
  { id: 'country',           label: 'Country',                color: '#D84000' },
  { id: 'jazz',              label: 'Jazz',                   color: '#1DB954' },
  { id: 'classical',         label: 'Clásica',                color: '#503750' },
  { id: 'indie',             label: 'Indie',                  color: '#477D95' },
  { id: 'metal',             label: 'Metal',                  color: '#27856A' },
  { id: 'soul',              label: 'Soul',                   color: '#E1118C' },
  { id: 'reggaeton',         label: 'Reggaetón',              color: '#608108' },
  { id: 'videos',            label: 'Listas de vídeos musicales', color: '#148A8A' },
  { id: 'charts',            label: 'Listas de éxitos',       color: '#503750' },
];
