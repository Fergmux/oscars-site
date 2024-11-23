<script setup lang="ts">
import { state } from '@api/strapiStore';
import { getMediaUrl } from '@api/utils';
import { useToast } from '@composables/toast';
import { computed, ComputedRef, onMounted, ref } from 'vue';

const { toast } = useToast();

const formFields = ref({
  name: '',
  email: '',
  message: '',
});

onMounted(() => {
  document.querySelector('form')?.addEventListener('submit', handleSubmit);
});

const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault();
  const myForm = document.getElementById('contact') as HTMLFormElement;
  const formData = new FormData(myForm);

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(
        Array.from(formData.entries()).map((x) => x.map((y) => y as string)),
      ).toString(),
    });
  } catch (e) {
    toast('Sorry something went wrong when submitting your message');
    return;
  }

  toast('Thanks for your message!');

  formFields.value = {
    name: '',
    email: '',
    message: '',
  };
};

const bgImageUrl: ComputedRef<string | undefined> = computed(() => {
  const contactContent = state.contactContent;

  if (contactContent) {
    return getMediaUrl(contactContent.attributes.background);
  }
});

onMounted(async () => {
  // await state.getContactContent();
  // await state.getSongs();
});
</script>
<template>
  <div
    class="absolute h-full w-full bg-cover"
    :style="`background-image: url(${bgImageUrl})`"
  >
    <div
      class="relative h-full w-full"
      style="backdrop-filter: blur(4px) brightness(50%)"
    />
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="h-128 w-96 rounded-3xl bg-black">
        <div
          class="relative -left-2 -top-2 mt-10 flex h-full w-full flex-col rounded-3xl border-4 border-black bg-amber-50 p-8 pr-8 font-bold text-black"
        >
          <h2 class="mb-8 text-4xl">Contact me</h2>
          <form
            id="contact"
            class="flex basis-full flex-col"
            action="/contact"
            name="contact"
            method="POST"
            netlify
          >
            <input type="hidden" name="bot-field" />
            <div class="mb-8">
              <input
                v-model="formFields.name"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                class="block w-full appearance-none border-b-2 border-black bg-amber-50 px-3 py-2 font-semibold focus:outline-none"
              />
            </div>
            <div class="mb-8">
              <input
                v-model="formFields.email"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                class="block w-full appearance-none border-b-2 border-black bg-amber-50 px-3 py-2 font-semibold focus:outline-none"
              />
            </div>
            <div class="mb-8 flex-grow basis-full">
              <textarea
                v-model="formFields.message"
                id="message"
                name="message"
                placeholder="Message"
                class="block h-full w-full resize-none appearance-none border-b-2 border-black bg-amber-50 px-3 py-2 font-semibold focus:outline-none"
              />
            </div>
            <button
              type="submit"
              class="focus:shadow-outline rounded bg-pink-300 px-4 py-2 font-bold hover:bg-pink-400 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- <audio-player v-for="song in state.songs" class="w-base m-auto" :song />-->
</template>
