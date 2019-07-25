<template>
    <div class="album-container-outer">
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
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Album } from '../store/albums/types';


@Component({})
export default class Learning extends Vue {
    @Prop()
    album!: Album;
}
</script>

<style scoped>
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
