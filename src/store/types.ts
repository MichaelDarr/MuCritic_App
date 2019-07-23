import { SpotifyState } from './spotify/types';

export interface Log {
    location: string;
    message: string;
}

export interface RootState {
    errorLog: Log[];
    miscLog: Log[];
    spotify: SpotifyState | null;
}
