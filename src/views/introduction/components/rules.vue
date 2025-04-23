<!--  -->
<template>
  <div class="page2">
    <div class="page2-content">
      <div class="page2-content-title">
        <h3>让我先来做一个介绍</h3>
      </div>
      <div class="main">
        <div class="page2-content-list">
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
      <Challenge class="challenge" />
      </div>
    </div>
    <!-- <div class="page2-over"></div> -->
  </div>
</template>

<script setup>
// import Challenge from "../Challenge.vue";
</script>

<style scoped>
.page2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}
.page2-content {
  width: 80%;
  height: 75%;
  background:linear-gradient(to top, rgba(138, 99, 185, 0.5), rgba(255, 255, 255, 0.3));
  backdrop-filter: blur(20px); /* Frosted glass effect */
  color: #342f2f; /* Dark 模式文字颜色 */
  /* border: 3px solid #eeebeb;   */
  box-shadow: 10px 0 10px 0 rgba(120, 109, 109, 0.6);
  transition: all 0.3s ease; /* 添加过渡效果 */
  font-family: "黑礼中字", "破碎中字", "破碎中字2";
  border-radius: 20px;
}
.page2-content-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  font-family: "破碎中字";
}
.main{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 200px;
}
.page2-content-list {
  font-size: 16px;
  margin: 50px 60px;
  li {
    font-size: 25px;
  }
  ul{
    /* list-style: none; */
    display: flex;
    flex-direction: column;
    gap: 10px
    ;
  } 
}
.page2-over {
  margin-bottom: 100px;
}
 
</style>
