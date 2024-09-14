<script setup lang="ts">
import { state } from '@api/strapiStore';
import { getMediaUrl } from '@api/utils';
import TextImage from '@components/TextImage.vue';
import { computed, ComputedRef, onMounted } from 'vue';

const imageUrl: ComputedRef<string | undefined> = computed(() => {
  const aboutContent = state.aboutContent;
  if (aboutContent) {
    return getMediaUrl(aboutContent.attributes.image);
  }
});

const textImageUrl = computed(() => {
  const aboutContent = state.aboutContent;
  if (aboutContent) {
    return getMediaUrl(aboutContent.attributes.textImage);
  }
});

onMounted(async () => {
  await state.getAboutContent();
});

const text: ComputedRef<string | undefined> = computed(() => {
  return state.aboutContent?.attributes.text;
});
</script>
<template>
  About
  <img :src="imageUrl" class="w-base m-auto" />
  <div class="w-full bg-slate-100 text-slate-950">
    <text-image :text="text" :image-url="textImageUrl" class="w-base m-auto" />
  </div>
</template>
