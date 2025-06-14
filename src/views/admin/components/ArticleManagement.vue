<!-- 文章管理 -->
<template>
  <div class="article-management">
    <div class="header">
      <h2>文章管理</h2>
      <el-button type="primary" @click="handleAdd">添加文章</el-button>
    </div>

    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索文章标题"
        class="search-input"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-select v-model="filterCategory" placeholder="分类筛选" clearable>
        <el-option label="技术" value="tech" />
        <el-option label="生活" value="life" />
        <el-option label="旅行" value="travel" />
        <el-option label="美食" value="food" />
      </el-select>
      <el-select v-model="filterStatus" placeholder="状态筛选" clearable>
        <el-option label="已发布" value="published" />
        <el-option label="草稿" value="draft" />
      </el-select>
    </div>

    <el-table :data="filteredArticles" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category" label="分类">
        <template #default="{ row }">
          <el-tag :type="getCategoryTagType(row.category)">
            {{ getCategoryLabel(row.category) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 'published' ? 'success' : 'info'">
            {{ row.status === "published" ? "已发布" : "草稿" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="更新时间" />
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button
            :type="row.status === 'published' ? 'warning' : 'success'"
            size="small"
            @click="handleToggleStatus(row)"
          >
            {{ row.status === "published" ? "下架" : "发布" }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">
            删除
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

    <!-- 添加/编辑文章对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="800px">
      <el-form
        ref="articleForm"
        :model="articleForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleForm.title" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="articleForm.category">
            <el-option label="技术" value="tech" />
            <el-option label="生活" value="life" />
            <el-option label="旅行" value="travel" />
            <el-option label="美食" value="food" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="articleForm.content" type="textarea" :rows="10" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="articleForm.status">
            <el-radio label="draft">草稿</el-radio>
            <el-radio label="published">发布</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";

// 文章数据
const articles = ref([]);
const loading = ref(false);

// 获取文章列表
const fetchArticles = async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:3000/article");
    articles.value = response.data;
  } catch (error) {
    console.error("获取文章列表失败:", error);
    ElMessage.error("获取文章列表失败");
  } finally {
    loading.value = false;
  }
};

// 搜索和筛选
const searchQuery = ref("");
const filterCategory = ref("");
const filterStatus = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const filteredArticles = computed(() => {
  return articles.value.filter((article) => {
    const matchSearch =
      !searchQuery.value ||
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategory =
      !filterCategory.value || article.category === filterCategory.value;
    const matchStatus =
      !filterStatus.value || article.status === filterStatus.value;
    return matchSearch && matchCategory && matchStatus;
  });
});

// 分类相关
const getCategoryTagType = (category) => {
  const types = {
    tech: "primary",
    life: "success",
    travel: "warning",
    food: "danger",
  };
  return types[category] || "info";
};

const getCategoryLabel = (category) => {
  const labels = {
    tech: "技术",
    life: "生活",
    travel: "旅行",
    food: "美食",
  };
  return labels[category] || "其他";
};

// 表单相关
const dialogVisible = ref(false);
const dialogTitle = ref("添加文章");
const articleForm = ref({
  id: null,
  title: "",
  category: "tech",
  content: "",
  status: "draft",
});

const rules = {
  title: [
    { required: true, message: "请输入标题", trigger: "blur" },
    { min: 3, max: 100, message: "长度在 3 到 100 个字符", trigger: "blur" },
  ],
  category: [{ required: true, message: "请选择分类", trigger: "change" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }],
};

// 操作方法
const handleAdd = () => {
  dialogTitle.value = "添加文章";
  articleForm.value = {
    id: null,
    title: "",
    category: "tech",
    content: "",
    status: "draft",
  };
  dialogVisible.value = true;
};

const handleEdit = (row) => {
  dialogTitle.value = "编辑文章";
  articleForm.value = { ...row };
  dialogVisible.value = true;
};

const handleToggleStatus = async (row) => {
  try {
    const newStatus = row.status === "published" ? "draft" : "published";
    await axios.put(`http://localhost:3000/article/${row.id}`, {
      ...row,
      status: newStatus,
    });
    await fetchArticles();
    ElMessage.success(`文章已${newStatus === "published" ? "发布" : "下架"}`);
  } catch (error) {
    console.error("更新文章状态失败:", error);
    ElMessage.error("更新文章状态失败");
  }
};

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm("确定要删除该文章吗？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    await axios.delete(`http://localhost:3000/article/${row.id}`);
    await fetchArticles();
    ElMessage.success("删除成功");
  } catch (error) {
    if (error !== "cancel") {
      console.error("删除文章失败:", error);
      ElMessage.error("删除文章失败");
    }
  }
};

const handleSubmit = async () => {
  try {
    if (articleForm.value.id) {
      // 更新文章
      await axios.put(
        `http://localhost:3000/article/${articleForm.value.id}`,
        articleForm.value
      );
      ElMessage.success("更新成功");
    } else {
      // 添加文章
      await axios.post("http://localhost:3000/article", articleForm.value);
      ElMessage.success("添加成功");
    }
    dialogVisible.value = false;
    await fetchArticles();
  } catch (error) {
    console.error("保存文章失败:", error);
    ElMessage.error("保存文章失败");
  }
};

// 初始化
onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
.article-management {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
