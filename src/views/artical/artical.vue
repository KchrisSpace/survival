<!-- 文章 -->
<template>
  <div class="article-container">
    <div class="article-list">
      <div v-for="item in articles" :key="item.id" class="article-card">
        <div class="article-header">
          <h2 class="article-title">{{ item.title }}</h2>
          <div class="article-header-right">
            <span class="article-tag">{{ item.tag }}</span>
            <el-button
              type="danger"
              :icon="Delete"
              circle
              size="small"
              class="delete-btn"
              @click="handleDelete(item)"
            />
          </div>
        </div>
        <div class="article-content">
          <p>{{ item.content }}</p>
        </div>
        <div class="article-footer">
          <span class="article-date">{{ item.date || "2024-01-01" }}</span>
          <div class="article-actions">
            <el-button type="text" size="small">阅读更多</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

const articles = ref([]);

// 获取文章列表
const fetchArticles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/article");
    articles.value = response.data;
  } catch (error) {
    console.error("获取文章列表失败:", error);
    ElMessage.error("获取文章列表失败");
  }
};

// 删除文章
const handleDelete = async (item) => {
  try {
    await ElMessageBox.confirm("确定要删除这篇文章吗？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    await axios.delete(`http://localhost:3000/article/${item.id}`);
    await fetchArticles();
    ElMessage.success("删除成功");
  } catch (error) {
    if (error !== "cancel") {
      console.error("删除文章失败:", error);
      ElMessage.error("删除文章失败");
    }
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
.article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.article-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.article-header {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.article-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #303133;
  margin: 0;
  flex: 1;
}

.article-tag {
  background: #f0f2f5;
  color: #606266;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover .delete-btn {
  opacity: 1;
}

.article-content {
  flex: 1;
  margin-bottom: 15px;
}

.article-content p {
  color: #606266;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
}

.article-date {
  color: #909399;
  font-size: 0.9rem;
}

.article-actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .article-container {
    padding: 15px;
  }

  .article-list {
    grid-template-columns: 1fr;
  }

  .article-card {
    padding: 15px;
  }

  .article-title {
    font-size: 1.1rem;
  }
}
</style>
