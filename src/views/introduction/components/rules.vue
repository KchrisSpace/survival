<!--  -->
<template>
  <div class="rules">
    <div class="rules-content">
      <div class="rules-content-title">
        <h3>让我先来做一个介绍</h3>
      </div>
      <div class="main">
        <div class="rules-content-list">
          <div>
            <ul>
              <li>在这个site，请不要试图复制任何文字内容</li>
              <li>请不要试图缩放窗口大小</li>
              <li>在这里，你没有办法选中文本</li>
              <li>也没有办法打开f12控制台</li>
              <li>事实上我并不介意你查看我的源代码</li>
              <li>有兴趣的话，可以来我的技术交流区</li>
              <li>或者，你可以通过一个小小的考验</li>
              <li>来证明你是一个厉害的访问者</li>
            </ul>
          </div>
        </div>
        <Challenge class="challenge" @cardClick="handleCardClick" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Challenge from "./Challenge.vue";
const emit = defineEmits(["cardClick"]);

const handleCardClick = (card) => {
  emit("cardClick", card);
};
</script>

<style scoped>
.rules {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.rules-content {
  width: 80%;
  height: 75%;
  background: linear-gradient(
    to top,
    rgba(138, 99, 185, 0.5),
    rgba(255, 255, 255, 0.3)
  );
  backdrop-filter: blur(20px);
  color: #342f2f;
  box-shadow: 10px 0 10px 0 rgba(120, 109, 109, 0.6);
  transition: all 0.3s ease;
  font-family: "马克笔";
  border-radius: 20px;
  overflow: hidden;
}

.rules-content-title {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "破碎中字";
}

.rules-content-title h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.main {
  height: calc(100% - 80px);
  padding: 20px;
  position: relative;
  display: flex;
}

.rules-content-list {
  width: 65%;
  padding: 0 60px;
}

ul {
  list-style: disc;
  padding-left: 20px;
}

li {
  font-size: 25px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.rules-over {
  margin-bottom: 100px;
}

.challenge {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 30%;
}
</style>
