import { ActionTree } from 'vuex';
import { SpotifyState } from './types';
import { RootState } from '../types';
import { SpotifyApi } from '../../helpers/spotifyApi';


export const actions: ActionTree<SpotifyState, RootState> = {
    initializeApi({ commit }, uri: string): void {
        try {
            const spotifyApi = new SpotifyApi(uri, commit);
            commit('storeApi', spotifyApi);
        } catch(err) {
            commit('logError', {
                location: 'Spotify token retrieval',
                message: err,
            });
        }
    },
    requestArtists({ state }): void {
        if(state.api != null) {
            console.log(`requesting artists. ${state.api.accessToken}`);
        }
    },
};
