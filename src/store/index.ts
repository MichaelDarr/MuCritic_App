import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { spotifyToken } from './spotifyToken/index';
import { RootState, VuexError } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        errors: [],
    },
    mutations: {
        logError(state, payload: VuexError): void {
            state.errors.push(payload);
        },
    },
    modules: {
        spotifyToken,
    },
};

export default new Vuex.Store<RootState>(store);
