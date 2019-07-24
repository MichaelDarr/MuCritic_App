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
