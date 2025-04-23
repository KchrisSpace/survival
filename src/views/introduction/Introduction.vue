<!--  简介-->
<template>
  <div class="introduction">
    <div
      class="container"
      :class="{ 'freeze-left': freezeLeft, 'freeze-right': freezeRight }"
      @click="handleClick"
    >
      <div
        class="left"
        @mouseenter="!isFreeze && (side = 'left')"
        @mouseleave="!isFreeze && (side = null)"
      ></div>
      <div
        class="right"
        @mouseenter="!isFreeze && (side = 'right')"
        @mouseleave="!isFreeze && (side = null)"
      ></div>
      <div class="titles">
        <div class="title site">
          <p>site介绍</p>
        </div>
        <div class="title mine">
          <p>mine介绍</p>
        </div>
      </div>
      <div class="bg"></div>
    </div>
    <Rules
      v-if="freezeLeft || side === 'left'"
      class="rules"
      @click="handleClick"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Rules from "./components/rules.vue";

const side = ref(null);
const freezeLeft = ref(false);
const freezeRight = ref(false);

const isFreeze = computed(() => freezeLeft.value || freezeRight.value);

const handleClick = () => {
  if (isFreeze.value) {
    // 如果已经定格，点击任意位置解除定格
    freezeLeft.value = false;
    freezeRight.value = false;
    side.value = null;
    return;
  }

  if (side.value === "left") {
    freezeLeft.value = true;
    freezeRight.value = false;
  } else if (side.value === "right") {
    freezeRight.value = true;
    freezeLeft.value = false;
  }
};
</script>

<style scoped>
.introduction {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #aadef6 50%, #fae5f8 -50%);
  z-index: -10;
}

.container {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
}

.left,
.right {
  width: 25%;
  height: 100%;
  position: relative;
  z-index: 10;
  /* border: 1px solid #000; */
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(/public/png/bg-girl.png);
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
  transition: transform 1s;
}

.container:not(.freeze-left):not(.freeze-right) .left:hover ~ .bg,
.freeze-left .bg {
  transform: translateX(50vw);
}

.container:not(.freeze-left):not(.freeze-right) .right:hover ~ .bg,
.freeze-right .bg {
  transform: translateX(-50vw);
}

.titles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

.title {
  padding: 20px 40px;
  border-radius: 15px;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.166);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: opacity 0.2s ease, transform 0.5s ease;
}

.title p {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  letter-spacing: 2px;
}

.site {
  position: absolute;
  left: 8%;
  top: 6%;
}

.mine {
  position: absolute;
  left: 78%;
  top: 40%;
}

.container:not(.freeze-left):not(.freeze-right) .left:hover ~ .titles .title,
.container:not(.freeze-left):not(.freeze-right) .right:hover ~ .titles .title,
.freeze-left .titles .title,
.freeze-right .titles .title {
  opacity: 0;
  transform: scale(0.5);
}

.rules {
  width: 80%;
  position: absolute;
  /* display: none; */
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  /* z-index: 30; */
  z-index: 2;
  pointer-events: auto;
}
</style>
