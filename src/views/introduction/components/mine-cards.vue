<!-- 我的卡片 -->
<template>
  <div class="mine-cards">
    <div class="card" v-for="item in 4" :key="item">
      <div class="card-content">
        <div class="card-img">
          <img src="/public/png/head.png" alt="加载失败" />
        </div>
        <div class="card-info">
          <h3>标题</h3>
          <p>描述内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.mine-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  margin: 0px 20px;
  padding: 30px;
  width: 80%;
  height: 80%;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.mine-cards::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.card {
  width: 200px;
  height: 250px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
}

.card-content {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  text-align: center;
}

.card-info h3 {
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.card-info p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}
</style>
