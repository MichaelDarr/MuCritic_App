<template>
    <div class="select-label-pair">
        <label for="time-period">
            Learning From Your Favorite Artists of
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
.select-label-pair {
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    margin: 0.5em 0 1em 0;
}

@media (min-width: 530px) {
    .select-label-pair {
        flex-direction: row;
        align-items: baseline;
    }
}

.select {
    background: url(https://michaeldarr.github.io/MuCritic_App/select_arrow_right_blue.png) no-repeat 96% 0;
    height: 2em;
    overflow: hidden;
    width: 180px;
    margin-top: 4px;
}

.select:hover {
    background: url(https://michaeldarr.github.io/MuCritic_App/select_arrow_down_blue.png) no-repeat 96% 0;
}

label {
    font-size: 1rem;
}

select {
    background: transparent;
    font-size: 1rem;
    width: 190px;
    color: #52baff;
    border: 0px;
    outline: 0px;
    margin-left: 2px;
}

option {
    font-size: 0.9rem;
    background-color: #fff;
    color: #000;
}
</style>
