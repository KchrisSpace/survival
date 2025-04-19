<template>
  <div class="app">
   
    <router-view />
  </div>
</template>

<script setup>

import { ref, computed, watch } from "vue";
import BubbleEffect from "./components/BubbleEffect.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  scroll-behavior: smooth;
  overflow-x: hidden;
}
 </style>
