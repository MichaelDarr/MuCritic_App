export interface SpotifyToken {
    accessToken: string;
    expiresAt: number;
    receivedAt: number;
    tokenType: 'Bearer';
}

export interface SpotifyTokenState {
    authenticated: boolean;
    baseUrl: string;
    clientId: string;
    redirectUri: string;
    responseType: string;
    scope: string;
    spotifyToken: SpotifyToken | null;
}
