import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { ArtistsState } from './types';
import { RootState } from '../types';

export const state: ArtistsState = {
    short: [],
    medium: [],
    long: [],
};

const namespaced = true;

export const artists: Module<ArtistsState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
};
