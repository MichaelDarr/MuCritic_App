import { GetterTree } from 'vuex';
import { SpotifyState } from './types';
import { RootState } from '../types';
import { SpotifyApi } from '../../helpers/spotifyApi';


export const getters: GetterTree<SpotifyState, RootState> = {
    api(state): SpotifyApi | null {
        return state.api;
    },
    authUrl(state): string {
        let urlBuilder = state.baseUrl;
        urlBuilder += `?client_id=${state.clientId}`;
        urlBuilder += `&response_type=${state.responseType}`;
        urlBuilder += `&redirect_uri=${state.redirectUri}`;
        urlBuilder += `&scope=${state.scope}`;
        return urlBuilder;
    },
};
