import * as tf from '@tensorflow/tfjs';
import * as Spotify from 'spotify';
import { Models } from './models';

export class Encode {
    public static async artist(artist: ArtistAggregation): Promise<EncodedArtist> {
        const models = Models.getInstance();
        const artistEncoder = await models.artistEncoder();

        const aggregationTensor = tf
            .tensor(artist)
            .as2D(1, 33);
        const encodedTensor = artistEncoder.predict(aggregationTensor) as tf.Tensor;
        const encodedArtist = await encodedTensor.array() as EncodedArtist[];
        return encodedArtist[0];
    }

    public static async track(
        info: Spotify.Track,
        features: Spotify.AudioFeature,
    ): Promise<EncodedTrack> {
        const aggregation = [
            features.acousticness,
            features.danceability,
            features.energy,
            info.explicit ? 1 : 0,
            features.instrumentalness,
            features.liveness,
            Math.max((-1 * features.loudness) + 10, 0) / 70,
            features.mode,
            info.popularity / 100,
            features.speechiness,
            features.tempo / 200,
            features.time_signature / 8,
            info.track_number / 10,
            info.duration_ms / 600000,
            features.valence,
        ];

        const models = Models.getInstance();
        const trackEncoder = await models.trackEncoder();

        const aggregationTensor = tf
            .tensor(aggregation)
            .as2D(1, 15);
        const encodedTensor = trackEncoder.predict(aggregationTensor) as tf.Tensor;
        const [encodedTrack] = await encodedTensor.array() as EncodedTrack[];
        return encodedTrack;
    }

    public static async trackSequence(
        encodedTracks: EncodedTrack[],
        artistPopularity: number,
    ): Promise<ArtistAggregation> {
        const models = Models.getInstance();
        const trackSequenceEncoder = await models.trackSequenceEncoder();

        const aggregationTensor = tf
            .tensor(encodedTracks)
            .as3D(1, 5, 13);
        const encodedTensor = trackSequenceEncoder.predict(aggregationTensor) as tf.Tensor;
        const encodedArtistTracks = await encodedTensor.array() as number[][];

        return [
            artistPopularity / 100,
        ].concat(encodedArtistTracks[0]) as ArtistAggregation;
    }
}

export type ArtistAggregation = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
]

export type EncodedArtist = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
]

export type EncodedTrack = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
]
