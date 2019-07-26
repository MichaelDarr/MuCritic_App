<template>
    <div class="container">
        <LoadingAnimation />
        <h2 class="status">
            {{ status }}
        </h2>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoadingAnimation from '@/components/recommendation/LoadingAnimation.vue';

@Component({
    components: {
        LoadingAnimation,
    },
})
export default class FilterOptions extends Vue {
    @Prop(String) readonly status!: string;
}
</script>

<style scoped>
.container {
    align-items: center;
    justify-content: center;
    display: flex;
}
.status {
    display: inline-flex;
    padding: 0 0 0 1em;
    margin: 0;
    flex: none;
}
</style>
