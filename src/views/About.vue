<script setup lang="ts">
import { state } from '@api/strapiStore';
import { getMediaUrl } from '@api/utils';
import { computed, ComputedRef } from 'vue';

const bgImageUrl: ComputedRef<string | undefined> = computed(() => {
  const aboutContent = state.aboutContent;
  if (aboutContent) {
    return getMediaUrl(aboutContent.attributes.background);
  }
});

// const textImageUrl = computed(() => {
//   const aboutContent = state.aboutContent;
//   if (aboutContent) {
//     return getMediaUrl(aboutContent.attributes.textImage);
//   }
// });

// onMounted(async () => {
//   await state.getAboutContent();
// });

// const text: ComputedRef<string | undefined> = computed(() => {
//   return state.aboutContent?.attributes.text;
// });
</script>
<template>
  <div class="bg-cover" :style="`background-image: url(${bgImageUrl})`">
    <div
      class="h-full w-full"
      style="backdrop-filter: blur(4px) brightness(50%)"
    />
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      Hi, my name's oscar. I'm an up and comping music producer. I make video
      game soundtracks and beats. If you'd like to listen to some of my music
      you can check out my songs <router-link to="portfolio">here.</router-link>
    </div>
  </div>
</template>
