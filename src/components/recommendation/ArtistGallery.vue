<template>
    <div class="artists">
        <TimeRange />
        <div class="artist-display-container">
            <ArtistDisplay
                v-for="artist in artists"
                :key="artist.spotifyId"
                :artist="artist"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import { Component } from 'vue-property-decorator';
import ArtistDisplay from '@/components/recommendation/ArtistDisplay.vue';
import TimeRange from '@/components/filters/TimeRange.vue';
import {
    MuArtist,
    TimeRangeBucket,
} from '@/store/artists/types';

const { mapState } = createNamespacedHelpers('artists');

@Component({
    components: {
        ArtistDisplay,
        TimeRange,
    },
    computed: {
        ...mapState([
            'bucket',
        ]),
    },
})
export default class ArtistGallery extends Vue {
    'bucket': TimeRangeBucket;

    get artists(): MuArtist[] {
        return this.$store.getters[`artists/${this.bucket}`];
    }
}

</script>

<style scoped>
.artist-display-container {
    display: inline-flex;
}

.artists {
    width: 100%;
    margin: 0;
    padding: 0;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
