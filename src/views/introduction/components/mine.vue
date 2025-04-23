<!-- 我的 -->
<template>
  <div class="mine">
    <div class="main">
      <div class="head-img">
        <img src="/png/head.png" alt="加载失败" />
      </div>
      <div class="info">
        <p>NAME</p>
        <P class="sign">SIGNmeitbxsjdnkjfdnelherilfblf</P>
      </div>
    </div>

    <mine-cards />
  </div>
</template>

<script setup>
import mineCards from "./mine-cards.vue";
</script>

<style scoped>
.mine {
  margin: 20px;
  padding: 20px;
  position: relative;
  width: 80vw;
  height: 80vh;
  background: linear-gradient(
    to bottom,
    rgba(242, 246, 245, 0.1),
    rgba(199, 143, 206, 0.2)
  );
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.main {
  position: relative;
  width: 100%;
  height: 20%;
  background: linear-gradient(
    to bottom,
    rgba(138, 99, 185, 0.3),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.head-img {
  width: 120px;
  height: 120px;
  background-color: #fff;
  position: absolute;
  left: -20px;
  top: -20px;
  transform: none;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}
.head-img:hover {
  transform: scale(1.05);
}
.head-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info {
  position: absolute;
  left: 160px;
  top: 30px;
  transform: none;
  text-align: left;
}
.info p {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  letter-spacing: 1px;
}
.sign {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 10px;
  font-style: italic;
  max-width: 300px;
  line-height: 1.4;
}
</style>
