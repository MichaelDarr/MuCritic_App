import * as Spotify from 'spotify';

import { SpotifyApi } from './spotifyApi';
import {
    EncodedTrack,
    TrackAggregator,
} from './trackAggregator';

/**
 * Spotify Track Scraper implementing a CSV writer and optional encoding via tensorflow models
 */
export class SpotifyArtistTracksScraper {
    public encodedTracks: EncodedTrack[];

    protected spotifyApi: SpotifyApi;

    public readonly spotifyId: string;

    protected spotifyFeaturesResponse: Spotify.AudioFeatureBatchResponse | undefined;

    protected spotifyResponse: Spotify.TracksBatchResponse | undefined;

    public readonly trackCount: number;

    public constructor(
        spotifyId: string,
        spotifyApi: SpotifyApi,
        trackCount = 5,
    ) {
        this.spotifyId = spotifyId;
        this.spotifyApi = spotifyApi;
        this.encodedTracks = [];
        this.trackCount = trackCount;
    }

    public async encode(): Promise<void> {
        if(
            this.spotifyResponse == null
            || this.spotifyFeaturesResponse == null
        ) throw new Error('Tried to encode track before receiving all info');
        this.encodedTracks = await Promise.all(
            this.spotifyResponse.tracks.map(
                async (track: Spotify.Track, index: number): Promise<EncodedTrack> => {
                    if(this.spotifyFeaturesResponse == null) throw new Error('Tried to encode track before receiving all info');
                    const aggregation = TrackAggregator.aggregate(
                        track,
                        this.spotifyFeaturesResponse.audio_features[index],
                    );
                    return TrackAggregator.encode(aggregation);
                },
            ),
        );
    }

    public async request(): Promise<void> {
        this.spotifyResponse = await this.spotifyApi.getArtistTopTracks(this.spotifyId);
        if(this.spotifyResponse.tracks.length < this.trackCount) throw new Error(`Artist scraper found less than ${this.trackCount} top tracks`);
        this.spotifyResponse.tracks = this.spotifyResponse.tracks.slice(0, this.trackCount);
        const trackIds = this.spotifyResponse.tracks.map((track): string => track.id);

        this.spotifyFeaturesResponse = await this.spotifyApi.getBatch<Spotify.AudioFeatureBatchResponse>(trackIds, 'audio-features');
    }

    public async getEncodedTracks(): Promise<EncodedTrack[]> {
        await this.request();
        await this.encode();
        return this.encodedTracks;
    }
}
