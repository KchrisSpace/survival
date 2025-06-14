<!-- 管理员页面 -->
<template>
  <div class="admin-container">
    <!-- 侧边栏导航 -->
    <div class="admin-sidebar">
      <div class="sidebar-header">
        <h2>管理后台</h2>
      </div>
      <ul class="sidebar-menu">
        <li
          v-for="item in menuItems"
          :key="item.path"
          :class="{ active: currentPath === item.path }"
          @click="handleMenuClick(item)"
        >
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>

    <!-- 主要内容区 -->
    <div class="admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const currentPath = computed(() => route.path);

const menuItems = [
  { title: "仪表盘", path: "/admin/dashboard", icon: "el-icon-s-home" },
  { title: "用户管理", path: "/admin/users", icon: "el-icon-user" },
  { title: "文章管理", path: "/admin/articles", icon: "el-icon-document" },
  {
    title: "评论管理",
    path: "/admin/comments",
    icon: "el-icon-chat-dot-round",
  },
  { title: "规则管理", path: "/admin/rules", icon: "el-icon-setting" },
  { title: "系统设置", path: "/admin/settings", icon: "el-icon-setting" },
];

const handleMenuClick = (item) => {
  router.push(item.path);
};
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.admin-sidebar {
  width: 240px;
  background: #304156;
  color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.sidebar-menu li:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-menu li.active {
  background: #1890ff;
}

.sidebar-menu li i {
  margin-right: 10px;
  font-size: 16px;
}

.admin-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
