<template>
    <div class="filter-options">
        <div class="artist-time-period">
            <div class="select-label-pair">
                <label for="time-period">Using Your Favorite Artists From</label>
                <div class="select">
                    <select
                        id="time-period"
                        v-model="selected"
                    >
                        <option value="short">
                            This Month
                        </option>
                        <option value="medium">
                            The Last 6 Months
                        </option>
                        <option value="long">
                            All Time
                        </option>
                    </select>
                </div>
            </div>
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

.select-label-pair {
    display: inline-flex;
    flex-direction: column;
}

.select {
    background: url(/select_arrow_right.png) no-repeat 96% 0;
    height: 2em;
    overflow: hidden;
    width: 170px;
    margin-top: 4px;
}

.select:hover {
    background: url(/select_arrow_down.png) no-repeat 96% 0;
}

label {
    font-size: 1em;
}

select {
    background: transparent;
    font-size: 1em;
    width: 186px;
    margin-left: -4px;
    color: #b3b3b3;
    border: 0px;
    outline: 0px;
}

option {
    font-size: 0.9em;
    background-color: #111;
    color: #000;
}
</style>
