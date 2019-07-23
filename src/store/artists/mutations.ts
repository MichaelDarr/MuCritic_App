import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import {
    ArtistsState,
    MuArtist,
    TimeRangeBucket,
} from './types';
import { EncodedArtist } from '../../helpers/encode';

export const mutations: MutationTree<ArtistsState> = {
    setArtists(state, payload: Spotify.Artist[]): void {
        const muArtists = payload.map((artist): MuArtist => ({ encoded: null, ...artist }));
        state.medium = muArtists;
    },
    setEncodings(
        state,
        payload: {
            encodedArtists: EncodedArtist[];
            timeRange: TimeRangeBucket;
        },
    ): void {
        payload.encodedArtists.forEach((encodedArtist, index): void => {
            state[payload.timeRange][index].encoded = encodedArtist;
        });
    },
};
