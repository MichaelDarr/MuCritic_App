import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import {
    Album,
    AlbumsState,
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
        const { sortOrder, reception } = state;
        switch(reception) {
            case 'Classic':
                state.filteredAlbums = state.albums.filter(album => album.rymRating > 4.2);
                break;
            case 'Respected':
                state.filteredAlbums = state.albums.filter(
                    (album): boolean => album.rymRating <= 4.2 && album.rymRating > 3.5,
                );
                break;
            case 'Average':
                state.filteredAlbums = state.albums.filter(
                    (album): boolean => album.rymRating <= 3.5 && album.rymRating > 2.5,
                );
                break;
            case 'Poor':
                state.filteredAlbums = state.albums.filter(
                    (album): boolean => album.rymRating <= 2.5 && album.rymRating > 1.5,
                );
                break;
            case 'Garbage':
                state.filteredAlbums = state.albums.filter(album => album.rymRating <= 1.5);
                break;
            default:
                state.filteredAlbums = state.albums;
        }
        state.filteredAlbums.sort((a, b): number => {
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
