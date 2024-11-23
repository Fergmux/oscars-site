<template>
  <div
    id="toast"
    class="margin-auto hide fixed left-0 right-0 flex flex-col justify-center"
  >
    <div
      id="static-example"
      class="bg-mint-500 pointer-events-auto mx-auto mb-3 block max-w-full rounded-lg bg-clip-padding px-5 text-sm shadow-lg"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-mdb-autohide="false"
    >
      <div class="bg-mint-500 break-words rounded-lg p-3 text-white">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
</script>

<style>
.hide {
  opacity: 0;
  top: 50px;
  transition:
    opacity 0.5s ease-in-out,
    top 0.5s ease-in-out;
}
.show {
  opacity: 1;
  top: 40px;
  transition:
    opacity 0.5s ease-in-out,
    top 0.5s ease-in-out;
}
</style>
