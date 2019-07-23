import { MutationTree } from 'vuex';
import * as Spotify from 'spotify';
import { ArtistsState, MuArtist } from './types';

export const mutations: MutationTree<ArtistsState> = {
    setArtists(state, payload: Spotify.Artist[]): void {
        const muArtists = payload.map((artist): MuArtist => ({ encoded: null, ...artist }));
        state.artists = muArtists;
    },
};
