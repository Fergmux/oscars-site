<script setup lang="ts">
// const imageUrl: ComputedRef<string | undefined> = computed(() => {
//   const aboutContent = state.aboutContent;
//   if (aboutContent) {
//     return getMediaUrl(aboutContent.attributes.image);
//   }
// });

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
  <div class="absolute h-full w-full">
    <div
      class="absolute left-1/2 top-1/2 w-112 -translate-x-1/2 -translate-y-1/2 text-center text-7xl font-semibold"
    >
      Hi, what would you like to do?
    </div>
  </div>
</template>
