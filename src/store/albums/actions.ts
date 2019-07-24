import request from 'request';
import { ActionTree } from 'vuex';
import {
    Album,
    AlbumsState,
} from './types';
import { RootState } from '../types';


export const actions: ActionTree<AlbumsState, RootState> = {
    async fetch({ commit }): Promise<void> {
        const csvRaw: string = await new Promise((resolve, reject): void => {
            const requestOptions = {
                url: 'http://localhost:8080/album_data.csv',
                method: 'GET',
                json: false,
            };
            request(
                requestOptions,
                (error, response, body): void => {
                    if(error != null) {
                        reject(new Error(`album data failed to load: ${error}`));
                    } else {
                        resolve(body);
                    }
                },
            );
        });
        const csvRows = csvRaw.split('\n');
        csvRows.shift();
        const albums = csvRows.map((csvRow): Album => {
            const rowData = csvRow.split(',');
            return {
                spotifyId: rowData[0],
                popularity: Number(rowData[1]),
                rymOverallRank: Number(rowData[2]),
                rymRating: Number(rowData[3]),
                rymRatingCount: Number(rowData[4]),
                releaseYear: Number(rowData[5]),
                artistActive: Number(rowData[6]),
                artistDiscographySize: Number(rowData[7]),
                artistMemberCount: Number(rowData[8]),
                artistPopularity: Number(rowData[9]),
                encoding: [
                    Number(rowData[10]),
                    Number(rowData[11]),
                    Number(rowData[12]),
                    Number(rowData[13]),
                    Number(rowData[14]),
                    Number(rowData[15]),
                    Number(rowData[16]),
                    Number(rowData[17]),
                    Number(rowData[18]),
                    Number(rowData[19]),
                    Number(rowData[20]),
                    Number(rowData[21]),
                    Number(rowData[22]),
                    Number(rowData[23]),
                    Number(rowData[24]),
                    Number(rowData[25]),
                ],
            };
        });
        console.log(albums[0]);
    },
};
