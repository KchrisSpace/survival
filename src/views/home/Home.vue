<template>
  <div class="home">
     <HomeHeaderTop/>
     <HomeBottom />
  </div>
</template>

<script setup>
 import HomeBottom from "./components/HomeBottom.vue";
import HomeHeaderTop from "./components/HomeHeaderTop.vue";
 
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-image: url(/public/png/bg-see.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
