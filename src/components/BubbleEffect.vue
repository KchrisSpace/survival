<template>
  <div class="bubble-effect">
    <img :style="magicStickStyle" src="/public/gif/magicstick.gif" alt="Magic Stick" />
    <i v-for="(bubble, index) in bubbles" :key="index" :style="bubble.style" class="bubble"></i>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue';

const bubbles = reactive([]);
const magicStickStyle = reactive({
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

const createBubble = (x, y) => {
  const bubble = {
    style: {
      left: `${x}px`,
      top: `${y}px`,
      '--x': `${Math.random() * 400 - 200}px`,
      '--y': `${Math.random() * 400 - 200}px`,
      scale: `${Math.random() * 2 + 1}`,
      position: 'absolute',
    },
  };
  bubbles.push(bubble);
  // 使用定时器反而卡顿

  // setTimeout(() => {
  //   const index = bubbles.indexOf(bubble);
  //   if (index !== -1) {
  //     bubbles.splice(index, 1);
  //   }
  // }, 5000);
};

const handleMouseMove = (event) => {
  magicStickStyle.left = `${event.pageX+5}px`;
  magicStickStyle.top = `${event.pageY+5}px`;
  const bubbleX = event.pageX + Math.random() * 20 - 10;
  const bubbleY = event.pageY + Math.random() * 20 - 20;
  createBubble(bubbleX, bubbleY);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
.bubble-effect {
  position: fixed; /* 使用 fixed 定位 */
  top: 0;
  left: 0;
  width: 100vw; /* 占满整个视口宽度 */
  height: 100vh; /* 占满整个视口高度 */
  pointer-events: none; /* 确保不会干扰其他页面元素的交互 */
  z-index: 9999; /* 确保在最上层 */

}

.bubble-effect img {
  position: absolute;
  width: 100px;
  height: auto;
  pointer-events: none;
  z-index: 10;
}

.bubble {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: radial-gradient(circle, #a39b9bbb);
  border-radius: 50%;
  z-index: 7;
  pointer-events: none;
  box-shadow: inset 0 0 10px rgb(225, 230, 194);
  animation: animate 2.6s linear forwards;
}

.bubble::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(#fff, transparent);
  transform: scale(0.25) translate(-70%, -70%);
}

@keyframes animate {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }

  100% {
    transform: translate(var(--x), var(--y));
    opacity: 0;
  }
}
</style>