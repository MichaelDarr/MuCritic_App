import { ActionTree } from 'vuex';
import {
    ArtistsState,
    TimeRangeBucket,
} from './types';
import { RootState } from '../types';
import { SpotifyArtistHandler } from '../../helpers/spotifyArtistHandler';
import { Encode, EncodedArtist } from '../../helpers/encode';


export const actions: ActionTree<ArtistsState, RootState> = {
    async encode(
        {
            commit,
            rootState,
            state,
        },
        payload: TimeRangeBucket,
    ): Promise<void> {
        if(
            rootState.spotify == null
            || rootState.spotify.api == null
        ) throw new Error('cannot encode artists, Spotify API is uninitiailized');
        const spotifyApi = rootState.spotify.api;
        const encodedArtists = await Promise.all(
            state[payload].map(async (artist): Promise<EncodedArtist> => {
                const artistHandler = new SpotifyArtistHandler(
                    artist.id,
                    artist.popularity,
                    spotifyApi,
                );
                return artistHandler.getEncodedArtist();
            }),
        );
        commit('setEncodings', { encodedArtists, timeRange: payload });
        const tasteModel = await Encode.taste(encodedArtists.slice(0, 5));
        commit('setTasteModel', tasteModel, { root: true });
    },
};
