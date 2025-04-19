<!-- 挑战 -->
<template>
  <div class="challenge">
    <div class="challenge-cards">
      <div
        class="challenge-card"
        v-for="card in challengeCards"
        :key="card"
        :class="{
          'rotate-easy': card.title === 'easy',
          'rotate-hard': card.title === 'hard',
          'rotate-normal': card.title === 'normal',
        }"
      >
        <div class="challenge-card-title">
          <h3>{{ card.title }}</h3>
        </div>
        <div class="challenge-card-content">
          <p>{{ card.content }}</p>
        </div>
      </div>
    </div>
    <div class="password">
      <input type="password" placeholder="输入密码" />
      <button>提交</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const challengeCards = ref([
  {
    title: "easy",
    content: "找出来吧",
  },
  {
    title: "normal",
    content: "猜出来吧",
  },
  {
    title: "hard",
    content: "破解代码吧",
  },
]);
</script>

<style scoped>
.challenge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.challenge-cards {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;

  align-items: center;
}

.challenge-card {
  width: 140px;
  height: 200px;
  position: absolute;
  border: 3px solid #eeeaea;
  background-color: #878383;
  transition: all 0.6s ease;
  transform-origin: 50% 100%;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.challenge-card-content {
  display: none;
}
.challenge-card:hover {
  animation: jump 1s infinite;
  scale: 1.1;
  z-index: 10;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.challenge-card:hover .challenge-card-content {
  display: block;
}
@keyframes jump {
  0% {
    transform: translateY(0) rotate(var(--rotation))
      translateX(var(--translateX));
  }
  50% {
    transform: translateY(-30px) rotate(var(--rotation))
      translateX(var(--translateX));
  }
  100% {
    transform: translateY(0) rotate(var(--rotation))
      translateX(var(--translateX));
  }
}

.rotate-easy {
  --rotation: 20deg;
  --translateX: 100px;
  transform: rotate(20deg) translateX(100px);
}

.rotate-normal {
  --rotation: 0deg;
  --translateX: 0;
  transform: rotate(0deg);
}

.rotate-hard {
  --rotation: -20deg;
  --translateX: -100px;
  transform: rotate(-20deg) translateX(-100px);
}

.challenge-card-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
}
.challenge-card-content {
  font-size: 16px;
  text-align: center;
  margin-top: 30px;
}
</style>
