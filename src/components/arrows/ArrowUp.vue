<template>
  <ArrowWrapper class="hover:top-4 top-8 left-1/2 -translate-x-1/2">
    <router-link :to="to" class="flex flex-col items-center justify-start">
      <ArrowUpIcon class="size-12 mb-3" />
      <div class="text-center">{{ text }}</div>
    </router-link>
  </ArrowWrapper>
</template>

<script setup lang="ts">
import ArrowWrapper from '@components/arrows/ArrowWrapper.vue';
import { ArrowUpIcon } from '@heroicons/vue/24/solid';

const { to, text } = defineProps<{
  to: string;
  text: string;
}>();
</script>
