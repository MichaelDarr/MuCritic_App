import { MutationTree } from 'vuex';
import { SpotifyState } from './types';
import { SpotifyApi } from '../../helpers/spotifyApi';

export const mutations: MutationTree<SpotifyState> = {
    storeApi(state, payload: SpotifyApi): void {
        if(payload != null) {
            state.api = payload;
            state.authenticated = true;
        }
    },
};
