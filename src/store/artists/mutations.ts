import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import { ArtistsState, MuArtist } from './types';
import { EncodedArtist } from '../../helpers/encode';

export const mutations: MutationTree<ArtistsState> = {
    setArtists(state, payload: Spotify.Artist[]): void {
        const muArtists = payload.map((artist): MuArtist => ({ encoded: null, ...artist }));
        state.artists = muArtists;
    },
    setEncodings(state, payload: EncodedArtist[]): void {
        payload.forEach((encodedArtist, i): void => {
            state.artists[i].encoded = encodedArtist;
        });
    },
};
