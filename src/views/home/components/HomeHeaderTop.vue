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
    18,
    18,
    18,
    0.7
  ); /* Semi-transparent dark background */
  backdrop-filter: blur(10px); /* Frosted glass effect */
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
}
.header-left {
  font-family: "hakidame", "onryou"; /* 使用自定义字体 */
  flex: 1;
  font-size: 40px;
  height: 100%;
  background-color: #f8f6f644;
  text-align: center;
  line-height: 60px; /* 垂直居中 */
}

.header-left p {
  letter-spacing: 10px;
  margin: 0;
}

.header-right {
  width: 180px;
  height: 100%;
  text-align: center;
  line-height: 60px; /* 垂直居中 */
  cursor: pointer;
  background-color: #97b4aedd;
  transition: background-color 0.3s;
}
button {
  background-color: #97b4aedd;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 10px;
}
</style>
