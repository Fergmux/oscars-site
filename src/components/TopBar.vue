<template>
  <div class="bg-slate-500 h-24 flex justify-between items-center">
    <div class="inline-block">Logo</div>
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link to="about">About</router-link>
      <router-link to="portfolio">Portfolio</router-link>
    </div>
  </div>
</template>
