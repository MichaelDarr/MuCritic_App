<template>
    <div class="filter-container">
        <div class="select-label-pair">
            <label for="sort-order">Albums You'll</label>
            <div class="select">
                <select
                    id="sort-order"
                    v-model="sortOrder"
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
        <div class="select-label-pair">
            <label for="critical-reception">Critical Reception</label>
            <div class="select">
                <select
                    id="critical-reception"
                    v-model="criticalReception"
                >
                    <option value="All">
                        All
                    </option>
                    <option value="Respected">
                        Spicy
                    </option>
                    <option value="Average">
                        Medium
                    </option>
                    <option value="Poor">
                        Mild
                    </option>
                </select>
            </div>
        </div>
        <div class="select-label-pair">
            <label for="release-decade">Release Decade</label>
            <div class="select">
                <select
                    id="release-decade"
                    v-model="releaseDecade"
                >
                    <option value="All">
                        All
                    </option>
                    <option value="2010s">
                        2010's
                    </option>
                    <option value="2000s">
                        2000's
                    </option>
                    <option value="1990s">
                        1990's
                    </option>
                    <option value="1980s">
                        1980's
                    </option>
                    <option value="1970s">
                        1970's
                    </option>
                    <option value="Earlier">
                        Before 1970
                    </option>
                </select>
            </div>
        </div>
        <div class="select-label-pair">
            <label for="popularity">Popularity</label>
            <div class="select">
                <select
                    id="popularity"
                    v-model="popularity"
                >
                    <option value="All">
                        All
                    </option>
                    <option value="Popular">
                        Popular
                    </option>
                    <option value="Average">
                        Average
                    </option>
                    <option value="Niche">
                        Niche
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import {
    Decade,
    Popularity,
    Reception,
    SortOrder,
} from '@/store/albums/types';

@Component({})
export default class AlbumFilters extends Vue {
    sortOrder: SortOrder = this.$store.getters['albums/sortOrder'];

    criticalReception: Reception = this.$store.getters['albums/reception'];

    releaseDecade: Decade = this.$store.getters['albums/releaseDecade'];

    popularity: Popularity = this.$store.getters['albums/popularity'];

    @Watch('sortOrder')
    sortOrderSelected(sortOrder: SortOrder) {
        this.$store.commit('albums/setSortOrder', sortOrder);
    }

    @Watch('criticalReception')
    receptionSelected(criticalReception: Reception) {
        this.$store.commit('albums/setReception', criticalReception);
    }

    @Watch('releaseDecade')
    decadeSelected(releaseDecade: SortOrder) {
        this.$store.commit('albums/setReleaseDecade', releaseDecade);
    }

    @Watch('popularity')
    popularitySelected(popularity: Popularity) {
        this.$store.commit('albums/setPopularity', popularity);
    }
}
</script>

<style scoped>
.filter-container {
    display: flex;
    justify-content: space-around;
}

.select-label-pair {
    display: flex;
    flex-direction: column;
    margin: 2em 0 1em 0;
}

.select {
    background: url(https://michaeldarr.github.io/mucritic-web/select_arrow_right_blue.png) no-repeat 96% 0;
    height: 2em;
    overflow: hidden;
    width: 85px;
    margin: 4px 0 0 -6px;
}

.select:hover {
    background: url(https://michaeldarr.github.io/mucritic-web/select_arrow_down_blue.png) no-repeat 96% 0;
}

label {
    font-size: 1em;
}

select {
    background: transparent;
    font-size: 1em;
    width: 95px;
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
