<template>
    <div class="artist-container-outer">
        <div class="artist-container-inner">
            <a
                class="artist-art-link"
                :href="artist.external_urls.spotify"
            >
                <div
                    class="artist-art"
                    :style="{ 'background-image': `url(${artist.images[0].url})` }"
                />
            </a>
            <p class="artist-name">
                {{ artist.name }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { MuArtist } from '../../store/artists/types';

@Component({})
export default class ArtistDisplay extends Vue {
    @Prop()
    artist!: MuArtist;
}

</script>

<style scoped>
.artist-container-outer {
    flex-basis: 33.3%;
    font-size: 1.1em;
    margin: 0;
    overflow: hidden;
}

@media (min-width: 650px) {
    .artist-container-outer {
        flex-basis: 20%;
        font-size: 0.9em;
    }
}

.artist-container-inner {
    margin: 10px;
    line-height: 1em;
}

.artist-art {
    width: 100%;
    padding: 100% 0 0 0;
    background-size: cover;
    border-radius: 50%;
    margin-bottom: 1em;
}

.artist-name {
    margin-top: 5px;
    margin-bottom: 0;
    font-weight: 600;
}
</style>
