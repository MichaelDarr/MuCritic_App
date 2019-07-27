import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import {
    Album,
    AlbumsState,
    Decade,
    Popularity,
    Reception,
    SortOrder,
} from './types';

function ratingTaste(u: Album): number {
    if(u.userScoreAdjusted == null || u.userScore == null) return -1;
    return (Math.sqrt(u.userScore) / 40) + u.userScoreAdjusted;
}

export const mutations: MutationTree<AlbumsState> = {
    setAlbums(state, payload: Album[]): void {
        state.albums = payload;
        state.filteredAlbums = payload;
    },
    setPopularity(state, payload: Popularity): void {
        state.popularity = payload;
    },
    setScores(state, payload: {
        scores: number[];
        scoresAdjusted: number[];
    }): void {
        payload.scores.forEach((score, i): void => {
            state.albums[i].userScore = score;
        });
        payload.scoresAdjusted.forEach((score, i): void => {
            state.albums[i].userScoreAdjusted = score;
        });
    },
    setReception(state, payload: Reception): void {
        state.reception = payload;
    },
    setReleaseDecade(state, payload: Decade): void {
        state.releaseDecade = payload;
    },
    setSortOrder(state, payload: SortOrder): void {
        state.sortOrder = payload;
    },
    setSpotifyInfo(state, payload: {
        start: number;
        spotifyAlbums: Spotify.AlbumBatch;
    }): void {
        payload.spotifyAlbums.forEach((spotifyAlbum, index): void => {
            const imgWidth = 500;
            let finalImg: Spotify.Image = {
                height: 819,
                url: 'https://i.imgur.com/otLb7Vf.png',
                width: 819,
            };
            spotifyAlbum.images.forEach((nextImg): void => {
                if(
                    finalImg.url === 'https://i.imgur.com/otLb7Vf.png'
                    || Math.abs(finalImg.width) - imgWidth > Math.abs(nextImg.width - imgWidth)
                ) finalImg = nextImg;
            });
            state.filteredAlbums[index + payload.start].imageUrl = finalImg.url;
            state.filteredAlbums[index + payload.start].spotifyUrl = (
                spotifyAlbum.external_urls.spotify
            );
            state.filteredAlbums[index + payload.start].name = spotifyAlbum.name;
            state.filteredAlbums[index + payload.start].artist = spotifyAlbum.artists[0].name;
        });
    },
    sort(state): void {
        const {
            popularity,
            reception,
            releaseDecade,
            sortOrder,
        } = state;
        let filteredAlbums = state.albums;
        switch(reception) {
            case 'Respected':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.rymRating > 4,
                );
                break;
            case 'Average':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.rymRating <= 4 && album.rymRating > 2.7,
                );
                break;
            case 'Poor':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.rymRating <= 2.7,
                );
                break;
            default:
        }

        switch(releaseDecade) {
            case '2010s':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.releaseYear >= 2010,
                );
                break;
            case '2000s':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.releaseYear < 2010 && album.releaseYear >= 2000,
                );
                break;
            case '1990s':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.releaseYear < 2000 && album.releaseYear >= 1990,
                );
                break;
            case '1980s':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.releaseYear < 1990 && album.releaseYear >= 1980,
                );
                break;
            case '1970s':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.releaseYear < 1980 && album.releaseYear >= 1970,
                );
                break;
            case 'Earlier':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.releaseYear < 1970,
                );
                break;
            default:
        }

        switch(popularity) {
            case 'Popular':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.popularity >= 40,
                );
                break;
            case 'Average':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.popularity < 40 && album.popularity >= 20,
                );
                break;
            case 'Niche':
                filteredAlbums = filteredAlbums.filter(
                    (album): boolean => album.popularity < 20,
                );
                break;
            default:
        }

        state.filteredAlbums = filteredAlbums.sort((a, b): number => {
            switch(sortOrder) {
                case 'Hate':
                    return ratingTaste(a) - ratingTaste(b);
                case 'Love':
                    return ratingTaste(b) - ratingTaste(a);
                default:
                    return -1;
            }
        });
    },
};
