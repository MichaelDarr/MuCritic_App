import * as tf from '@tensorflow/tfjs';
import * as Spotify from 'spotify';
import { Models } from './models';

export class TrackAggregator {
    public static aggregate(
        info: Spotify.Track,
        features: Spotify.AudioFeature,
    ): TrackAggregation {
        return [
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
    }

    public static async encode(aggregation: TrackAggregation): Promise<EncodedTrack> {
        const models = Models.getInstance();
        const trackEncoder = await models.trackEncoder();
        const aggregationTensor = tf
            .tensor(aggregation)
            .as2D(1, aggregation.length);
        const encodedTensor = trackEncoder.predict(aggregationTensor) as tf.Tensor;
        const [encodedTrack] = await encodedTensor.array() as EncodedTrack[];
        return encodedTrack;
    }
}

export type TrackAggregation = [
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
