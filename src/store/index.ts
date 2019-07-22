import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { spotifyToken } from './spotifyToken/index';
import {
    RootState,
    Log,
} from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        errorLog: [],
        miscLog: [],
    },
    mutations: {
        logError(state, payload: Log): void {
            state.errorLog.push(payload);
        },
        logMisc(state, payload: Log): void {
            state.miscLog.push(payload);
        },
    },
    modules: {
        spotifyToken,
    },
};

export default new Vuex.Store<RootState>(store);
