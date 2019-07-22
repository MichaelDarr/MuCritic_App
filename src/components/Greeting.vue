<template>
    <div class="hello">
        <h1><i>μ</i>Critic</h1>
        <a :href="authUrl">Log in with Spotify</a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Greeting extends Vue {
    get authUrl(): string {
        return this.$store.getters['spotifyToken/authUrl'];
    }
}
</script>

<style scoped>
h1 {
    font-size: 6em;
}
i {
    color: #207bbf;
}
a {
    background: #1DB954;
    color: #fff;
    border-radius: 50px;
    font-size: .875rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: 13px 45px 12px 45px;
    text-decoration: none;
}
</style>
