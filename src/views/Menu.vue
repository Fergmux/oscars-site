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
  <div class="absolute w-full h-full">
    <div
      class="text-7xl w-112 font-semibold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      Hi, what would you like to do?
    </div>
  </div>
</template>
