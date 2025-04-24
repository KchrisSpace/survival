<!-- 我的卡片 -->
<template>
  <div class="mine-cards">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card"
      :style="{ '--delay': `${index * 0.3}s` }"
    >
      <div class="card-content">
        <div class="card-header">
          <div class="card-img">
            <img :src="card.image" alt="卡片图标" />
          </div>
          <div class="card-title">
            <h3>{{ card.title }}</h3>
          </div>
        </div>
        <div class="card-body">
          <p>{{ card.description }}</p>
        </div>
        <div class="card-footer">
          <span
            v-for="(tag, tagIndex) in card.tag"
            :key="tagIndex"
            class="card-tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div class="empty-card"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.mine-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  padding: 30px;
  width: 100%;
  height: 80%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.mine-cards::-webkit-scrollbar {
  display: none;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  animation: cardAppear 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--delay, 0s);
  opacity: 0;
  transform: translateY(50px);
}

@keyframes cardAppear {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-card {
  background: transparent;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  transition: all 0.3s ease;
  animation: emptyCardAppear 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.9s;
  opacity: 0;
  transform: translateY(50px);
}

@keyframes emptyCardAppear {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.card:hover::before {
  opacity: 1;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 25px;
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.card-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.card:hover .card-img {
  transform: scale(1.1);
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  flex: 1;
}

.card-title h3 {
  margin: 0;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 4px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-body {
  flex: 1;
  margin-bottom: 20px;
}

.card-body p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
}

.card-footer {
  display: flex;
  gap: 10px;
  margin-top: auto;
}

.card-tag {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.card:hover .card-tag {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .mine-cards {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }

  .card {
    padding: 20px;
  }

  .card-img {
    width: 50px;
    height: 50px;
  }

  .card-title h3 {
    font-size: 1.2rem;
  }

  .card-body p {
    font-size: 0.9rem;
  }
}
</style>
