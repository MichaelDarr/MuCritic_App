import { ActionTree } from 'vuex';
import {
    ArtistsState,
    TimeRangeBucket,
} from './types';
import { RootState } from '../types';
import { SpotifyArtistHandler } from '../../helpers/spotifyArtistHandler';
import { SpotifyApi } from '../../helpers/spotifyApi';
import { Encode, EncodedArtist } from '../../helpers/encode';


export const actions: ActionTree<ArtistsState, RootState> = {
    async encode(
        {
            commit,
            state,
            rootGetters,
        },
        payload: TimeRangeBucket,
    ): Promise<void> {
        const spotifyApi: SpotifyApi | null = rootGetters['spotify/api'];
        if(spotifyApi == null) throw new Error('cannot encode artists, Spotify API is uninitiailized');
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
