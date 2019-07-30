<template>
    <div>
        <h2>See it in action.</h2>
        <a :href="authUrl">Log in with Spotify</a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import { Component } from 'vue-property-decorator';

const { mapGetters } = createNamespacedHelpers('spotify');

@Component({
    computed: {
        ...mapGetters([
            'authUrl',
        ]),
    },
})
export default class SpotifyLogin extends Vue {
    'authUrl': string;
}
</script>

<style scoped>
h2 {
    font-size: 1.8rem;
    margin-bottom: 0.6em;
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
