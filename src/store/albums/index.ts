import { Module } from 'vuex';
import {
    AlbumFile,
    AlbumsState,
} from './types';
import { RootState } from '../types';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export const state: AlbumsState = {
    albums: [],
    filteredAlbums: [],
    sortOrder: 'Love',
    reception: 'All',
    releaseDecade: 'All',
    popularity: 'All',
    albumFile: AlbumFile.noMetal,
};

const namespaced = true;

export const albums: Module<AlbumsState, RootState> = {
    namespaced,
    state,
    actions,
    getters,
    mutations,
};
