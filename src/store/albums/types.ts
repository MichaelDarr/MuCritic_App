export interface AlbumsState {
    albums: Album[];
    filteredAlbums: Album[];
    sortOrder: SortOrder;
    reception: Reception;
    releaseDecade: Decade;
    popularity: Popularity;
    albumFile: AlbumFile;
}

export interface Album {
    spotifyId: string;
    popularity: number;
    rymRating: number;
    releaseYear: number;
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

export enum AlbumFile {
    all = 'https://michaeldarr.github.io/MuCritic_App/album_data.csv',
    noMetal = 'https://michaeldarr.github.io/MuCritic_App/album_data_no_metal.csv',
}

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
    | 'All'
    | 'New'
    | 'Medium'
    | 'Old'
