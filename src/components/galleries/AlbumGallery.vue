<template>
    <div class="albums">
        <AlbumOrder />
        <div class="album-display-container">
            <AlbumDisplay
                v-for="album in albums"
                :key="album.spotifyId"
                :album="album"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AlbumDisplay from '@/components/galleries/AlbumDisplay.vue';
import AlbumOrder from '@/components/filters/AlbumOrder.vue';
import { Album } from '@/store/albums/types';

@Component({
    components: {
        AlbumDisplay,
        AlbumOrder,
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
    margin: 0;
    padding: 0;
}

.album-display-container {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
}
</style>
