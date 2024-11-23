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
  <div class="h-28 w-96 rounded-3xl bg-black">
    <div
      class="relative -left-2 -top-2 mt-10 flex h-full w-full items-center justify-between rounded-3xl border-4 border-black bg-pink-100 p-3 pr-8 text-black"
    >
      <div class="flex h-full items-center">
        <img
          :src="songAlbumArt"
          class="aspect-square h-full rounded-xl border-2 border-black"
        />
        <div class="ml-3">
          <p class="text-lg font-bold">
            {{ props.song.attributes.title }}
          </p>
          <p>{{ formattedTags }}</p>
        </div>
      </div>
      <PlayIcon class="size-10" />
    </div>
  </div>
</template>
