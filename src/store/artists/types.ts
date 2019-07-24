import * as Spotify from 'spotify';

export interface ArtistsState {
    short: MuArtist[];
    medium: MuArtist[];
    long: MuArtist[];
}

export interface MuArtist extends Spotify.Artist {
    encoded: EncodedArtist | null;
}

export type TimeRangeBucket =
    | 'short'
    | 'medium'
    | 'long'

export enum SpotifyTimeRange {
    short = 'short_term',
    medium = 'medium_term',
    long = 'long_term',
}

export type EncodedArtist = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
];

export interface BucketBools {
    short: boolean;
    medium: boolean;
    long: boolean;
}
