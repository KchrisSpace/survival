<!--  -->
<template>
  <div class="rules" :class="{ visible: isVisible }">
    <div class="rules-content">
      <img
        src="/public/png/introduction/cross.png"
        alt=""
        class="cross"
        @click="close"
      />
      <div class="rules-content-title">
        <h1>我来做一个小小的介绍</h1>
      </div>
      <div class="main">
        <div class="rules-content-list">
          <div>
            <ul>
              <li>在这个site，请不要试图复制任何文字内容</li>
              <li>请不要试图改变窗口大小</li>
              <li>在这里，你没有办法选中文本</li>
              <li>也没有办法打开f12控制台</li>
              <li>事实上我并不介意你查看我的源代码</li>
              <li>有兴趣的话，可以来我的技术交流区</li>
              <li>或者，你可以通过一个小小的考验</li>
              <li>来证明你是一个厉害的大朋友</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handleCloseBtnClick"]);
function close() {
  // console.log("点击查");
  emit("handleCloseBtnClick", true);
}
</script>

<style scoped>
.rules {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: none;
  padding-right: 5%;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
}
.rules.visible {
  opacity: 1;
}

.rules-content {
  width: 80%;
  height: 75%;
  background: linear-gradient(
    to top,
    rgba(138, 99, 185, 0.5),
    rgba(129, 118, 145, 0.304)
  );
  backdrop-filter: blur(20px);
  color: #c2b7b7;
  box-shadow: 10px 0 10px 0 rgba(138, 99, 185, 0.5);
  transition: all 0.3s ease;
  font-family: "马克笔";
  border-radius: 20px;
  overflow: hidden;
  cursor: default;
  pointer-events: auto;
  transform: scale(0.85) translateX(-30%);
  transform-origin: center right;
}

.rules-content .cross {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.rules-content-title {
  margin-top: 5px;
  height: 50px;
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
  width: 100%;
  padding: 0 60px;
}

ul {
  list-style: none;
  padding-left: 20px;
}

li {
  font-size: 25px;
  margin-bottom: 15px;
  line-height: 1.4;
  position: relative;
  padding-left: 25px;
  padding-bottom: 8px;
  transition: transform 0.2s ease;
}

li::before {
  content: "✦";
  position: absolute;
  left: 0;
  color: #6a4c93;
  font-size: 20px;
  transition: transform 0.2s ease;
}

li::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-image: repeating-linear-gradient(
    90deg,
    #6a7bdb 0px 4px,
    transparent 4px 8px
  );
  opacity: 0.8;
  transition: all 0.3s ease;
}

li:hover {
  transform: translateX(5px);
}

li:hover::before {
  transform: scale(1.2);
}

li:hover::after {
  opacity: 1;
  background-image: repeating-linear-gradient(
    90deg,
    #4a5cd9 0px 4px,
    transparent 4px 8px
  );
  height: 4px;
}

.rules-over {
  margin-bottom: 100px;
}

.challenge {
  position: absolute;
  right: 0;
  left: 3p;
  transform: translateY(-50%);
  width: 30%;
  scale: 0.7;
  pointer-events: auto;
  cursor: pointer;
}
</style>
