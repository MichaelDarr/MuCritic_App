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
    async requestArtists({ commit, dispatch, state }): Promise<void> {
        if(state.api != null) {
            const favoriteArtists = await state.api.getUserTopMusic('artists');
            commit(
                'artists/setArtists',
                favoriteArtists.items,
                { root: true },
            );
            dispatch(
                'artists/encode',
                null,
                { root: true },
            );
        }
    },
};
