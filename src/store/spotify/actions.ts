import { ActionTree } from 'vuex';
import {
    SpotifyState,
} from './types';
import { SpotifyTimeRange, TimeRangeBucket } from '../artists/types';
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
    async requestArtists(
        { commit, dispatch, state },
        payload: TimeRangeBucket,
    ): Promise<void> {
        if(state.api != null) {
            const favoriteArtists = await state.api.getUserTopMusic(
                'artists',
                SpotifyTimeRange[payload],
                5,
            );
            commit(
                'artists/setArtists',
                favoriteArtists.items,
                { root: true },
            );
            dispatch(
                'artists/encode',
                payload,
                { root: true },
            );
        }
    },
};
