<script setup lang="ts">
import { state } from '@api/strapiStore';
import { getMediaUrl } from '@api/utils';
import AudioPlayer from '@components/AudioPlayer.vue';
import { computed, ComputedRef, onMounted } from 'vue';

const imageUrl: ComputedRef<string | undefined> = computed(() => {
  const portfolioContent = state.portfolioContent;

  if (portfolioContent) {
    return getMediaUrl(portfolioContent.attributes.image);
  }
});

onMounted(async () => {
  await state.getPortfolioContent();
  await state.getSongs();
});
</script>
<template>
  Portfolio
  <img :src="imageUrl" class="w-base m-auto" />
  <div class="w-full bg-slate-100 text-slate-950"></div>
  <audio-player v-for="song in state.songs" class="w-base m-auto" :song />
</template>
