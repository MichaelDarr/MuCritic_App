import { GetterTree } from 'vuex';
import { ArtistsState } from './types';
import { RootState } from '../types';


export const getters: GetterTree<ArtistsState, RootState> = {
    loaded(state): {
        short: boolean;
        medium: boolean;
        long: boolean;
    } {
        return {
            short: state.short.length > 0,
            medium: state.medium.length > 0,
            long: state.medium.length > 0,
        };
    },
};
