<template>
  <ArrowWrapper class="bottom-8 hover:bottom-4 left-1/2 -translate-x-1/2">
    <router-link :to="to" class="flex flex-col items-center justify-end">
      <div class="text-center">{{ text }}</div>
      <ArrowDownIcon class="size-12 mt-3" />
    </router-link>
  </ArrowWrapper>
</template>

<script setup lang="ts">
import ArrowWrapper from '@components/arrows/ArrowWrapper.vue';
import { ArrowDownIcon } from '@heroicons/vue/24/solid';

const { to, text } = defineProps<{
  to: string;
  text: string;
}>();
</script>
