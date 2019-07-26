<template>
    <div class="select-label-pair">
        <label for="time-period">
            Learning Taste From Your
            <span class="favorite-text">
                Favorite Artists
            </span>
            of
        </label>
        <div class="select">
            <select
                id="time-period"
                v-model="selected"
            >
                <option value="short">
                    this Month
                </option>
                <option value="medium">
                    the Last Six Months
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
import { TimeRangeBucket } from '@/store/artists/types';

@Component({})
export default class TimeRange extends Vue {
    selected: TimeRangeBucket = this.$store.getters['artists/bucket'];

    @Watch('selected')
    newTimeRangeSelected(bucket: TimeRangeBucket) {
        this.$store.commit('artists/setBucket', bucket);
    }
}
</script>

<style scoped>
.favorite-text {
    font-weight: 600;
    text-transform: uppercase;
}

.select-label-pair {
    align-items: baseline;
    display: inline-flex;
    flex-direction: row;
    margin: 0.5em 0 1em 0;
}

.select {
    background: url(/select_arrow_right_blue.png) no-repeat 96% 0;
    height: 2em;
    overflow: hidden;
    width: 180px;
    margin-top: 4px;
}

.select:hover {
    background: url(/select_arrow_down_blue.png) no-repeat 96% 0;
}

label {
    font-size: 1em;
}

select {
    background: transparent;
    font-size: 1em;
    width: 190px;
    color: #52baff;
    border: 0px;
    outline: 0px;
    margin-left: 2px;
}

option {
    font-size: 0.9em;
    background-color: #fff;
    color: #000;
}
</style>
