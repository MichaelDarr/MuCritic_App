import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import {
    Album,
    AlbumsState,
    SortOrder,
} from './types';

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
        state.albums.sort((a, b): number => {
            if(b.userScoreAdjusted == null || a.userScoreAdjusted == null) return -1;
            if(state.sortOrder === 'Love') {
                return b.userScoreAdjusted - a.userScoreAdjusted;
            }
            return a.userScoreAdjusted - b.userScoreAdjusted;
        });
    },
};
