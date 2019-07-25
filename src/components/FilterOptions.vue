<template>
    <div class="filter-options">
        <div class="artist-time-period">
            <label for="time-period">Favorite Artists From</label>
            <br>
            <select id="time-period">
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
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class FilterOptions extends Vue {}
</script>

<style scoped>
.filter-options {
    display: inline-flex;
}

.artist-time-period {
    text-align: left;
}
</style>
