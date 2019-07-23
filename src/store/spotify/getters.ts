import { GetterTree } from 'vuex';
import { SpotifyState } from './types';
import { RootState } from '../types';


export const getters: GetterTree<SpotifyState, RootState> = {
    authUrl(state): string {
        let urlBuilder = state.baseUrl;
        urlBuilder += `?client_id=${state.clientId}`;
        urlBuilder += `&response_type=${state.responseType}`;
        urlBuilder += `&redirect_uri=${state.redirectUri}`;
        urlBuilder += `&scope=${state.scope}`;
        return urlBuilder;
    },
};
