<template>
  <div class="home">
    <Greeting />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Greeting from '@/components/Greeting.vue';

@Component({
    components: {
        Greeting,
    },
})
export default class Home extends Vue {}
</script>
