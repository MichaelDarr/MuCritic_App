<template>
    <div id="app">
        <Nav />
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';


@Component({
    components: {
        Nav,
    },
})
export default class App extends Vue {
}
</script>

<style>
html, body {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #1b1b1b;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    margin: auto;
    max-width: 860px;
    padding: 2rem 1rem 3rem 1rem;
    min-height: 100vh;
    background-color: #1b1b1b;
}
</style>
