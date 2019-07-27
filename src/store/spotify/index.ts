import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { SpotifyState } from './types';
import { RootState } from '../types';

export const state: SpotifyState = {
    baseUrl: 'https://accounts.spotify.com/authorize',
    clientId: 'a01304edb42448d1aa31c3b255400130',
    redirectUri: process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/'
        : 'https://michaeldarr.github.io/MuCritic_App/',
    responseType: 'token',
    scope: 'user-top-read',
    api: null,
};

const namespaced = true;

export const spotify: Module<SpotifyState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
