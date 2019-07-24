import { SpotifyApi } from '../../helpers/spotifyApi';

export interface SpotifyState {
    baseUrl: string;
    clientId: string;
    redirectUri: string;
    responseType: string;
    scope: string;
    api: SpotifyApi | null;
}
