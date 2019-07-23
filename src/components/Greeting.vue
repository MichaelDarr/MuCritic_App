<template>
    <div>
        <h1>
            <i>μ</i>Critic
        </h1>
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
    font-size: 7em;
    margin: 0.5em 0 0 0;
}
i {
    color: #207bbf;
}
.subheadding {
    color: #2c3e50;
    margin: 1em 0 5em 0;
}
.sub-1 {
    font-size: 0.9em;
}
.sub-2 {
    font-size: 1.3em;
}
</style>
