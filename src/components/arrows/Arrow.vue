<template>
  <div>
    <ArrowUp v-if="direction === ArrowDirection.Up" :to="to" :text="text" />
    <ArrowDown v-if="direction === ArrowDirection.Down" :to="to" :text="text" />
    <ArrowLeft v-if="direction === ArrowDirection.Left" :to="to" :text="text" />
    <ArrowRight
      v-if="direction === ArrowDirection.Right"
      :to="to"
      :text="text"
    />
  </div>
</template>
<script setup lang="ts">
import ArrowDown from '@components/arrows/ArrowDown.vue';
import ArrowLeft from '@components/arrows/ArrowLeft.vue';
import ArrowRight from '@components/arrows/ArrowRight.vue';
import ArrowUp from '@components/arrows/ArrowUp.vue';
import { ArrowDirection } from '@enums/ArrowDirection';

const { to, text } = defineProps<{
  to: string;
  text: string;
  direction: ArrowDirection;
}>();
</script>
