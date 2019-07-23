import * as tf from '@tensorflow/tfjs';
import * as Spotify from 'spotify';
import { Models } from './models';

export class Encoder {
    public static async encodeTrack(
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
        const trackEncoder = await models.getTrackEncoder();

        const aggregationTensor = tf
            .tensor(aggregation)
            .as2D(1, 15);
        const encodedTensor = trackEncoder.predict(aggregationTensor) as tf.Tensor;
        const [encodedTrack] = await encodedTensor.array() as EncodedTrack[];
        return encodedTrack;
    }

    public static async encodeTrackSequence(
        encodedTracks: EncodedTrack[],
        artistPopularity: number,
    ): Promise<ArtistAggregation> {
        const models = Models.getInstance();
        const trackSequenceEncoder = await models.getTrackSequenceEncoder();

        const aggregationTensor = tf
            .tensor(encodedTracks)
            .as3D(1, encodedTracks.length, encodedTracks[0].length);
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
