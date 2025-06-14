<!-- 评论管理 -->
<template>
  <div class="comment-management">
    <div class="header">
      <h2>评论管理</h2>
    </div>

    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索评论内容"
        class="search-input"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-select v-model="filterStatus" placeholder="状态筛选" clearable>
        <el-option label="已审核" value="approved" />
        <el-option label="待审核" value="pending" />
        <el-option label="已删除" value="deleted" />
      </el-select>
    </div>

    <el-table :data="filteredComments" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="content" label="评论内容" />
      <el-table-column prop="articleTitle" label="所属文章" />
      <el-table-column prop="author" label="评论者" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="评论时间" />
      <el-table-column label="操作" width="300">
        <template #default="{ row }">
          <el-button
            v-if="row.status === 'pending'"
            type="success"
            size="small"
            @click="handleApprove(row)"
          >
            通过
          </el-button>
          <el-button
            v-if="row.status !== 'deleted'"
            type="danger"
            size="small"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
          <el-button
            v-if="row.status === 'deleted'"
            type="primary"
            size="small"
            @click="handleRestore(row)"
          >
            恢复
          </el-button>
          <el-button type="info" size="small" @click="handleViewArticle(row)">
            查看文章
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next"
      class="pagination"
    />

    <!-- 评论详情对话框 -->
    <el-dialog title="评论详情" v-model="detailVisible" width="600px">
      <div class="comment-detail">
        <div class="detail-item">
          <span class="label">评论内容：</span>
          <span class="value">{{ selectedComment?.content }}</span>
        </div>
        <div class="detail-item">
          <span class="label">评论者：</span>
          <span class="value">{{ selectedComment?.author }}</span>
        </div>
        <div class="detail-item">
          <span class="label">评论时间：</span>
          <span class="value">{{ selectedComment?.createdAt }}</span>
        </div>
        <div class="detail-item">
          <span class="label">所属文章：</span>
          <span class="value">{{ selectedComment?.articleTitle }}</span>
        </div>
        <div class="detail-item">
          <span class="label">状态：</span>
          <el-tag :type="getStatusTagType(selectedComment?.status)">
            {{ getStatusLabel(selectedComment?.status) }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

// 模拟数据
const comments = ref([
  {
    id: 1,
    content: "这篇文章写得很好，很有帮助！",
    articleTitle: "Vue3 新特性介绍",
    author: "user1",
    status: "approved",
    createdAt: "2023-01-02 10:00:00",
  },
  {
    id: 2,
    content: "期待更多这样的文章！",
    articleTitle: "我的旅行日记",
    author: "user2",
    status: "pending",
    createdAt: "2023-01-03 15:30:00",
  },
]);

// 搜索和筛选
const searchQuery = ref("");
const filterStatus = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);

const filteredComments = computed(() => {
  return comments.value.filter((comment) => {
    const matchSearch =
      !searchQuery.value ||
      comment.content.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus =
      !filterStatus.value || comment.status === filterStatus.value;
    return matchSearch && matchStatus;
  });
});

// 状态相关
const getStatusTagType = (status) => {
  const types = {
    approved: "success",
    pending: "warning",
    deleted: "danger",
  };
  return types[status] || "info";
};

const getStatusLabel = (status) => {
  const labels = {
    approved: "已审核",
    pending: "待审核",
    deleted: "已删除",
  };
  return labels[status] || "未知";
};

// 详情对话框
const detailVisible = ref(false);
const selectedComment = ref(null);

// 操作方法
const handleApprove = (row) => {
  const index = comments.value.findIndex((comment) => comment.id === row.id);
  if (index !== -1) {
    comments.value[index] = {
      ...row,
      status: "approved",
    };
    ElMessage.success("评论已通过审核");
  }
};

const handleDelete = (row) => {
  ElMessageBox.confirm("确定要删除该评论吗？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    const index = comments.value.findIndex((comment) => comment.id === row.id);
    if (index !== -1) {
      comments.value[index] = {
        ...row,
        status: "deleted",
      };
    }
    ElMessage.success("评论已删除");
  });
};

const handleRestore = (row) => {
  const index = comments.value.findIndex((comment) => comment.id === row.id);
  if (index !== -1) {
    comments.value[index] = {
      ...row,
      status: "approved",
    };
    ElMessage.success("评论已恢复");
  }
};

const handleViewArticle = (row) => {
  selectedComment.value = row;
  detailVisible.value = true;
};
</script>

<style scoped>
.comment-management {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.comment-detail {
  padding: 20px;
}

.detail-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.detail-item .label {
  width: 100px;
  color: #606266;
}

.detail-item .value {
  flex: 1;
  color: #303133;
}
</style>
