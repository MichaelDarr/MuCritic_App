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

    public static async taste(encodedArtists: EncodedArtist[]): Promise<{
        model: tf.Sequential;
        adjustedModel: tf.Sequential;
    }> {
        if(encodedArtists.length < 5) throw new Error('taste encoder must be passed 5 artists');
        const models = Models.getInstance();
        const favoriteArtistsEncoder = await models.favoriteArtistsEncoder();
        const tasteMapper = await models.tasteMapper();

        const artistTensor = tf
            .tensor(encodedArtists.slice(0, 5))
            .as3D(1, 5, 16);
        const favoriteArtistsTensor = favoriteArtistsEncoder.predict(artistTensor);
        let tasteTensor = tasteMapper.predict(favoriteArtistsTensor) as tf.Tensor;
        tasteTensor = tasteTensor.reshape([16, 1]);
        const rymTaste = tf.tensor2d([
            [-0.2658042312],
            [-0.2918781042],
            [0.4476911426],
            [0.0354586020],
            [0.1686497927],
            [0.2152237296],
            [-0.4066027105],
            [0.1940803975],
            [0.0597865917],
            [0.4049637318],
            [-0.0558041073],
            [-0.2366468459],
            [0.0106893238],
            [-0.4115174115],
            [0.1501134783],
            [-0.2174658924],
        ]);
        const adjustedTasteTensor = tf.sub(tasteTensor, rymTaste);

        const model = tf.sequential();
        model.add(tf.layers.dense({
            inputShape: [16],
            name: 'perceptron',
            units: 1,
            useBias: false,
            weights: [tasteTensor],
        }));

        const adjustedModel = tf.sequential();
        adjustedModel.add(tf.layers.dense({
            inputShape: [16],
            name: 'perceptron',
            units: 1,
            useBias: false,
            weights: [adjustedTasteTensor],
        }));
        return {
            model,
            adjustedModel,
        };
    }

    public static async track(
        info: Spotify.Track,
        features: Spotify.AudioFeature,
    ): Promise<EncodedTrack> {
        const aggregation = [
            features.acousticness,
            features.danceability,
            info.duration_ms / 600000,
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

export type EncodedFavoriteArtists = [
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
