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
    async requestArtists({ state }): Promise<void> {
        if(state.api != null) {
            const favorites = await state.api.getUserTopMusic('artists');
            favorites.items.forEach((artist): void => console.log(artist.name));
        }
    },
};
