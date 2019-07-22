import { MutationTree } from 'vuex';
import { SpotifyTokenState, SpotifyToken } from './types';

export const mutations: MutationTree<SpotifyTokenState> = {
    setToken(state, payload: SpotifyToken): void {
        if(payload != null) {
            state.spotifyToken = payload;
            state.authenticated = true;
        }
    },
};
