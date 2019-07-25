import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { Sequential } from '@tensorflow/tfjs';

import { albums } from './albums/index';
import { artists } from './artists/index';
import { spotify } from './spotify/index';
import {
    RootState,
    Log,
} from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        errorLog: [],
        miscLog: [],
        tasteModel: null,
    },
    modules: {
        albums,
        artists,
        spotify,
    },
    getters: {
        tasteRaw(state): any {
            const tasteArr: number[] = [];
            if(state.tasteModel != null) {
                return state.tasteModel.getLayer('perceptron').weights[0].read().arraySync();
            }
            return null;
        },
    },
    mutations: {
        logError(state, payload: Log): void {
            state.errorLog.push(payload);
        },
        logMisc(state, payload: Log): void {
            state.miscLog.push(payload);
        },
        setTasteModel(state, payload: Sequential): void {
            state.tasteModel = payload;
        },
    },
};

export default new Vuex.Store<RootState>(store);
