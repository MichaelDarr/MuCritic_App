import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import {
    ArtistsState,
    MuArtist,
    TimeRangeBucket,
} from './types';
import { EncodedArtist } from '../../helpers/encode';

export const mutations: MutationTree<ArtistsState> = {
    reset(state): void {
        state.short = [];
        state.medium = [];
        state.long = [];
        state.bucket = 'medium';
    },
    setArtists(
        state,
        payload: {
            artists: Spotify.Artist[];
            bucket: TimeRangeBucket;
        },
    ): void {
        const muArtists = payload.artists.map(
            (artist): MuArtist => ({ encoded: null, ...artist }),
        );
        state[payload.bucket] = muArtists;
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
    setBucket(state, payload: TimeRangeBucket): void {
        state.bucket = payload;
    },
};
