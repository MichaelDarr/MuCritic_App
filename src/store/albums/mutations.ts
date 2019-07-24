import { MutationTree } from 'vuex';
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
};
