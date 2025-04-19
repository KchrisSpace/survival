<!-- 登录页面 -->
<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">Login</h2>
      <div class="input">
        <input type="text" v-model="username" placeholder="请输入账号" />
        <input type="password" v-model="password" placeholder="请输入密码" />
      </div>
      <div class="loginbutton">
        <button @click="handleLogin">login</button>
      </div>
    </div>
  </div>
  <div id="bubble-container">
    <BubbleEffect />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import BubbleEffect from "../../components/BubbleEffect.vue";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const validCredentials = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get("src/json/data.json");
    validCredentials.value = response.data.users; // 直接提取数据
    console.log("获取的用户数据:", validCredentials.value); // 打
  } catch (err) {
    console.error(err);
  }
});

const handleLogin = () => {
  // 使用some方法遍历有效凭证数组，检查是否存在匹配的用户名和密码
  const isValid = validCredentials.value.some(
    (cred) =>
      cred.username === username.value && cred.password === password.value
  );

  // 根据凭证验证结果，执行相应的操作
  if (isValid) {
    // 清空错误消息并导航到RouteA
    errorMessage.value = "";
    // 跳转到首页
    router.push({ name: "Home" });
    console.log("登录成功");
  } else {
    // 显示错误消息提示用户名或密码错误
    alert("用户名或密码错误");
    // 并清空输入框
    username.value = "";
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  cursor: none;
}

.login-container {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("https://w.wallhaven.cc/full/5g/wallhaven-5g22q5.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}
input {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 0 10px;
  border: 1px solid #f6f3f35c;
  border-radius: 15px;
  font-size: 16px;
  color: #fff; /* 输入文本颜色 */
  background-color: transparent; /* 确保背景透明 */
}

/* 修改占位符文本颜色 */
input::placeholder {
  color: #fff; /* 设置占位符文本为白色 */
  opacity: 0.7; /* 可选：设置透明度 */
}

/* 添加聚焦样式 */
input:focus {
  border: 1px solid #fffcfc; /* 修改为你想要的边框颜色 */
  outline: none; /* 去掉默认的聚焦轮廓 */
  box-shadow: 0 1px 3px rgb(255, 253, 253);
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}
.login-box {
  width: 400px;
  height: 270px;
  background-color: #ffffff0e;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #fffcfc56;
  backdrop-filter: blur(3px);
  box-shadow: 0 0 3ch rgba(0, 0, 0, 0.5);
}
.login-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
}
.loginbutton {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
}
.loginbutton button {
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 10px;
  color: #292727;
  background-color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.loginbutton button:hover {
  background-color: #ac9f9f;
  color: #fff;
}
a {
  color: #070707;
  text-decoration: none;
}
a:hover {
  color: #fff;
  text-decoration: underline;
}
</style>
