<!-- 我的 -->
<template>
  <div class="mine" >
    <div class="main">
      <div class="head-img">
        <img src="/png/head.png" alt="头像" />
      </div>
      <div class="info">
        <p>{{ userData?.name || "NAME" }}</p>
        <p class="sign">{{ userData?.sign || "Loading..." }}</p>
      </div>
    </div>

    <mine-cards :cards="userData?.card || []"  />
  </div>
</template>

<script setup>
import mineCards from "./mine-cards.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const userData = ref(null);

const fetchUserData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/mine");
    // 由于后端返回的是数组，我们取第一个元素
    userData.value = response.data[0];
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

onMounted(() => {
  fetchUserData();
});
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
  width: 80%;
  position: absolute;
  left: 120px;
  top: 20px;
  transform: none;
  text-align: left;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* min-width: 600px; */
}
.info p {

  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  letter-spacing: 2px;
  font-family: "Arial", sans-serif;
  position: relative;
  display: inline-block;
}
.info p::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent);
}
.sign {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 15px;
  font-style: italic;
  max-width: 600px;
  line-height: 1.6;
  padding-left: 5px;
  border-left: 3px solid rgba(255, 255, 255, 0.3);
}
</style>
