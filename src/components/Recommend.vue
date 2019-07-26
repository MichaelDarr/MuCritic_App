<template>
    <div>
        <SmallLogo />
        <Loading
            v-if="loading"
            :status="status"
        />
        <div v-else>
            <FilterOptions />
            <div class="content">
                <div class="albums">
                    <AlbumDisplay
                        v-for="album in albums"
                        :key="album.spotifyId"
                        :album="album"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import { Component } from 'vue-property-decorator';
import { Album } from '../store/albums/types';
import AlbumDisplay from '@/components/AlbumDisplay.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import SmallLogo from '@/components/SmallLogo.vue';
import Loading from '@/components/Loading.vue';

const { mapState } = createNamespacedHelpers('artists');

export enum LearningStatus {
    loadAlbums = 'importing ~30,000 albums',
    encodeArtists = 'learning artist representations',
    learnTaste = 'learning your taste',
    rateAlbums = 'testing your taste on ~30,000 albums',
    loadSpotifyAlbums = 'importing data for top rated albums',
    complete = 'completed',
}

@Component({
    components: {
        AlbumDisplay,
        FilterOptions,
        Loading,
        SmallLogo,
    },
    computed: {
        ...mapState([
            'bucket',
        ]),
    },
})
export default class Recommend extends Vue {
    albums: Album[] = [];

    'bucket': string;

    status: LearningStatus = LearningStatus.loadAlbums;

    get loading(): boolean {
        return this.status !== LearningStatus.complete;
    }

    mounted() {
        this.$store.dispatch('albums/fetch');

        this.$store.dispatch('spotify/requestArtists', 'short');
        this.$store.dispatch('spotify/requestArtists', 'medium');
        this.$store.dispatch('spotify/requestArtists', 'long');

        this.$store.subscribe(
            (mutation) => {
                switch (mutation.type) {
                    case 'artists/setArtists':
                        if(mutation.payload.timeRange === this.bucket) {
                            this.status = LearningStatus.encodeArtists;
                        }
                        break;
                    case 'artists/setEncodings':
                        if(mutation.payload.timeRange === this.bucket) {
                            this.status = LearningStatus.learnTaste;
                            this.$store.dispatch(
                                'artists/learnTaste',
                            );
                        }
                        break;
                    case 'artists/setBucket':
                        this.status = LearningStatus.learnTaste;
                        this.$store.dispatch(
                            'artists/learnTaste',
                        );
                        break;
                    case 'albums/setScores':
                        this.status = LearningStatus.loadSpotifyAlbums;
                        this.$store.commit(
                            'albums/sort',
                        );
                        this.$store.dispatch(
                            'spotify/requestAlbums',
                            {
                                start: 0,
                                count: 20,
                            },
                        );
                        break;
                    case 'albums/setSpotifyInfo':
                        this.status = LearningStatus.complete;
                        break;
                    case 'setTasteModel':
                        this.status = LearningStatus.rateAlbums;
                        this.$store.dispatch('albums/rate');
                        break;
                    default:
                        break;
                }
            },
        );

        this.$store.watch(
            (_, getters) => getters['albums/albums'],
            (newAlbums: Album[]) => {
                this.albums = newAlbums.slice(0, 20);
            },
        );
    }
}

</script>

<style scoped>
.content {
    margin: auto;
    max-width: 860px;
    padding: 30px 20px 20px 20px;
}

.albums {
    width: 100%;
    margin: 0;
    padding: 0;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
