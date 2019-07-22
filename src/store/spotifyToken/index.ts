import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { SpotifyTokenState } from './types';
import { RootState } from '../types';

export const state: SpotifyTokenState = {
    authenticated: false,
    baseUrl: 'https://accounts.spotify.com/authorize',
    clientId: 'a01304edb42448d1aa31c3b255400130',
    redirectUri: 'localhost:8080/',
    responseType: 'token',
    scope: 'user-top-read',
    spotifyToken: null,
};

const namespaced = true;

export const spotifyToken: Module<SpotifyTokenState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
