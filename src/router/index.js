import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";
import Artical from "../views/artical/artical.vue";
import Introduction from "../views/Introduction/Introduction.vue";
import Dashboard from "../views/admin/components/Dashboard.vue";
import UserManagement from "../views/admin/components/UserManagement.vue";
import ArticleManagement from "../views/admin/components/ArticleManagement.vue";
import CommentManagement from "../views/admin/components/CommentManagement.vue";
import Settings from "../views/admin/components/Settings.vue";
import RulesManagement from "../views/admin/components/Rules.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/introduction",
    name: "Introduction",
    component: Introduction,
    meta: { requiresAuth: false },
  },
  {
    path: "/artical",
    name: "Artical",
    component: Artical,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/admin/admin.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "仪表盘" },
      },
      {
        path: "users",
        name: "UserManagement",
        component: UserManagement,
        meta: { title: "用户管理" },
      },
      {
        path: "articles",
        name: "ArticleManagement",
        component: ArticleManagement,
        meta: { title: "文章管理" },
      },
      {
        path: "comments",
        name: "CommentManagement",
        component: CommentManagement,
        meta: { title: "评论管理" },
      },
      {
        path: "rules",
        name: "RulesManagement",
        component: RulesManagement,
        meta: { title: "规则管理" },
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        meta: { title: "系统设置" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    // 如果需要认证但没有token，重定向到登录页
    next({ name: "Login" });
  } else if (to.path === "/login" && token) {
    // 如果已登录但访问登录页，重定向到首页
    next({ name: "Home" });
  } else {
    // 其他情况正常放行
    next();
  }
});

export default router;
