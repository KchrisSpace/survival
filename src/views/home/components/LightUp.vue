<!-- test -->
<template>
  <div class="test">
    <div class="spotlight"></div>
    <div class="homebottom hidden-text"><p>逃离的出口在右上角</p></div>
  </div>
</template>

<script setup></script>

<style scoped>
.test {
  position: absolute;
  width: 100vw;
  height: 100vh;

  position: relative;
  overflow: hidden;
}

.spotlight {
  position: absolute;
  width: 200vw;
  height: 200vh;
  background: radial-gradient(
    circle at 0 0,
    rgba(255, 255, 255, 1) 0%,
    transparent 50%
  );
  transform-origin: 0 0;
  animation: rotate 2s linear alternate infinite;
  clip-path: polygon(0 0, 1000vh 400vh, 2000vh 0, 0 0);
  mix-blend-mode: screen;
}

.hidden-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 255, 255，0.2);
  background: linear-gradient(to right, transparent, white, transparent);
  background-clip: text;
  -webkit-background-clip: text;
  mix-blend-mode: overlay;
}
p {

  letter-spacing: 2.5rem;
  font-family:黑礼中字 ;
}
@keyframes rotate {
  from {
    transform: rotate(27deg);
  }
  to {
    transform: rotate(55deg);
  }
}
</style>
