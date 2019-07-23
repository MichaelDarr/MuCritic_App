import { ActionTree } from 'vuex';
import { ArtistsState } from './types';
import { RootState } from '../types';
import { SpotifyArtistHandler } from '../../helpers/spotifyArtistHandler';
import { ArtistAggregation } from '../../helpers/encoder';


export const actions: ActionTree<ArtistsState, RootState> = {
    async encode({ state, rootState }): Promise<void> {
        if(
            rootState.spotify == null
            || rootState.spotify.api == null
        ) throw new Error('cannot encode artists, Spotify API is uninitiailized');
        const spotifyApi = rootState.spotify.api;
        const encodedArtists = await Promise.all(
            state.artists.map(async (artist): Promise<ArtistAggregation> => {
                const artistHandler = new SpotifyArtistHandler(
                    artist.id,
                    artist.popularity,
                    spotifyApi,
                );
                return artistHandler.getEncodedTrackSequence();
            }),
        );
        console.log(encodedArtists);
    },
};
