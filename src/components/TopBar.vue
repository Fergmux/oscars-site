<script setup lang="ts">
import { state } from '@api/strapiStore';
import { getMediaUrl } from '@api/utils';
import { computed, ComputedRef, onMounted } from 'vue';

const routes = [
  { text: 'Home', to: { name: 'home' } },
  { text: 'About', to: 'about' },
  { text: 'Portfolio', to: 'portfolio' },
];

const imageUrl: ComputedRef<string | undefined> = computed(() => {
  const topBarContent = state.topBarContent;

  if (topBarContent) {
    return getMediaUrl(topBarContent.attributes.logo);
  }
});

const logoText: ComputedRef<string | undefined> = computed(() => {
  return state.topBarContent?.attributes.logoText;
});

onMounted(async () => {
  await state.getTopBarContent();
  await state.getSongs();
});
</script>

<template>
  <div class="h-24 flex justify-between items-center">
    <div class="h-full">
      <img :src="imageUrl" class="h-full aspect-square p-2 inline" />
      <h1 class="text-4xl text-white inline">{{ logoText }}</h1>
    </div>
    <div>
      <router-link
        v-for="route in routes"
        :to="route.to"
        class="text-2xl m-5 link-shadow"
      >
        {{ route.text }}
      </router-link>
    </div>
  </div>
</template>
