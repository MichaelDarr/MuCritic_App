import * as tf from '@tensorflow/tfjs';

export class Models {
    private static instance: Models;

    private trackEncoder: Model = {
        model: null,
        path: 'models/trackEncoder/model.json',
    };

    private trackSequenceEncoder: Model = {
        model: null,
        path: 'models/trackSequenceEncoder/model.json',
    };

    public static getInstance(): Models {
        if(!Models.instance) {
            Models.instance = new Models();
        }
        return Models.instance;
    }

    public getTrackEncoder(): Promise<tf.LayersModel> {
        return Models.loadModel(this.trackEncoder);
    }

    public getTrackSequenceEncoder(): Promise<tf.LayersModel> {
        return Models.loadModel(this.trackSequenceEncoder);
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
