<template>
    <div>
        <h1>
            <i>μ</i>Critic
        </h1>
        <p class="credit-line">
            by Michael Darr
        </p>
        <h2 class="subheadding">
            <span class="sub-1">
                learning your music taste with
            </span>
            <br>
            <span class="sub-2">
                deep neural networks
            </span>
        </h2>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Greeting extends Vue {}
</script>

<style scoped>
h1 {
    font-size: 4rem;
    margin: 0;
}

i {
    color: #52baff;
}

.credit-line {
    font-size: 1.1rem;
    margin: -1em 0 0 0;
}

.subheadding {
    margin: 1em 0 5em 0;
}

.sub-1 {
    font-size: 1rem;
}

.sub-2 {
    font-size: 1.4rem;
}

@media (min-width: 350px) {
    h1 {
        font-size: 5rem;
    }

    .sub-1 {
        font-size: 1.1rem;
    }

    .sub-2 {
        font-size: 1.6rem;
    }
}

@media (min-width: 450px) {
    h1 {
        font-size: 7rem;
        margin: 0.5em 0 0 0;
    }

    .sub-1 {
        font-size: 1.4rem;
    }

    .sub-2 {
        font-size: 2rem;
    }
}
</style>
