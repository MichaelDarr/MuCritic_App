import { ActionTree } from 'vuex';

import * as Spotify from 'spotify';

import {
    SpotifyState,
} from './types';
import { SpotifyTimeRange, TimeRangeBucket } from '../artists/types';
import { RootState } from '../types';
import { Album } from '../albums/types';
import { SpotifyApi } from '../../helpers/spotifyApi';


export const actions: ActionTree<SpotifyState, RootState> = {
    initializeApi({ commit }, uri: string): void {
        try {
            const spotifyApi = new SpotifyApi(uri, commit);
            commit('storeApi', spotifyApi);
        } catch(err) {
            commit('logError', {
                location: 'Spotify token retrieval',
                message: err,
            });
        }
    },
    async requestArtists(
        { commit, dispatch, state },
        payload: TimeRangeBucket,
    ): Promise<void> {
        if(state.api != null) {
            const favoriteArtists = await state.api.getUserTopMusic(
                'artists',
                SpotifyTimeRange[payload],
                5,
                5,
            );
            commit(
                'artists/setArtists',
                {
                    artists: favoriteArtists.items,
                    bucket: payload,
                },
                { root: true },
            );
            dispatch(
                'artists/encode',
                payload,
                { root: true },
            );
        }
    },
    async requestAlbums(
        { commit, state, rootGetters },
        payload: {
            start: number;
            count: number;
        },
    ): Promise<void> {
        if(state.api != null) {
            const albums: Album[] = rootGetters['albums/filteredAlbums'];
            const ids = albums
                .slice(payload.start, payload.start + payload.count)
                .map((album): string => album.spotifyId);

            const spotifyData = await state.api.getBatch<Spotify.AlbumBatchResponse>(
                ids,
                'albums',
            );
            commit(
                'albums/setSpotifyInfo',
                {
                    start: payload.start,
                    spotifyAlbums: spotifyData.albums,
                },
                { root: true },
            );
        }
    },
};
