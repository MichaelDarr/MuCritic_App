import { ActionTree } from 'vuex';
import { SpotifyTokenState, SpotifyToken } from './types';
import { RootState } from '../types';


export const actions: ActionTree<SpotifyTokenState, RootState> = {
    parseUrlResponse({ commit }, url: string): void {
        try {
            let accessToken = '';
            let expiresIn = 0;
            const queryParams = url.substring(1).split('&');
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
                            console.log(
                                `unexpected parameter receieved:\n${pLabel}: ${pVal}`,
                            );
                    }
                }
            });
            if(accessToken == null || accessToken === '') {
                throw new Error('failed to retrieve access token');
            } else if(expiresIn == null || expiresIn === 0) {
                throw new Error('failed to retrieve access token expiration');
            }
            const spotifyToken: SpotifyToken = {
                accessToken,
                expiresIn,
                tokenType: 'Bearer',
            };
            commit('setToken', spotifyToken);
        } catch(err) {
            commit('logError', {
                location: 'Spotify API access token retrieval',
                error: err,
            });
        }
    },
};
