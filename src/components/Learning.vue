<template>
    <div>
        <h1>
            <i>μ</i>Critic
        </h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { BucketBools } from '../store/artists/types';


@Component({})
export default class Greeting extends Vue {
    mounted() {
        this.$store.dispatch('albums/fetch');

        this.$store.dispatch('spotify/requestArtists', 'short');
        this.$store.dispatch('spotify/requestArtists', 'medium');
        this.$store.dispatch('spotify/requestArtists', 'long');

        const unwatchArtistEncoded = this.$store.watch(
            (_, getters) => getters['artists/encoded'],
            (encoded: BucketBools) => {
                if(encoded.medium) {
                    this.$store.dispatch(
                        'artists/learnTaste',
                        'medium',
                    );
                    unwatchArtistEncoded();
                }
            },
        );

        const unwatchTaste = this.$store.watch(
            (_, getters) => getters['tasteModel'],
            (tasteModel) => {
                if(tasteModel != null) {
                    this.$store.dispatch(
                        'albums/rate',
                    );
                    unwatchTaste();
                }
            },
        );

        const unwatchScoring = this.$store.watch(
            (_, getters) => getters['albums/scored'],
            (scored) => {
                if(scored) {
                    console.log('albums scored!');
                    unwatchScoring();
                }
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
</style>
