import { GetterTree } from 'vuex';
import {
    Album,
    AlbumsState,
} from './types';
import { RootState } from '../types';


export const getters: GetterTree<AlbumsState, RootState> = {
    albums(state): Album[] {
        return state.albums;
    },
    loaded(state): boolean {
        return state.albums.length !== 0;
    },
    scored(state): boolean {
        return state.albums.length !== 0 && state.albums[0].userScore != null;
    },
};