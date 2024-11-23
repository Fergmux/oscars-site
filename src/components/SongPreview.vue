<script setup lang="ts">
import { ApiSongSong } from '@api/types/generated/contentTypes';
import { getMediaUrl } from '@api/utils';
import { PlayIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';

const props = defineProps<{
  song: ApiSongSong;
}>();

const songAlbumArt = computed(() => {
  return getMediaUrl(props.song.attributes.albumArt);
});
const formattedTags = computed(() => {
  // capitalize first letter of each tag
  return props.song.attributes.tags
    .split(',')
    .map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1))
    .join(', ');
});
</script>

<template>
  <div class="w-96 h-28 bg-black rounded-3xl">
    <div
      class="relative w-full h-full bg-pink-100 rounded-3xl -top-2 -left-2 border-4 border-black p-3 pr-8 text-black mt-10 flex items-center justify-between"
    >
      <div class="flex items-center h-full">
        <img
          :src="songAlbumArt"
          class="border-2 border-black aspect-square rounded-xl h-full"
        />
        <div class="ml-3">
          <p class="font-bold text-lg">
            {{ props.song.attributes.title }}
          </p>
          <p>{{ formattedTags }}</p>
        </div>
      </div>
      <PlayIcon class="size-10" />
    </div>
  </div>
</template>
