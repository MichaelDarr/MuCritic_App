export interface AlbumsState {
    albums: Album[];
    filteredAlbums: Album[];
    sortOrder: SortOrder;
    reception: Reception;
    releaseDecade: Decade;
    popularity: Popularity;
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
    | 'Poor'

export type Popularity =
    | 'All'
    | 'Popular'
    | 'Average'
    | 'Niche'

export type Decade =
    | '2010s'
    | '2000s'
    | '1990s'
    | '1980s'
    | '1970s'
    | 'All'
    | 'Earlier'
