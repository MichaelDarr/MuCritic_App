<template>
  <div v-if="apiIsActive">
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
import Recommend from '@/components/Recommend.vue';
import SpotifyLogin from '@/components/SpotifyLogin.vue';

const { mapGetters } = createNamespacedHelpers('spotify');

@Component({
    components: {
        Greeting,
        Recommend,
        SpotifyLogin,
    },
    computed: {
        ...mapGetters([
            'apiIsActive',
        ]),
    },
})
export default class Run extends Vue {
    private 'apiIsActive': boolean;
}
</script>
