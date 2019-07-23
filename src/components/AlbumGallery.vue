<template>
    <div>
        <h1>
            <i>μ</i>Critic
        </h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class Greeting extends Vue {
    mounted() {
        this.$store.dispatch('spotify/requestArtists');
    }
}
</script>

<style scoped>
h1 {
    font-size: 2em;
    margin: 0.5em 0 0 0;
}
i {
    color: #207bbf;
}
</style>
