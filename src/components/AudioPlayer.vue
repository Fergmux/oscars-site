<script setup lang="ts">
import { ApiSongSong } from '@api/types/generated/contentTypes';
import { getMediaUrl } from '@api/utils';
import type { Ref } from 'vue';
import { computed, defineProps, ref, unref } from 'vue';

const setSongLength = () => {
  const duration = unref(audioPlayer)?.duration;
  if (duration) {
    songLength.value = Math.floor(duration);
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

const audioPlayer = ref<HTMLAudioElement | undefined>();
const progressBar = ref<HTMLElement | undefined>();
const timeSelectBar = ref<HTMLElement | undefined>();
const progressIndicator = ref<HTMLElement | undefined>();

const playing = ref(false);

const songLength: Ref<number> = ref(0);
const songLengthFormatted = computed(() => formatTime(unref(songLength)));
const songCurrent = ref(0);
const songCurrentFormatted = computed(() => formatTime(unref(songCurrent)));

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
    audio.currentTime = 0;
  }
};

const formatTime = (time: number) => {
  return new Date(1000 * time).toISOString().slice(14, 19).replace('00:', '0:');
};

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
</script>

<template>
  <div class="bg-slate-50 text-slate-950">
    <audio
      ref="audioPlayer"
      @ended="songEnded"
      @timeupdate="timeUpdated"
      @loadedmetadata="setSongLength"
      :src="songUrl"
      preload="metadata"
    />
    <div class="w-full flex items-center">
      <img class="w-28" :src="songAlbumArt" />
      <div class="w-64">
        <h2>{{ props.song.attributes.title }}</h2>
        <p>{{ props.song.attributes.tags }}</p>
      </div>
      <div class="flex w-28">
        <i @click="restart" class="material-icons cursor-pointer">
          skip_previous
        </i>
        <i @click="playPause" class="material-icons cursor-pointer">
          {{ playing ? 'pause' : 'play_arrow' }}
        </i>
        <i @click="restart" class="material-icons cursor-pointer">skip_next</i>
      </div>
      <div class="w-full flex items-center">
        <p class="w-14 text-center">{{ songCurrentFormatted }}</p>
        <div class="flex-grow relative mx-4">
          <div class="w-full absolute top-0 h-px bg-black"></div>

          <div
            const
            ref="progressBar"
            class="absolute top-0 h-px bg-orange-500"
          ></div>

          <div
            ref="progressIndicator"
            class="absolute -top-1 w-2 h-2 -left-1 rounded-full bg-orange-500"
          ></div>
          <div
            ref="timeSelectBar"
            @click="setSongTime"
            class="w-full absolute -top-3 h-5"
          ></div>
        </div>
        <p class="w-14 text-center">{{ songLengthFormatted }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
