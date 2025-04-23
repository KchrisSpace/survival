<!--  -->
<template>
  <div class="container">
    <div class="spotlight"></div>
    <div class="home-bottom">
      <p class="hidden-text">djiojdiej</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: relative;
  overflow: hidden;
}

.spotlight {
  position: fixed;
  width: 200vw;
  height: 200vh;
  background: radial-gradient(
    circle at 0 0,
    rgba(255, 255, 255, 0.9) 10%,
    transparent 50%
  );
  transform-origin: 0 0;
  animation: rotate 2s linear alternate-reverse infinite;
  clip-path: polygon(0 0, 150vh 150vh, 150vh 0, 0 0);
  mix-blend-mode: overlay;
  z-index: 10;
  pointer-events: none;
}

.home-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  z-index: 1;
}

.hidden-text {
  color: black;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  opacity: 0.1;
  mix-blend-mode: difference;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(45deg);
  }
}
</style>