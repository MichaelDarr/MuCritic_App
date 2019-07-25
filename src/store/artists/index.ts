import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { ArtistsState } from './types';
import { RootState } from '../types';
import { getters } from './getters';

export const state: ArtistsState = {
    short: [],
    medium: [],
    long: [],
    bucket: 'medium',
};

const namespaced = true;

export const artists: Module<ArtistsState, RootState> = {
    namespaced,
    state,
    actions,
    getters,
    mutations,
};
