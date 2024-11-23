<template>
  <ArrowWrapper class="hover:left-4 left-8 top-1/2 -translate-y-1/2">
    <router-link :to="to" class="flex items-center justify-start">
      <ArrowLeftIcon class="basis-12 shrink-0 mr-3" />
      <div>{{ text }}</div>
    </router-link>
  </ArrowWrapper>
</template>

<script setup lang="ts">
import ArrowWrapper from '@components/arrows/ArrowWrapper.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';

const { to, text } = defineProps<{
  to: string;
  text: string;
}>();
</script>
