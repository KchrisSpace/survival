<!-- 用户管理 -->
<template>
  <div class="user-management">
    <div class="header">
      <h2>用户管理</h2>
      <el-button type="primary" @click="handleAdd">添加用户</el-button>
    </div>

    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索用户名或邮箱"
        class="search-input"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-select v-model="filterRole" placeholder="角色筛选" clearable>
        <el-option label="管理员" value="admin" />
        <el-option label="普通用户" value="user" />
      </el-select>
    </div>

    <el-table :data="filteredUsers" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-tag :type="row.role === 'admin' ? 'danger' : 'success'">
            {{ row.role === "admin" ? "管理员" : "普通用户" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="注册时间" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑
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

    <!-- 添加/编辑用户对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="500px">
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!userForm.id">
          <el-input v-model="userForm.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
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
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

// 模拟数据
const users = ref([
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    username: "user1",
    email: "user1@example.com",
    role: "user",
    createdAt: "2023-01-02",
  },
]);

// 搜索和筛选
const searchQuery = ref("");
const filterRole = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchSearch =
      !searchQuery.value ||
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchRole = !filterRole.value || user.role === filterRole.value;
    return matchSearch && matchRole;
  });
});

// 表单相关
const dialogVisible = ref(false);
const dialogTitle = ref("添加用户");
const userForm = ref({
  id: null,
  username: "",
  email: "",
  password: "",
  role: "user",
});

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能小于6位", trigger: "blur" },
  ],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
};

// 操作方法
const handleAdd = () => {
  dialogTitle.value = "添加用户";
  userForm.value = {
    id: null,
    username: "",
    email: "",
    password: "",
    role: "user",
  };
  dialogVisible.value = true;
};

const handleEdit = (row) => {
  dialogTitle.value = "编辑用户";
  userForm.value = { ...row };
  dialogVisible.value = true;
};

const handleDelete = (row) => {
  ElMessageBox.confirm("确定要删除该用户吗？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    users.value = users.value.filter((user) => user.id !== row.id);
    ElMessage.success("删除成功");
  });
};

const handleSubmit = () => {
  // 这里应该调用API进行保存
  if (userForm.value.id) {
    // 更新用户
    const index = users.value.findIndex(
      (user) => user.id === userForm.value.id
    );
    if (index !== -1) {
      users.value[index] = { ...userForm.value };
    }
    ElMessage.success("更新成功");
  } else {
    // 添加用户
    const newUser = {
      ...userForm.value,
      id: users.value.length + 1,
      createdAt: new Date().toISOString().split("T")[0],
    };
    users.value.push(newUser);
    ElMessage.success("添加成功");
  }
  dialogVisible.value = false;
};
</script>

<style scoped>
.user-management {
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
