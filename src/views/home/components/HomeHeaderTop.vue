<template>
  <div class="home-header-top">
    <div class="header-left">
      <p class="welcometip">{{ welcomeTip }}</p>
    </div>
    <button @click="handleClick">{{ buttonText }}</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 计算属性，返回固定的文本
const welcomeTip = computed(() => {
  return "これがおまえが行きたかった地獄だな";
});

// 计算属性，返回固定的按钮文字
const buttonText = computed(() => {
  return "逃げろ！";
});

const handleClick = () => {
  router.push("/introduction");
};
</script>

<style scoped>
/* 引入自定义字体 */

.home-header-top {
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 60px;
  background-color: rgba(
    255,
    253,
    253,
    0.1
  ); /* Semi-transparent dark background */
  backdrop-filter: blur(5px); /* Frosted glass effect */
  color: #ffffff; /* Dark 模式文字颜色 */
  border: 3px solid #ffffff; /* Dark 模式下边框颜色 */
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease; /* 添加过渡效果 */
}
.welcometip {
  /* 超出时显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: inherit;
  letter-spacing: 20px;
}
.header-left {
  font-family: "hakidame", "onryou"; /* 使用自定义字体 */
  flex: 1;
  font-size: 40px;
  height: 100%;

  text-align: center;
  line-height: 60px; /* 垂直居中 */
}

.header-left p {
  letter-spacing: 10px;
  margin: 0;
}

.header-right {
  background-color: inherit;
  width: 180px;
  height: 100%;
  text-align: center;
  line-height: 60px; /* 垂直居中 */
  cursor: pointer;
  /* background-color: #97b4aedd; */
  transition: background-color 0.3s;
}
button {
  width: 12rem;
  height: 100%;
  border: none;
  background-color: inherit;
  opacity: 0;
  font-family: 黑礼中字;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #bae6dddd;
  opacity: 1;
  font-size: 40px;
  transition: background-color 0.3s;
}
</style>
