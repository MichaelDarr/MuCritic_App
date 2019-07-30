<template>
    <div class="album-container-outer">
        <div class="album-container-inner">
            <a
                class="album-art-link"
                :href="album.spotifyUrl"
            >
                <div
                    class="album-art"
                    :style="{ 'background-image': `url(${album.imageUrl})` }"
                />
            </a>
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
import { Album } from '@/store/albums/types';


@Component({})
export default class AlbumDisplay extends Vue {
    @Prop()
    album!: Album;
}
</script>

<style scoped>
.album-container-outer {
    flex-basis: 50%;
    font-size: 0.8rem;
}

@media (min-width: 550px) {
    .album-container-outer {
        font-size: 1rem;
    }
}

@media (min-width: 650px) {
    .album-container-outer {
        flex-basis: 33.3%;
        font-size: 0.9rem;
    }
}

@media (min-width: 860px) {
    .album-container-outer {
        flex-basis: 25%;
        font-size: 0.8rem;
    }
}

.album-container-inner {
    margin: 10px;
    text-align: left;
    line-height: 1em;
}

.album-art {
    width: 100%;
    padding-top: 100%;
    background-size: cover;
}
.album-name {
    margin-top: 5px;
    margin-bottom: 0;
    font-weight: 600;
}

.artist-name {
    margin-top: 5px;
    color: #bbb;
    font-weight: 500;
}
</style>
