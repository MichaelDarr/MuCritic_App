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
html, body, #app {
    background-color: #1b1b1b;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
}
</style>
