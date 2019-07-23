import * as tf from '@tensorflow/tfjs';

export class Models {
    private static instance: Models;

    private trackEncoderModel: tf.LayersModel | undefined;

    private trackEncoderPath = 'models/trackEncoder/model.json';

    public static getInstance(): Models {
        if(!Models.instance) {
            Models.instance = new Models();
        }
        return Models.instance;
    }

    public async trackEncoder(): Promise<tf.LayersModel> {
        if(this.trackEncoderModel == null) {
            this.trackEncoderModel = await tf.loadLayersModel(this.trackEncoderPath);
        }
        return this.trackEncoderModel;
    }
}
