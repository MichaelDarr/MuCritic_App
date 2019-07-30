<template>
    <div class="nav-container">
        <router-link to="/">
            Learn Your Taste
        </router-link>
        <router-link to="/about">
            How it Works
        </router-link>
        <a href="https://michaeldarr.github.io/#/contact">Get In Touch</a>
        <a href="https://github.com/MichaelDarr/MuCritic">Source Code</a>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Nav extends Vue {
}
</script>

<style scoped>
.nav-container {
    padding: 2em 5 0 1em;
    margin: 0;
    display: inline-flex;
    width: 100%;
    flex-wrap: wrap;
}

a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    flex-basis: 50%;
    font-size: 1rem;
    margin-bottom: 2em;
}
@media (min-width: 600px) {
    a {
        flex-basis: 25%;
    }
}

a:hover {
    text-decoration: underline;
}

a.router-link-exact-active {
    color: #52baff;
}

</style>
