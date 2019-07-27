import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import {
    Album,
    AlbumsState,
    Reception,
    SortOrder,
} from './types';

function ratingTaste(
    u: Album,
    reception?: Reception,
): number {
    if(u.userScoreAdjusted == null || u.userScore == null) return -1;
    const score = (Math.sqrt(u.userScore) / 40) + u.userScoreAdjusted;
    switch(reception) {
        case 'Respected':
            if(u.rymRating < 4) return score - 10;
            break;
        case 'Average':
            if(u.rymRating > 4 || u.rymRating < 2) return score - 10;
            break;
        case 'Panned':
            if(u.rymRating > 2) return score - 10;
            break;
        default:
    }
    return score;
}

export const mutations: MutationTree<AlbumsState> = {
    setAlbums(state, payload: Album[]): void {
        state.albums = payload;
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
            state.albums[index + payload.start].imageUrl = finalImg.url;
            state.albums[index + payload.start].spotifyUrl = spotifyAlbum.external_urls.spotify;
            state.albums[index + payload.start].name = spotifyAlbum.name;
            state.albums[index + payload.start].artist = spotifyAlbum.artists[0].name;
        });
    },
    sort(state): void {
        const { reception } = state;
        state.albums.sort((a, b): number => {
            switch(state.sortOrder) {
                case 'Hate':
                    return ratingTaste(a, reception) - ratingTaste(b, reception);
                default:
                    return ratingTaste(b, reception) - ratingTaste(a, reception);
            }
        });
    },
};
