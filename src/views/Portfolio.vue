<script setup lang="ts">
import { state } from '@api/strapiStore';
import { getMediaUrl } from '@api/utils';
import AudioPlayer from '@components/AudioPlayer.vue';
import SongPreview from '@components/SongPreview.vue';
import { computed, ComputedRef, onMounted, ref, unref } from 'vue';

const bgImageUrl: ComputedRef<string | undefined> = computed(() => {
  const portfolioContent = state.portfolioContent;

  if (portfolioContent) {
    return getMediaUrl(portfolioContent.attributes.background);
  }
});

const songs = computed(() => {
  return state.songs;
});

const songIndex = ref(0);
let disableInc = false;

const incSongindex = (inc: number): void => {
  const songsValue = unref(songs);

  const newIndex = unref(songIndex) + inc;
  if (
    !songsValue ||
    disableInc ||
    newIndex < 0 ||
    newIndex >= songsValue.length
  ) {
    return;
  }
  disableInc = true;
  setTimeout(() => {
    disableInc = false;
  }, 500);
  songIndex.value = newIndex;
};

// const imageUrl: ComputedRef<string | undefined> = computed(() => {
//   const homeContent = state.homeContent;
//   if (homeContent) {
//     return getMediaUrl(homeContent.attributes.image);
//   }
// });

onMounted(async () => {
  // await state.getPortfolioContent();
  // await state.getSongs();
});
</script>

<template>
  <!-- <div
    class="w-full h-full bg-cover absolute -z-30 blur-sm bg-blend-darken bg-[rgba(0,0,0,0.3)]"
    :style="`background-image: url(${imageUrl})`"
  > -->
  <div class="bg-cover" :style="`background-image: url(${bgImageUrl})`">
    <div
      class="relative h-full w-full"
      style="backdrop-filter: blur(4px) brightness(50%)"
    />
    <div v-if="songs">
      <div
        class="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-72 scale-95"
      >
        <song-preview v-for="song in songs.slice(0, songIndex)" :song />
      </div>
      <audio-player
        @next-song="incSongindex(1)"
        @previous-song="incSongindex(-1)"
        :song="songs[songIndex]"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-64"
      />
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-64 scale-95"
      >
        <song-preview v-for="song in songs.slice(songIndex + 1)" :song />
      </div>

      <!-- <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Hi I'm blah blah blah I make music if you'd like to listen to some you can
      check out my songs
      <router-link to="menu"><div>menu</div></router-link>
    </div> -->
    </div>
  </div>

  <!-- <audio-player v-for="song in state.songs" class="w-base m-auto" :song /> -->
</template>
