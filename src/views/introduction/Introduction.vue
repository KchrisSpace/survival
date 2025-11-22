<template>
  <div
    class="introduction"
    :class="{ 'fade-in': isMounted }"
    @mousemove="handleMouseMove"
    @mouseleave="resetBg"
  >
    <div class="buttons" :class="{ hide: area !== 'none' }">
      <button class="intro-btn btn-left">
        <span class="chinese">关于site</span>
      </button>
      <button class="intro-btn btn-right">
        <span class="chinese">关于mine</span>
      </button>
    </div>
    <!-- 背景层：包含背景图片和左侧插画 -->
    <div class="bg" :class="bgClass"></div>
    <!-- 前景层：右侧模态框 -->
    <Rules class="rules" :is-visible="area === 'left'" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Rules from "../introduction/components/rules.vue";

const area = ref("none"); // 'left' | 'right' | 'none'
const isMounted = ref(false);

onMounted(() => {
  // 延迟一帧确保动画能正常触发
  requestAnimationFrame(() => {
    isMounted.value = true;
  });
});

function handleMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const width = rect.width;
  const percentage = (x / width) * 100;

  // 中间30%区域（35%-65%）不触发滑动
  if (percentage >= 35 && percentage <= 65) {
    area.value = "none";
  } else if (percentage < 35) {
    // 左侧35%区域触发向右滑动
    area.value = "left";
  } else {
    // 右侧35%区域触发向左滑动
    area.value = "right";
  }
}

function resetBg() {
  area.value = "none";
}

const bgClass = computed(() => {
  if (area.value === "left") return "move-bg-right";
  if (area.value === "right") return "move-bg-left";
  return "";
});
</script>

<style scoped>
.introduction {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to right,
    black 50%,
    white 50%
  ); /* 左侧为黑色，右侧为白色 */
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
}
.introduction.fade-in {
  opacity: 1;
}
.bg {
  width: 100vw;
  height: 100vh;
  background-image: url(/png/bg-introduction.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: background-position 0.6s cubic-bezier(0.7, 0, 0.3, 1);
}
/* 移动距离 */
.bg.move-bg-right {
  background-position: calc(50% + 32vw) center;
}
.bg.move-bg-left {
  background-position: calc(50% - 35vw) center;
}
.rules {
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5%;
}
.buttons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.6s ease-in-out;
}
.buttons.hide {
  opacity: 0;
}
.intro-btn {
  position: absolute;
  padding: 12px 20px;
  font-size: 36px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.btn-left {
  top: 35%;
  left: 8%;
  transform: translateY(-50%);
  background-color: rgba(200, 200, 200, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff8a;
}

.btn-left:hover {
  background-color: rgba(220, 220, 220, 0.8);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) scale(1.05);
}
.btn-right {
  bottom: 35%;
  right: 8%;
  transform: translateY(50%);
  background-color: rgba(200, 180, 220, 0.4);
  border: 1px solid rgba(93, 92, 92, 0.3);
  color: #605e5e8a;
}
.btn-right:hover {
  background-color: rgba(200, 180, 220, 0.6);
  transform: translateY(50%) scale(1.05);
}
</style>
