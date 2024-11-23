<script setup lang="ts">
import { state } from '@api/strapiStore';
import { computed, onMounted } from 'vue';

const title = computed(() => {
  return state.homeContent?.attributes.title;
});

onMounted(async () => {
  await state.getHomeContent();
});
</script>
<template>
  <div class="absolute w-full h-full">
    <router-link to="menu">
      <h1
        class="cursor-pointer hover:-rotate-2 hover:scale-105 origin-center duration-300 transition-all link-shadow absolute text-9xl text-white text-center left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[42rem] font-semibold"
      >
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>
