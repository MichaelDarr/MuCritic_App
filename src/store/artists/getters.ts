import { GetterTree } from 'vuex';
import { ArtistsState, BucketBools } from './types';
import { RootState } from '../types';


export const getters: GetterTree<ArtistsState, RootState> = {
    loaded(state): BucketBools {
        return {
            short: state.short.length > 0,
            medium: state.medium.length > 0,
            long: state.long.length > 0,
        };
    },
    encoded(state): BucketBools {
        const bools = {
            short: false,
            medium: false,
            long: false,
        };
        if(state.short.length > 0 && state.short[0].encoded != null) bools.short = true;
        if(state.medium.length > 0 && state.medium[0].encoded != null) bools.medium = true;
        if(state.long.length > 0 && state.long[0].encoded != null) bools.long = true;
        return bools;
    },
};
