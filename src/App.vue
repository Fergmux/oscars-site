<script setup lang="ts">
import { state } from '@api/strapiStore';
import { getMediaUrl } from '@api/utils';
import Arrow from '@components/arrows/Arrow.vue';
import { ArrowDirection } from '@enums/ArrowDirection';
import { RouteName } from '@enums/RouteName';
import { computed, ComputedRef, onMounted, ref, unref } from 'vue';
import { useRoute } from 'vue-router';

const bgImageUrl: ComputedRef<string | undefined> = computed(() => {
  const homeContent = state.homeContent;
  if (homeContent) {
    return getMediaUrl(homeContent.attributes.background);
  }
});

const route = useRoute();
const currentRoute = ref(route.name);

const transitionName = computed(() => {
  if (unref(currentRoute) === 'portfolio' || route.name === 'about') {
    return 'slide-left';
  } else if (unref(currentRoute) === 'about' || route.name === 'portfolio') {
    return 'slide-right';
  } else if (unref(currentRoute) === 'contact') {
    return 'slide-top';
  } else if (route.name === 'contact') {
    return 'slide-bottom';
  } else {
    return 'fade-scale';
  }
});

const onAfterLeave = () => {
  currentRoute.value = route.name;
};

const mouseMoved = ref(false);
let mouseMoveTimeout: NodeJS.Timeout | null = null;
const onMouseMove = () => {
  console.log('mouse moved');
  mouseMoved.value = true;
  if (mouseMoveTimeout) {
    clearTimeout(mouseMoveTimeout);
  }

  mouseMoveTimeout = setTimeout(() => {
    mouseMoved.value = false;
  }, 2000); // Set to false after 2 seconds of inactivity
};

onMounted(async () => {
  await state.getHomeContent();
  await state.getAboutContent();
  await state.getPortfolioContent();
  await state.getContactContent();
});
</script>

<template>
  <div
    class="base absolute -z-40 h-screen w-screen bg-[rgba(0,0,0,0.3)] bg-cover bg-blend-darken blur-sm"
    :style="`background-image: url(${bgImageUrl})`"
  />

  <Transition name="fade">
    <div v-if="mouseMoved">
      <!-- UP ARROW -->
      <Transition name="fade" mode="out-in">
        <Arrow
          v-if="route.name === RouteName.Contact"
          :direction="ArrowDirection.Up"
          :to="RouteName.Menu"
          text="Back"
        />
        <div v-else />
      </Transition>
      <!-- DOWN ARROW -->
      <Transition name="fade" mode="out-in">
        <Arrow
          v-if="route.name === RouteName.Menu"
          :direction="ArrowDirection.Down"
          :to="RouteName.Contact"
          text="Send me a message"
        />
        <div v-else />
      </Transition>

      <!-- RIGHT ARROW -->
      <Transition name="fade" mode="out-in">
        <Arrow
          v-if="route.name === RouteName.About"
          :direction="ArrowDirection.Right"
          :to="RouteName.Menu"
          text="Back"
        />
        <Arrow
          v-else-if="route.name === RouteName.Menu"
          :direction="ArrowDirection.Right"
          :to="RouteName.Portfolio"
          text="Listen to my music"
        />
        <div v-else />
      </Transition>

      <!-- LEFT ARROW -->
      <Transition name="fade" mode="out-in">
        <Arrow
          v-if="route.name === RouteName.Portfolio"
          :direction="ArrowDirection.Left"
          :to="RouteName.Menu"
          text="Back"
        />
        <Arrow
          v-else-if="route.name === RouteName.Menu"
          :direction="ArrowDirection.Left"
          :to="RouteName.About"
          text="Find out about me"
        />
        <div v-else />
      </Transition>
    </div>
  </Transition>

  <RouterView v-slot="{ Component }">
    <Transition
      :name="transitionName"
      @after-leave="onAfterLeave"
      @mousemove="onMouseMove"
      :mode="transitionName === 'fade-scale' ? 'out-in' : undefined"
    >
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="scss">
.center {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
}

.link-shadow {
  text-shadow: 0 0 5px black;
  &:hover {
    text-shadow: 0 0 5px white;
  }
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s ease;
}

.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.75s ease-out;
}

.slide-right-enter-to {
  position: absolute;
  right: 0;
}

.slide-right-enter-from {
  position: absolute;
  right: -100%;
}

.slide-right-leave-to {
  position: absolute;
  left: -100%;
}

.slide-right-leave-from {
  position: absolute;
  left: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.75s ease-out;
}

.slide-left-enter-to {
  position: absolute;
  left: 0;
}

.slide-left-enter-from {
  position: absolute;
  left: -100%;
}

.slide-left-leave-to {
  position: absolute;
  right: -100%;
}

.slide-left-leave-from {
  position: absolute;
  right: 0;
}

.slide-top-enter-active,
.slide-top-leave-active {
  transition: all 0.75s ease-out;
}

.slide-top-enter-to {
  position: absolute;
  top: 0;
}

.slide-top-enter-from {
  position: absolute;
  top: -100%;
}

.slide-top-leave-to {
  position: absolute;
  bottom: -100%;
}

.slide-top-leave-from {
  position: absolute;
  bottom: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all 0.75s ease-out;
}

.slide-bottom-enter-to {
  position: absolute;
  bottom: 0;
}

.slide-bottom-enter-from {
  position: absolute;
  bottom: -100%;
}

.slide-bottom-leave-to {
  position: absolute;
  top: -100%;
}

.slide-bottom-leave-from {
  position: absolute;
  top: 0;
}
</style>
