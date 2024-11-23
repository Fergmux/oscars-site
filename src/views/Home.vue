<script setup lang="ts">
import { state } from '@api/strapiStore';
import { computed, onMounted } from 'vue';

const title = computed(() => {
  return state.homeContent?.attributes.title;
});

onMounted(async () => {
  // await state.getHomeContent();
});
</script>
<template>
  <div class="absolute h-full w-full">
    <router-link to="menu">
      <h1
        class="link-shadow absolute left-1/2 top-1/2 w-[42rem] origin-center -translate-x-1/2 -translate-y-1/2 cursor-pointer text-center text-9xl font-semibold text-white transition-all duration-300 hover:-rotate-2 hover:scale-105"
      >
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>
