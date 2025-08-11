export interface ShazamSongDetailsDto {
  data:      Datum[];
  resources: Resources;
}

export interface Datum {
  id:   string;
  type: string;
}

export interface Resources {
  "artist-highlights": ArtistHighlights;
  "track-highlights":  TrackHighlights;
  "related-tracks":    RelatedTracks;
  songs:               Songs;
  albums:              ResourcesAlbums;
  "shazam-artists":    ShazamArtists;
  artists:             Artists;
  "shazam-songs":      ShazamSongs;
}

export interface ResourcesAlbums {
  [key: string]: The1436677753;
}

export interface The1436677753 {
  id:         string;
  type:       string;
  attributes: The1436677753_Attributes;
}

export interface The1436677753_Attributes {
  artistName:  string;
  name:        string;
  releaseDate: string;
}

export interface ArtistHighlights {
  [key: string]: Datum;
}

export interface Artists {
  [key: string]: The73406786;
}

export interface The73406786 {
  id:         string;
  attributes: The73406786_Attributes;
  type:       string;
}

export interface The73406786_Attributes {
  name: string;
}

export interface RelatedTracks {
  [key: string]: Datum;
}

export interface ShazamArtists {
  [key: string]: Datum;
}

export interface ShazamSongs {
  [key: string]: The40333609;
}

export interface The40333609 {
  id:            string;
  type:          string;
  attributes:    The40333609_Attributes;
  relationships: Relationships;
}

export interface The40333609_Attributes {
  type:                  string;
  title:                 string;
  artist:                string;
  primaryArtist:         string;
  label:                 string;
  explicit:              boolean;
  isrc:                  string;
  webUrl:                string;
  images:                Images;
  artwork:               Artwork;
  share:                 Share;
  genres:                Genres;
  streaming:             Streaming;
  classicalAvailability: boolean;
}

export interface Artwork {
  url:        string;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  bgColor:    string;
}

export interface Genres {
  primary: string;
}

export interface Images {
  artistAvatar: string;
  coverArt:     string;
  coverArtHq:   string;
}

export interface Share {
  subject:  string;
  text:     string;
  image:    string;
  twitter:  string;
  html:     string;
  snapchat: string;
}

export interface Streaming {
  preview:  string;
  deeplink: string;
  store:    string;
}

export interface Relationships {
  "artist-highlights": ArtistHighlightsClass;
  "track-highlights":  ArtistHighlightsClass;
  "related-tracks":    ArtistHighlightsClass;
  songs:               ArtistHighlightsClass;
  albums:              ArtistHighlightsClass;
  "shazam-artists":    ArtistHighlightsClass;
  artists:             ArtistHighlightsClass;
}

export interface ArtistHighlightsClass {
  data: Datum[];
}

export interface Songs {
  [key: string]: The1436677761;
}

export interface The1436677761 {
  id:         string;
  type:       string;
  attributes: The1436677761_Attributes;
}

export interface The1436677761_Attributes {
  unitags: Unitag[];
}

export interface Unitag {
  namespace: string;
  tag:       string;
  score:     number;
}

export interface TrackHighlights {
  [key: string]: Datum;
}