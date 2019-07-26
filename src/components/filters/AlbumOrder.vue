<template>
    <div class="select-label-pair">
        <label for="time-period">Album's We Think You'll</label>
        <div class="select">
            <select
                id="time-period"
                v-model="selected"
            >
                <option value="Love">
                    Love
                </option>
                <option value="Hate">
                    Hate
                </option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { SortOrder } from '@/store/albums/types';

@Component({})
export default class AlbumOrder extends Vue {
    selected: SortOrder = this.$store.getters['albums/sortOrder'];

    @Watch('selected')
    newTimeRangeSelected(sortOrder: SortOrder) {
        this.$store.commit('albums/setSortOrder', sortOrder);
    }
}
</script>

<style scoped>
.select-label-pair {
    align-items: baseline;
    display: inline-flex;
    flex-direction: row;
    margin: 2em 0 1em 0;
}

.select {
    background: url(/select_arrow_right_blue.png) no-repeat 96% 0;
    height: 2em;
    overflow: hidden;
    width: 62px;
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
    width: 72px;
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
