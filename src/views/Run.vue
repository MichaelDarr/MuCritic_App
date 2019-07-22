<template>
  <div>
    <Greeting />
    <SpotifyLogin />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Greeting from '@/components/Greeting.vue';
import SpotifyLogin from '@/components/SpotifyLogin.vue';

@Component({
    components: {
        Greeting,
        SpotifyLogin,
    },
})
export default class Run extends Vue {}
</script>
