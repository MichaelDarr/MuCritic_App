import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import {
    Album,
    AlbumsState,
} from './types';

export const mutations: MutationTree<AlbumsState> = {
    setAlbums(state, payload: Album[]): void {
        state.albums = payload;
    },
    setScores(state, payload: number[]): void {
        payload.forEach((score, i): void => { state.albums[i].userScore = score; });
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
            state.albums[index + payload.start].image = finalImg;
            state.albums[index + payload.start].name = spotifyAlbum.name;
            state.albums[index + payload.start].artist = spotifyAlbum.artists[0].name;
        });
    },
    sort(state): void {
        state.albums.sort((a, b): number => {
            if(b.userScore == null || a.userScore == null) return -1;
            return b.userScore - a.userScore;
        });
    },
};
