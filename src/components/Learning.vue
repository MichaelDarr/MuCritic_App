<template>
    <div>
        <SmallLogo />
        <div class="content">
            <div class="albums">
                <AlbumBox
                    v-for="album in albums"
                    :key="album.spotifyId"
                    :album="album"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Album } from '../store/albums/types';
import AlbumBox from '@/components/Album.vue';
import SmallLogo from '@/components/SmallLogo.vue';


@Component({
    components: {
        AlbumBox,
        SmallLogo,
    },
})
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
.albums {
    width: 100%;
    margin: 0;
    padding: 0;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
