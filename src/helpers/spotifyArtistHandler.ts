import * as Spotify from 'spotify';

import { SpotifyApi } from './spotifyApi';
import {
    ArtistAggregation,
    EncodedTrack,
    Encoder,
} from './encoder';

/**
 * Spotify Track Scraper implementing a CSV writer and optional encoding via tensorflow models
 */
export class SpotifyArtistHandler {
    public artistPopularity: number;

    public encodedArtist: ArtistAggregation | undefined;

    public encodedTracks: EncodedTrack[];

    protected spotifyApi: SpotifyApi;

    public readonly spotifyId: string;

    protected spotifyFeaturesResponse: Spotify.AudioFeatureBatchResponse | undefined;

    protected spotifyResponse: Spotify.TracksBatchResponse | undefined;

    public readonly trackCount: number;

    public constructor(
        spotifyId: string,
        artistPopularity: number,
        spotifyApi: SpotifyApi,
        trackCount = 5,
    ) {
        this.spotifyId = spotifyId;
        this.artistPopularity = artistPopularity;
        this.spotifyApi = spotifyApi;
        this.trackCount = trackCount;
        this.encodedTracks = [];
    }

    public async encodeArtist(): Promise<void> {
        if(this.encodedTracks.length !== 5) throw new Error(`track sequence encoder found ${this.encodedTracks.length} tracks (should be 5)`);
        this.encodedArtist = await Encoder.encodeTrackSequence(
            this.encodedTracks,
            this.artistPopularity,
        );
    }

    public async encodeTracks(): Promise<void> {
        if(
            this.spotifyResponse == null
            || this.spotifyFeaturesResponse == null
        ) throw new Error('Tried to encode track before receiving all info');
        this.encodedTracks = await Promise.all(
            this.spotifyResponse.tracks.map(
                async (track: Spotify.Track, index: number): Promise<EncodedTrack> => {
                    if(this.spotifyFeaturesResponse == null) throw new Error('Tried to encode track before receiving all info');
                    return Encoder.encodeTrack(
                        track,
                        this.spotifyFeaturesResponse.audio_features[index],
                    );
                },
            ),
        );
    }

    public async requestTracks(): Promise<void> {
        this.spotifyResponse = await this.spotifyApi.getArtistTopTracks(this.spotifyId);
        if(this.spotifyResponse.tracks.length < this.trackCount) throw new Error(`Artist scraper found less than ${this.trackCount} top tracks`);
        this.spotifyResponse.tracks = this.spotifyResponse.tracks.slice(0, this.trackCount);
        const trackIds = this.spotifyResponse.tracks.map((track): string => track.id);

        this.spotifyFeaturesResponse = await this.spotifyApi.getBatch<Spotify.AudioFeatureBatchResponse>(trackIds, 'audio-features');
    }

    public async getEncodedTrackSequence(): Promise<ArtistAggregation> {
        await this.requestTracks();
        await this.encodeTracks();
        await this.encodeArtist();
        if(this.encodedArtist == null) {
            throw new Error(`Failed to encode artist: ${this.spotifyId}`);
        }
        return this.encodedArtist;
    }
}
