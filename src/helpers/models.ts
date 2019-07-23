import * as tf from '@tensorflow/tfjs';

export class Models {
    private static instance: Models;

    private artistEncoderInstance: Model = {
        model: null,
        path: 'models/artistEncoder/model.json',
    };

    private trackEncoderInstance: Model = {
        model: null,
        path: 'models/trackEncoder/model.json',
    };

    private trackSequenceEncoderInstance: Model = {
        model: null,
        path: 'models/trackSequenceEncoder/model.json',
    };

    public static getInstance(): Models {
        if(!Models.instance) {
            Models.instance = new Models();
        }
        return Models.instance;
    }

    public artistEncoder(): Promise<tf.LayersModel> {
        return Models.loadModel(this.artistEncoderInstance);
    }

    public trackEncoder(): Promise<tf.LayersModel> {
        return Models.loadModel(this.trackEncoderInstance);
    }

    public trackSequenceEncoder(): Promise<tf.LayersModel> {
        return Models.loadModel(this.trackSequenceEncoderInstance);
    }

    private static async loadModel(target: Model): Promise<tf.LayersModel> {
        if(target.model == null) {
            target.model = await tf.loadLayersModel(target.path);
        }
        return target.model;
    }
}

export interface Model {
    model: tf.LayersModel | null;
    path: string;
}
