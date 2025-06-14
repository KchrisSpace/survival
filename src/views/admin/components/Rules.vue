<!-- 规则管理 -->
<template>
  <div class="rules-container">
    <div class="rules-header">
      <h2>规则管理</h2>
      <el-button type="primary" @click="handleAddRule">添加规则</el-button>
    </div>

    <el-table :data="rules" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="规则名称" />
      <el-table-column prop="description" label="规则描述" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
            {{ row.status === "active" ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑规则对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加规则' : '编辑规则'"
      width="500px"
    >
      <el-form :model="ruleForm" label-width="100px">
        <el-form-item label="规则名称">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="规则描述">
          <el-input v-model="ruleForm.description" type="textarea" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="ruleForm.status"
            active-value="active"
            inactive-value="inactive"
          />
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
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

// 模拟数据
const rules = ref([
  {
    id: 1,
    name: "内容审核规则",
    description: "自动审核用户发布的内容",
    status: "active",
  },
  {
    id: 2,
    name: "用户行为规则",
    description: "监控和管理用户行为",
    status: "inactive",
  },
]);

const dialogVisible = ref(false);
const dialogType = ref("add");
const ruleForm = reactive({
  name: "",
  description: "",
  status: "active",
});

const handleAddRule = () => {
  dialogType.value = "add";
  ruleForm.name = "";
  ruleForm.description = "";
  ruleForm.status = "active";
  dialogVisible.value = true;
};

const handleEdit = (row) => {
  dialogType.value = "edit";
  Object.assign(ruleForm, row);
  dialogVisible.value = true;
};

const handleDelete = (row) => {
  ElMessageBox.confirm("确定要删除这条规则吗？", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    const index = rules.value.findIndex((item) => item.id === row.id);
    if (index !== -1) {
      rules.value.splice(index, 1);
      ElMessage.success("删除成功");
    }
  });
};

const handleSubmit = () => {
  if (dialogType.value === "add") {
    // 添加新规则
    const newRule = {
      id: rules.value.length + 1,
      ...ruleForm,
    };
    rules.value.push(newRule);
    ElMessage.success("添加成功");
  } else {
    // 更新规则
    const index = rules.value.findIndex((item) => item.id === ruleForm.id);
    if (index !== -1) {
      rules.value[index] = { ...ruleForm };
      ElMessage.success("更新成功");
    }
  }
  dialogVisible.value = false;
};
</script>

<style scoped>
.rules-container {
  padding: 20px;
}

.rules-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.rules-header h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
