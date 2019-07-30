<template>
    <div class="content">
        <SmallLogo />
        <Loading
            v-if="loading"
            :status="status"
        />
        <div v-else>
            <ArtistGallery />
            <AlbumGallery
                :albums="albums"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import { Component } from 'vue-property-decorator';
import AlbumGallery from '@/components/galleries/AlbumGallery.vue';
import ArtistGallery from '@/components/galleries/ArtistGallery.vue';
import SmallLogo from '@/components/SmallLogo.vue';
import Loading from '@/components/loading/Loading.vue';
import { Album } from '@/store/albums/types';
import { TimeRangeBucket } from '@/store/artists/types';

const { mapState } = createNamespacedHelpers('artists');

export enum LearningStatus {
    loadAlbums = 'importing ~30,000 albums',
    encodeArtists = 'learning artist representations',
    learnTaste = 'learning your taste',
    rateAlbums = 'calculating your album scores',
    loadSpotifyAlbums = 'importing data for top albums',
    sortAlbums = 'sorting albums',
    complete = 'completed',
}

@Component({
    components: {
        AlbumGallery,
        ArtistGallery,
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

    albumsOnPage: number = 0;

    'bucket': TimeRangeBucket;

    loadingMoreAlbums: boolean = true;

    switchedAlbumFiles: boolean = false;

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
                    case 'albums/setAlbumFile':
                        this.switchedAlbumFiles = true;
                        this.$store.dispatch('albums/fetch');
                        break;
                    case 'albums/setSpotifyInfo': {
                        const filteredAlbums = this.$store.getters['albums/filteredAlbums'];
                        this.albums = this.albums.concat(
                            filteredAlbums.slice(this.albumsOnPage, this.albumsOnPage + 20),
                        );
                        this.albumsOnPage += 20;
                        this.status = LearningStatus.complete;
                        this.loadingMoreAlbums = false;
                        break;
                    }
                    case 'albums/setPopularity':
                    case 'albums/setReleaseDecade':
                    case 'albums/setReception':
                    case 'albums/setScores':
                    case 'albums/setSortOrder':
                        this.status = LearningStatus.loadSpotifyAlbums;
                        this.albums = [];
                        this.albumsOnPage = 0;
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
                    case 'albums/setAlbums':
                        if(!this.switchedAlbumFiles) break;
                        this.switchedAlbumFiles = false;
                        this.status = LearningStatus.rateAlbums;
                        this.$store.dispatch('albums/rate');
                        break;
                    case 'setTasteModels':
                        this.status = LearningStatus.rateAlbums;
                        this.$store.dispatch('albums/rate');
                        break;
                    default:
                        break;
                }
            },
        );

        window.onscroll = this.scroll;
    }

    scroll() {
        const loadingElement: HTMLElement | null = document.querySelector(
            '.loading-more-albums-animation',
        );
        if(loadingElement == null || this.loadingMoreAlbums) return;

        const windowPos = window.pageYOffset + window.innerHeight;
        const loadingPos = loadingElement.offsetTop - 500;
        if(windowPos >= loadingPos) {
            this.loadingMoreAlbums = true;
            this.$store.dispatch(
                'spotify/requestAlbums',
                {
                    start: this.albumsOnPage,
                    count: 20,
                },
            );
        }
    }
}

</script>

<style scoped>
.content {
    margin: auto;
    max-width: 860px;
    padding: 0 20px 20px 20px;
    flex-wrap: wrap;
}
</style>
