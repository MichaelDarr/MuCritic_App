<template>
    <div>
        <h1>
            <i>μ</i>Critic
        </h1>
        <div class="content">
            <div
                v-for="album in albums"
                :key="album.spotifyId"
                class="album-container-outer"
            >
                <div class="album-container-inner">
                    <img
                        class="album-art"
                        :src="album.imageUrl"
                    >
                    <p class="album-name">
                        {{ album.name }}
                    </p>
                    <p class="artist-name">
                        {{ album.artist }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Album } from '../store/albums/types';


@Component({})
export default class Learning extends Vue {
    albums: Album[] = [];

    mounted() {
        this.$store.dispatch('albums/fetch');

        this.$store.dispatch('spotify/requestArtists', 'short');
        this.$store.dispatch('spotify/requestArtists', 'medium');
        this.$store.dispatch('spotify/requestArtists', 'long');

        const unsubscribe = this.$store.subscribe(
            (mutation) => {
                switch (mutation.type) {
                    case 'artists/setEncodings':
                        if(mutation.payload.timeRange === 'medium') {
                            this.$store.dispatch(
                                'artists/learnTaste',
                                'medium',
                            );
                        }
                        break;
                    case 'albums/setScores':
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
                        unsubscribe();
                        break;
                    case 'setTasteModel':
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
h1 {
    font-size: 2em;
    margin: 0.5em 0 0 0;
}
i {
    color: #207bbf;
}
.content {
    margin: auto;
    max-width: 860px;
    padding: 30px 20px 20px 20px;
}
.content {
    width: 100%;
    margin: 0;
    padding: 0;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.album-container-outer {
    flex-basis: 100%;
    margin: 0;
}
@media (min-width: 400px) {
    .album-container-outer {
        flex-basis: 50%;
    }
}
@media (min-width: 650px) {
    .album-container-outer {
        flex-basis: 33.3%;
    }
}
@media (min-width: 860px) {
    .album-container-outer {
        flex-basis: 25%;
    }
}
.album-container-inner {
    margin: 20px;
    text-align: left;
    font-size: 0.8em;
    line-height: 1em;
}
.album-art {
    width: 100%;
}
.album-name {
    margin-top: 5px;
    margin-bottom: 0;
    font-weight: 600;
}
.artist-name {
    margin-top: 5px;
}
</style>
