<template>
    <div class="filter-container">
        <div class="select-label-pair top-three">
            <label for="sort-order">Music You'll</label>
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
        <div class="select-label-pair top-three">
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
        <div class="select-label-pair top-three">
            <label for="excluded-genre">Exclude</label>
            <div class="select">
                <select
                    id="excluded-genres"
                    v-model="albumFile"
                >
                    <option :value="albumFileAll">
                        None
                    </option>
                    <option :value="albumFileNoMetal">
                        Metal
                    </option>
                </select>
            </div>
        </div>
        <div class="select-label-pair bottom-two">
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
        <div class="select-label-pair bottom-two">
            <label for="release-decade">Release Window</label>
            <div class="select release-decade-select">
                <select
                    id="release-decade"
                    v-model="releaseDecade"
                    class="release-decade-select-inner"
                >
                    <option value="All">
                        All Time
                    </option>
                    <option value="New">
                        2000 - Present
                    </option>
                    <option value="Medium">
                        1980 - 1999
                    </option>
                    <option value="Old">
                        Before 1980
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import {
    AlbumFile,
    Decade,
    Popularity,
    Reception,
    SortOrder,
} from '@/store/albums/types';

@Component({})
export default class AlbumFilters extends Vue {
    albumFile: AlbumFile = this.$store.getters['albums/albumFile'];

    sortOrder: SortOrder = this.$store.getters['albums/sortOrder'];

    criticalReception: Reception = this.$store.getters['albums/reception'];

    releaseDecade: Decade = this.$store.getters['albums/releaseDecade'];

    popularity: Popularity = this.$store.getters['albums/popularity'];

    albumFileAll = AlbumFile.all;

    albumFileNoMetal = AlbumFile.noMetal;

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

    @Watch('albumFile')
    albumFileSelected(albumFile: AlbumFile) {
        this.$store.commit('albums/setAlbumFile', albumFile);
    }
}
</script>

<style scoped>
.filter-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 1em;
}

.select-label-pair {
    display: flex;
    flex-direction: column;
    margin: 2em 0 1em 0;
    text-align: center;
}

.bottom-two {
    flex-basis: 45%;
}
.top-three {
    flex-basis: 33%;
}

@media (min-width: 800px) {
    .bottom-two {
        flex-basis: 20%;
    }
    .top-three {
        flex-basis: 20%;
    }
}

.release-decade-select-inner {
    width: 155px;
}

.select {
    background: url(https://michaeldarr.github.io/MuCritic_App/select_arrow_right_blue.png) no-repeat 96% 0;
    height: 2em;
    overflow: hidden;
    width: 85px;
    margin: 0 auto;
}

.select:hover {
    background: url(https://michaeldarr.github.io/MuCritic_App/select_arrow_down_blue.png) no-repeat 96% 0;
}

.release-decade-select {
    width: 95px;
}

label {
    font-size: 0.8rem;
}

select {
    background: transparent;
    font-size: 0.8rem;
    width: 95px;
    color: #52baff;
    border: 0px;
    outline: 0px;
    margin-left: 2px;
}

option {
    background-color: #fff;
    color: #000;
}

@media (min-width: 420px) {
    select, label {
        font-size: 1rem;
    }

    .release-decade-select {
        width: 145px;
    }
}
</style>
