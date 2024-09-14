<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
  text?: string;
  imageUrl?: string;
}>();
</script>

<template>
  <div class="flex mt-28">
    <p>
      {{ props.text }}
    </p>
    <img class="float-right relative -top-16" :src="props.imageUrl" />
  </div>
</template>
