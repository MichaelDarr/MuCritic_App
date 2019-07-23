import * as Spotify from 'spotify';

export interface ArtistsState {
    artists: MuArtist[];
}

export interface MuArtist extends Spotify.Artist {
    encoded: EncodedArtist | null;
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
