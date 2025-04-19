import { createRouter, createWebHistory } from "vue-router";

// 定义路由组件
const Home = () => import("../views/home/Home.vue");
const Login = () => import("../views/login/Login.vue");
const Introduction = () => import("../views/Introduction/Introduction.vue");

// 定义路由规则
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    // meta: { requiresAuth: false },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    // meta: { requiresAuth: true },
  },
  {
    path: "/introduction",
    name: "Introduction",
    component: Introduction,
    // meta: { requiresAuth: true },
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/home",
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // 假设使用localStorage存储token

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 需要认证但未登录，重定向到登录页
    next({ name: "Login" });
  } else if (to.name === "Login" && isAuthenticated) {
    // 已登录用户访问登录页，重定向到首页
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
