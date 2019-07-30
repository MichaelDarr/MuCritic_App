import { GetterTree } from 'vuex';
import {
    Album,
    AlbumFile,
    AlbumsState,
    Decade,
    Popularity,
    Reception,
    SortOrder,
} from './types';
import { RootState } from '../types';


export const getters: GetterTree<AlbumsState, RootState> = {
    albums(state): Album[] {
        return state.albums;
    },
    albumFile(state): AlbumFile {
        return state.albumFile;
    },
    filteredAlbums(state): Album[] {
        return state.filteredAlbums;
    },
    popularity(state): Popularity {
        return state.popularity;
    },
    releaseDecade(state): Decade {
        return state.releaseDecade;
    },
    reception(state): Reception {
        return state.reception;
    },
    sortOrder(state): SortOrder {
        return state.sortOrder;
    },
    loaded(state): boolean {
        return state.albums.length !== 0;
    },
    scored(state): boolean {
        return state.albums.length !== 0 && state.albums[0].userScore != null;
    },
};
