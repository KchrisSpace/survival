<!-- 挑战 -->
<template>
  <div class="challenge">
    <div class="challenge-container">
      <div class="challenge-title">看看都有哪些挑战吧</div>
      <div class="challenge-content">
        <p>挑战一：快速找到我</p>
        <p>挑战二：猜出我的名字</p>
        <p>挑战三：破解我的代码</p>
        <p>挑战四：猜出我的生日</p>
        <p>敬请期待</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.challenge {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  padding: 2rem;
}

.challenge-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.challenge-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(255, 192, 203, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(173, 216, 230, 0.1) 0%,
      transparent 50%
    );
  z-index: 1;
  pointer-events: none;
}

.challenge-title,
.challenge-content {
  /* position: relative; */
  font-weight: 300;
  font-size: 1.2rem;
  z-index: 2;
}

.challenge-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #2c3e50;
  text-align: center;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.3s ease;
  opacity: 1;
  width: 100%;
}


.challenge-content {
  position: relative;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
}

.challenge-container:hover .challenge-title {
  opacity: 0;
  transform: translate(-50%, -70%);
  transition: opacity 0.1s ease, transform 0.2s ease;
}

.challenge-container:hover .challenge-content {
  max-height: 500px;
  padding: 1rem 0;
  transition: max-height 0.5s ease-out, padding 0.5s ease-out;
}

.challenge-content p {
  font-size: 1.2rem;
  padding: 0.8rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  transition: all 0.3s ease;
  transform: translateX(-20px);
  opacity: 0;
  position: relative;
  overflow: hidden;
}

.challenge-content p::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: rotate(45deg);
  transition: all 0.3s ease;
  opacity: 0;
}

.challenge-content p:hover::after {
  animation: flowingLight 1.5s linear infinite;
  opacity: 1;
}

@keyframes flowingLight {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.challenge-content p:nth-child(1) {
  color: #ff6b6b;
}

.challenge-content p:nth-child(1)::after {
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 106, 107, 0.3),
    transparent
  );
}

.challenge-content p:nth-child(2) {
  color: #ff8e8e;
}

.challenge-content p:nth-child(2)::after {
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 142, 142, 0.3),
    transparent
  );
}

.challenge-content p:nth-child(3) {
  color: #ffb347;
}

.challenge-content p:nth-child(3)::after {
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 179, 71, 0.3),
    transparent
  );
}

.challenge-content p:nth-child(4) {
  color: #77dd77;
}

.challenge-content p:nth-child(4)::after {
  background: linear-gradient(
    45deg,
    transparent,
    rgba(119, 221, 119, 0.3),
    transparent
  );
}

.challenge-content p:nth-child(5) {
  color: #84b6f4;
}

.challenge-content p:nth-child(5)::after {
  background: linear-gradient(
    45deg,
    transparent,
    rgba(132, 182, 244, 0.3),
    transparent
  );
}

.challenge-content p::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  transition: all 0.3s ease;
}

.challenge-content p:nth-child(1)::before {
  background: #ff9aa2;
}

.challenge-content p:nth-child(2)::before {
  background: #ffb7b2;
}

.challenge-content p:nth-child(3)::before {
  background: #ffdac1;
}

.challenge-content p:nth-child(4)::before {
  background: #e2f0cb;
}

.challenge-content p:nth-child(5)::before {
  background: #b5ead7;
}

.challenge-container:hover .challenge-content p {
  transform: translateX(0);
  opacity: 1;
}

.challenge-content p:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateX(10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.challenge-content p:hover::before {
  width: 8px;
}

@media (max-width: 768px) {
  .challenge {
    padding: 1rem;
  }

  .challenge-container {
    padding: 1.5rem;
  }

  .challenge-title {
    font-size: 1.5rem;
  }

  .challenge-content p {
    font-size: 1rem;
    padding: 0.6rem;
  }
}
</style>
