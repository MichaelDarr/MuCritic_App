import * as Spotify from 'spotify';

export interface AlbumsState {
    albums: Album[];
}

export interface Album {
    spotifyId: string;
    popularity: number;
    rymOverallRank: number;
    rymRating: number;
    rymRatingCount: number;
    releaseYear: number;
    artistActive: number;
    artistDiscographySize: number;
    artistMemberCount: number;
    artistPopularity: number;
    encoding: EncodedAlbum;
    userScore: number | null;
    image: Spotify.Image | null;
    name: string | null;
    artist: string | null;
}

export type EncodedAlbum = [
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
