import { Sequential } from '@tensorflow/tfjs';

export interface Log {
    location: string;
    message: string;
}

export interface RootState {
    errorLog: Log[];
    miscLog: Log[];
    tasteModel: Sequential | null;
    tasteModelAdjusted: Sequential | null;
}
