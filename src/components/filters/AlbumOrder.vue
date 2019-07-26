<template>
    <div class="select-label-pair">
        <label for="time-period">Sort Albums By</label>
        <div class="select">
            <select
                id="time-period"
                v-model="selected"
            >
                <option value="loved">
                    Most Loved
                </option>
                <option value="hated">
                    Most Hated
                </option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { SortOrder } from '../../store/albums/types';

@Component({})
export default class AlbumOrder extends Vue {
    selected: SortOrder = this.$store.getters['artists/bucket'];

    @Watch('selected')
    newTimeRangeSelected(sortOrder: SortOrder) {
        this.$store.commit('albums/setSortOrder', sortOrder);
    }
}
</script>
