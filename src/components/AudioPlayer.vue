<script setup lang="ts">
import { ApiSongSong } from '@api/types/generated/contentTypes';
import { getMediaUrl } from '@api/utils';
import {
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from '@heroicons/vue/24/solid';
import type { Ref } from 'vue';
import { computed, defineProps, ref, unref } from 'vue';

const emit = defineEmits(['nextSong', 'previousSong']);

const setSongLength = () => {
  const duration = unref(audioPlayer)?.duration;
  if (duration) {
    songLength.value = Math.floor(duration);
  }
  if (playing.value) {
    unref(audioPlayer)?.play();
  }
};

const props = defineProps<{
  song: ApiSongSong;
}>();

const songUrl = computed(() => {
  return getMediaUrl(props.song.attributes.song);
});

const songAlbumArt = computed(() => {
  return getMediaUrl(props.song.attributes.albumArt);
});

const formattedTags = computed(() => {
  // capitalize first letter of each tag
  return props.song.attributes.tags
    .split(',')
    .map((tag: string) => tag.trim())
    .map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1))
    .join(', ');
});

const audioPlayer = ref<HTMLAudioElement | undefined>();
const progressBar = ref<HTMLElement | undefined>();
const timeSelectBar = ref<HTMLElement | undefined>();
const progressIndicator = ref<HTMLElement | undefined>();

const playing = ref(false);

const songLength: Ref<number> = ref(0);
// const songLengthFormatted = computed(() => formatTime(unref(songLength)));
const songCurrent = ref(0);
// const songCurrentFormatted = computed(() => formatTime(unref(songCurrent)));

const updateProgressIndicator = () => {
  const audio = unref(audioPlayer);
  const indicator = unref(progressIndicator);
  const bar = unref(progressBar);
  if (audio && indicator && bar && playing) {
    const percentage = (audio.currentTime / audio.duration) * 100;
    indicator.style.left = `calc(${percentage}% - ${indicator.getBoundingClientRect().width / 2}px)`;
    bar.style.width = `${percentage}%`;
    requestAnimationFrame(updateProgressIndicator);
  }
};

const playPause = () => {
  const audio = unref(audioPlayer);
  if (audio) {
    if (audio.paused) {
      requestAnimationFrame(updateProgressIndicator);
      playing.value = true;
      audio.play();
    } else {
      playing.value = false;
      audio.pause();
    }
  }
};

const restart = () => {
  const audio = unref(audioPlayer);
  if (audio) {
    if (audio.currentTime < 2) {
      emit('previousSong');
    }
    audio.currentTime = 0;
  }
};

const nextSong = () => {
  emit('nextSong');
};

// const formatTime = (time: number) => {
//   return new Date(1000 * time).toISOString().slice(14, 19).replace('00:', '0:');
// };

const timeUpdated = () => {
  const currentTime = unref(audioPlayer)?.currentTime;
  if (currentTime) {
    songCurrent.value = Math.floor(currentTime);
  }
};

const songEnded = () => {
  playing.value = false;
};

const setSongTime = async (event: MouseEvent) => {
  const audio = unref(audioPlayer);
  const bar = unref(timeSelectBar);
  const indicator = unref(progressIndicator);
  if (audio && bar && indicator) {
    const rect = bar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    audio.currentTime = percentage * audio.duration;
  }
};

// watch(
//   () => props.song,
//   () => {
//     console.log('song changed');
//     if (playing.value) {
//       unref(audioPlayer)?.play();
//     }
//     // songCurrent.value = 0;
//     // songLength.value = 0;
//     // setSongLength();
//   },
// );
</script>

<template>
  <div>
    <audio
      ref="audioPlayer"
      @ended="songEnded"
      @timeupdate="timeUpdated"
      @loadedmetadata="setSongLength"
      :src="songUrl"
      preload="metadata"
    />

    <div class="h-128 w-96 rounded-3xl bg-black">
      <div
        class="relative -left-2 -top-2 h-full w-full rounded-3xl border-4 border-black bg-pink-100 p-7 text-black"
      >
        <div class="relative">
          <Transition name="fade-image">
            <img
              :key="songAlbumArt"
              :src="songAlbumArt"
              class="aspect-square border-2 border-black"
            />
          </Transition>
        </div>
        <p class="mt-2 text-lg font-bold">{{ props.song.attributes.title }}</p>
        <p>{{ formattedTags }}</p>

        <div class="relative mt-3 w-full">
          <div class="absolute top-0 mt-px h-[2px] w-full bg-black"></div>
          <div
            const
            ref="progressBar"
            class="absolute top-0 h-1 bg-black"
          ></div>

          <div
            ref="progressIndicator"
            class="absolute -left-1 -top-1 h-3 w-3 rounded-full bg-black"
          ></div>
          <div
            ref="timeSelectBar"
            @click="setSongTime"
            class="absolute -top-3 h-5 w-full cursor-pointer"
          ></div>
        </div>
        <div class="mt-6 flex items-center justify-center">
          <BackwardIcon @click="restart" class="size-10 cursor-pointer" />
          <component
            :is="playing ? PauseCircleIcon : PlayCircleIcon"
            @click="playPause"
            class="mx-2 size-14 cursor-pointer"
          />
          <ForwardIcon @click="nextSong" class="size-10 cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fade-image-enter-active {
  transition: opacity 0.5s ease;
  position: absolute;
  top: 0;
}
.fade-image-leave-active {
  transition: opacity 0.5s ease;
}

.fade-image-enter-from,
.fade-image-leave-to {
  opacity: 0;
}
</style>
