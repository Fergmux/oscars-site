<script setup lang="ts">
import { state } from '@api/strapiStore';
import { getMediaUrl } from '@api/utils';
import TextImage from '@components/TextImage.vue';
import { computed, ComputedRef, onMounted } from 'vue';

const imageUrl: ComputedRef<string | undefined> = computed(() => {
  const homeContent = state.homeContent;

  if (homeContent) {
    return getMediaUrl(homeContent.attributes.image);
  }
});

const introductionImageUrl = computed(() => {
  const homeContent = state.homeContent;

  if (homeContent) {
    return getMediaUrl(homeContent.attributes.introductionImage);
  }
});

onMounted(async () => {
  await state.getHomeContent();
});

const introductionText: ComputedRef<string | undefined> = computed(() => {
  return state.homeContent?.attributes.introductionText;
});
</script>
<template>
  Home
  <img :src="imageUrl" class="w-base m-auto" />
  <div class="w-full bg-slate-100 text-slate-950">
    <text-image
      :text="introductionText"
      :image-url="introductionImageUrl"
      class="w-base m-auto"
    />
  </div>
</template>
