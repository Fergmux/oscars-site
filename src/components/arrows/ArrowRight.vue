<template>
  <ArrowWrapper class="hover:right-4 right-8 top-1/2 -translate-y-1/2">
    <router-link :to="to" class="flex items-center justify-end">
      <div class="text-right">{{ text }}</div>
      <ArrowRightIcon class="basis-12 shrink-0 ml-3" />
    </router-link>
  </ArrowWrapper>
</template>

<script setup lang="ts">
import ArrowWrapper from '@components/arrows/ArrowWrapper.vue';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';

const { to, text } = defineProps<{
  to: string;
  text: string;
}>();
</script>
