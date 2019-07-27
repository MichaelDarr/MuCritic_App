<template>
    <div>
        <router-link to="/">
            Learn Your Taste
        </router-link>
        <span class="spacer" />
        <router-link to="/about">
            How it Works
        </router-link>
        <span
            id="spacer-middle"
            class="spacer"
        />
        <a href="https://michaeldarr.github.io/#/contact">Get In Touch</a>
        <span class="spacer" />
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
div {
    padding: 30px;
}

a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

a.router-link-exact-active {
    color: #52baff;
}

.spacer {
    display: inline-block;
    width: 1em;
}

#spacer-middle {
    display: block;
    height: 30px;
}

@media (min-width: 400px) {
    .spacer {
        width: 2em;
    }
}

@media (min-width: 620px) {
    .spacer {
        display: inline-block;
        width: 1em;
    }
    #spacer-middle {
        display: inline-block;
    }
}

@media (min-width: 710px) {
    .spacer {
        width: 3em;
    }
}
</style>
