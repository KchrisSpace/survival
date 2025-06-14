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
import { ElMessage } from "element-plus";

const username = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.get("http://localhost:3000/login", {
      username: username.value,
      password: password.value,
    });

    console.log(response);
    if (response.status === 200) {
      // 只要登录成功就进入管理后台
      localStorage.setItem("token", "admin-token");
      ElMessage.success("登录成功");
      router.push({ name: "Admin" });
    } else {
      ElMessage.error("登录失败");
    }
  } catch (error) {
    console.error("登录错误:", error);
    ElMessage.error("登录失败");
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
  color: #fff;
  background-color: transparent;
}

input::placeholder {
  color: #fff;
  opacity: 0.7;
}

input:focus {
  border: 1px solid #fffcfc;
  outline: none;
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
