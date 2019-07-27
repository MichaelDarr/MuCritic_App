export interface AlbumsState {
    albums: Album[];
    sortOrder: SortOrder;
    reception: Reception;
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
    userScoreAdjusted: number | null;
    imageUrl: string | null;
    spotifyUrl: string | null;
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

export type SortOrder =
    | 'Love'
    | 'Hate'

export type Reception =
    | 'All'
    | 'Respected'
    | 'Average'
    | 'Panned'
