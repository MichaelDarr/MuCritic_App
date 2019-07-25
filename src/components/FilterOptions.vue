<template>
    <div class="filter-options">
        <div class="artist-time-period">
            <label for="time-period">Use Favorite Artists From</label>
            <br>
            <select
                id="time-period"
                v-model="selected"
            >
                <option value="short">
                    This Month
                </option>
                <option value="medium">
                    Last 6 Months
                </option>
                <option value="long">
                    All Time
                </option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { TimeRangeBucket } from '../store/artists/types';

@Component({})
export default class FilterOptions extends Vue {
    selected: TimeRangeBucket = this.$store.getters['artists/bucket'];

    @Watch('selected')
    newTimeRangeSelected(bucket: TimeRangeBucket) {
        this.$store.commit('artists/setBucket', bucket);
    }
}
</script>

<style scoped>
.filter-options {
    display: inline-flex;
}

.artist-time-period {
    text-align: left;
}
</style>
