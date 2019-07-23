import { SpotifyApi } from '../../helpers/spotifyApi';

export interface SpotifyState {
    authenticated: boolean;
    baseUrl: string;
    clientId: string;
    redirectUri: string;
    responseType: string;
    scope: string;
    api: SpotifyApi | null;
}
