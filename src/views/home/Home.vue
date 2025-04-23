<template>
  <div class="home">
    <HomeHeaderTop />
    <!-- <MusicPlayer /> -->
    <LightUp />
    <div class="home-content">
      <p>{{ formattedDate }}</p>
      <p class="page1-content-time">なにが得たいの？</p>
      <p class="page1-content-time page1-over">我是？</p>
    </div>
  </div>
</template>

<script setup>
import HomeHeaderTop from "./components/HomeHeaderTop.vue";
import MusicPlayer from "../../components/MusicPlayer.vue";
import { ref, computed } from "vue";
import LightUp from "./components/LightUp.vue";

const time = ref(new Date());

const formattedDate = computed(() => {
  return time.value.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-image: url(/public/png/bg-see.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: aliceblue;
  position: relative;
}

.home-content {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 50px;
  padding: 80px 140px;
  width: 100%;
  height: 100%;
  color: aliceblue;
  display: flex;
  flex-direction: column;
  gap: 20px;
  pointer-events: none;
}

div p:nth-child(1) {
  font-family: "e1";
  letter-spacing: 10px;
}

div p:nth-child(2) {
  position: relative;
  font-size: 60px;
  left: -10px;
  letter-spacing: 2px;
  font-family: "hakidame";
}

div p:nth-child(3) {
  font-size: 45px;
  font-family: "破碎中字";
  letter-spacing: 0.5rem;
}
</style>
