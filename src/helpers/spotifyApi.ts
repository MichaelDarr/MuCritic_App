import request from 'request';
import * as Spotify from 'spotify';
import { Commit } from 'vuex';

/**
 * Interface for all interaction with Spotify API using the
 * [Implicit Grant Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
 *
 * Usage:
 * 1. [[SpotifyApi.connect]]
 * 2. [[SpotifyApi.getConnection]]
 */
export class SpotifyApi {
    public readonly accessToken: string;

    public readonly expirationTimestamp: number;

    public constructor(uri: string, commit: Commit) {
        let accessToken = '';
        let expiresIn = 0;
        const queryParams = uri.substring(1).split('&');
        queryParams.forEach((param): void => {
            const pair = param.split('=');
            if(pair.length === 2) {
                const [pLabel, pVal] = pair;
                switch(pLabel) {
                    case 'access_token':
                        accessToken = pVal;
                        break;
                    case 'expires_in':
                        if(Number.isNaN(Number(pVal))) {
                            throw new Error(
                                `expiration value non-numeric: ${pVal}`,
                            );
                        }
                        expiresIn = Number(pVal);
                        break;
                    case 'token_type':
                        if(pVal !== 'Bearer') {
                            throw new Error(
                                `non-Bearer token recieved: ${pVal}`,
                            );
                        }
                        break;
                    default:
                        commit('miscLog', {
                            location: 'Spotify token retrieval',
                            message: `unexpected parameter receieved:\n${pLabel}: ${pVal}`,
                        });
                }
            }
        });
        if(accessToken == null || accessToken === '') {
            throw new Error('failed to retrieve access token');
        } else if(expiresIn == null || expiresIn === 0) {
            throw new Error('failed to retrieve access token expiration');
        }
        this.accessToken = accessToken;
        this.expirationTimestamp = Date.now() + expiresIn;
    }

    /**
     * [Get an Album's Tracks](https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/)
     */
    public async getAlbumTracks(
        albumId: string,
        limit = 50,
    ): Promise<Spotify.TracksResponse> {
        const url = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=${limit}`;
        return this.spotifyRequest<Spotify.TracksResponse>(url, 'GET');
    }

    /**
     * [Get an Artist](https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/)
     */
    public async getArtist(artistId: string): Promise<Spotify.ArtistResponse> {
        const url = `https://api.spotify.com/v1/artists/${artistId}`;
        return this.spotifyRequest<Spotify.ArtistResponse>(url, 'GET');
    }

    /**
     * [Get an Artist's Top Tracks](https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/)
     *
     * @param country
     * [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
     */
    public async getArtistTopTracks(
        artistId: string,
        country = 'US',
    ): Promise<Spotify.TracksBatchResponse> {
        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${country}`;
        return this.spotifyRequest<Spotify.TracksBatchResponse>(url, 'GET');
    }

    /**
     * [Get Several Albums](https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/)
     * @param albumIds Comma-separated list of the Spotify IDs for the albums. Maximum: 20
     */
    public async getBatch<T extends Spotify.BatchResponse>(
        ids: string | string[],
        batchName: string,
    ): Promise<T> {
        const idString = (Array.isArray(ids)) ? ids.join(',') : ids;
        const url = `https://api.spotify.com/v1/${batchName}?ids=${idString}`;
        return this.spotifyRequest<T>(url, 'GET');
    }

    /**
     * [Get Available Genre Seeds](https://developer.spotify.com/console/get-available-genre-seeds/)
     */
    public async getGenreSeeds(): Promise<Spotify.GenreSeedsResponse> {
        const url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds';
        return this.spotifyRequest<Spotify.GenreSeedsResponse>(url, 'GET');
    }

    /**
     * [Get Audio Features for a Track](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/)
     */
    public async getTrackAudioFeatures(trackId: string): Promise<Spotify.AudioFeatureResponse> {
        const url = `https://api.spotify.com/v1/audio-features/${trackId}`;
        return this.spotifyRequest<Spotify.AudioFeatureResponse>(url, 'GET');
    }

    /**
     * [Get a User's Top Artists and Tracks](https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/)
     */
    public async getUserTopMusic<T1 extends Spotify.Artist | Spotify.Track>(
        type: 'artists' | 'tracks',
        timeRange: 'long_term' | 'medium_term' | 'short_term' = 'medium_term',
        limit = 20,
        offset = 0,
    ): Promise<Spotify.UserTopMusicResponse<T1>> {
        const url = `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&offset=${offset}&time_range=${timeRange}`;
        return this.spotifyRequest<Spotify.UserTopMusicResponse<T1>>(url, 'GET');
    }

    /**
     * @param query [spotify docs](https://developer.spotify.com/documentation/web-api/reference/search/search/)
     */
    public async search<T extends Spotify.SearchResponse>(
        query: string,
        type: Spotify.SearchType,
        limit: number,
    ): Promise<T> {
        const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`;
        return this.spotifyRequest<T>(url, 'GET');
    }

    private async spotifyRequest<T extends Spotify.Response>(
        url: string,
        method: Spotify.RequestMethod,
    ): Promise<T> {
        if(Date.now() > this.expirationTimestamp) throw new Error('Spotify Token Expired');
        return new Promise((resolve, reject): void => {
            const requestOptions = {
                url,
                method,
                json: true,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            };
            request(
                requestOptions,
                (error, response, body): void => {
                    if(error != null) {
                        reject(new Error(`request failed for ${url}: ${error}`));
                    } else if(body == null) {
                        reject(new Error(`request failed for ${url}: body was null`));
                    } else if(body.error != null && body.error.status === 429) {
                        const spotifyApiTemp = this;
                        setTimeout((): void => {
                            resolve(spotifyApiTemp.spotifyRequest(url, method));
                        }, (response.headers['Retry-After'] as unknown) as number * 1000);
                    } else {
                        resolve(body);
                    }
                },
            );
        });
    }
}
