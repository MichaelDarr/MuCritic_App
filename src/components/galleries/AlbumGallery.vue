<template>
    <div class="albums">
        <h1>Recommendations</h1>
        <AlbumFilters />
        <div class="album-display-container">
            <AlbumDisplay
                v-for="album in albums"
                :key="album.spotifyId"
                :album="album"
            />
        </div>
        <div class="loading-more-albums-animation">
            <LoadingAnimation />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AlbumDisplay from '@/components/galleries/AlbumDisplay.vue';
import AlbumFilters from '@/components/filters/AlbumFilters.vue';
import LoadingAnimation from '@/components/loading/LoadingAnimation.vue';
import { Album } from '@/store/albums/types';

@Component({
    components: {
        AlbumDisplay,
        AlbumFilters,
        LoadingAnimation,
    },
})
export default class AlbumGallery extends Vue {
    @Prop()
    albums!: Album[];
}

</script>

<style scoped>
.albums {
    width: 100%;
    margin: 3em 0 0 0;
    padding: 0;
}

.album-display-container {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
}
</style>
