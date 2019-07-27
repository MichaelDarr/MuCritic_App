import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import {
    Album,
    AlbumsState,
    SortOrder,
} from './types';

function ratingTaste(
    u: {
        userScore: number | null;
        userScoreAdjusted: number | null;
    },
    threshold?: number,
): number {
    if(u.userScoreAdjusted == null || u.userScore == null) return -1;
    if(threshold != null && u.userScore < threshold) return -1;
    return (Math.sqrt(u.userScore) / 35) + u.userScoreAdjusted;
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
        if(state.sortOrder === 'Acclaim') {
            const highArr: Album[] = [];
            const lowArr: Album[] = [];
            state.albums.forEach((album): void => {
                if(album.userScore != null && album.userScore > 7) highArr.push(album);
                else lowArr.push(album);
            });
            highArr.sort((a, b): number => {
                if(b.userScoreAdjusted == null || a.userScoreAdjusted == null) return -1;
                return b.userScoreAdjusted - a.userScoreAdjusted;
            });
            lowArr.sort((a, b): number => {
                if(b.userScoreAdjusted == null || a.userScoreAdjusted == null) return -1;
                return b.userScoreAdjusted - a.userScoreAdjusted;
            });
            state.albums = highArr.concat(lowArr);
            return;
        }
        state.albums.sort((a, b): number => {
            switch(state.sortOrder) {
                case 'Hate':
                    return ratingTaste(a) - ratingTaste(b);
                default:
                    return ratingTaste(b) - ratingTaste(a);
            }
        });
    },
};
