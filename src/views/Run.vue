<template>
  <div v-if="apiIsLoaded">
    <Recommend />
  </div>
  <div v-else>
    <Greeting />
    <SpotifyLogin />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createNamespacedHelpers } from 'vuex';
import Greeting from '@/components/Greeting.vue';
import Recommend from '@/components/recommendation/Recommend.vue';
import SpotifyLogin from '@/components/SpotifyLogin.vue';

const { mapState } = createNamespacedHelpers('spotify');

@Component({
    components: {
        Greeting,
        Recommend,
        SpotifyLogin,
    },
    computed: {
        ...mapState([
            'api',
        ]),
    },
})
export default class Run extends Vue {
    private 'api': string;

    get apiIsLoaded(): boolean {
        return this.api != null;
    }
}
</script>
