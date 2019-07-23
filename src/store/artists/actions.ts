import { ActionTree } from 'vuex';
import { ArtistsState } from './types';
import { RootState } from '../types';
import { SpotifyArtistTracksScraper } from '../../helpers/spotifyArtistTracksScraper';


export const actions: ActionTree<ArtistsState, RootState> = {
    async encode({ state, rootState }): Promise<void> {
        if(
            rootState.spotify == null
            || rootState.spotify.api == null
        ) throw new Error('cannot encode artists, Spotify API is uninitiailized');
        const spotifyApi = rootState.spotify.api;
        state.artists.forEach(async (artist, index): Promise<void> => {
            const trackScraper = new SpotifyArtistTracksScraper(
                artist.id,
                spotifyApi,
            );
            const encodedTracks = await trackScraper.getEncodedTracks();
            console.log(encodedTracks);
        });
    },
};
