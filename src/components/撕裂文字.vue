<!--  -->
<template>
  <div class="container">
    <div class="word" style="--i: 0">我是小妖怪,逍遥又自在。。</div>
    <div class="word" style="--i: 1">杀人不眨眼吃人不放盐。</div>
    <div class="word" style="--i: 2">一七八个肚子要撑破。</div>
    <div class="word" style="--i: 3">茅房去拉屎，想起忘带纸。</div>
  </div>
</template>

<script setup></script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  position: relative;
  font-size: 6rem;
  background: #111;
  color: #fff;
  filter: contrast(25) blur(1px);
  min-height: 100vh;
  overflow: hidden;
}

.word {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: word 12s infinite ease-in-out;
  animation-delay: calc(var(--i) * 3s);
}

@keyframes word {
  0%,
  5% {
    filter: blur(0px);
    opacity: 1;
  }
  20%,
  80% {
    filter: blur(1rem);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
}】、
</style>
