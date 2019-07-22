export interface SpotifyToken {
    accessToken: string;
    expiresIn: number;
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
