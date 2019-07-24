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


@Component({})
export default class Greeting extends Vue {
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
                        unsubscribe();
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
                    case 'setTasteModel':
                        this.$store.dispatch('albums/rate');
                        break;
                    default:
                        break;
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
