import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

/**
 * 实现路由懒加载的工具函数
 * @param {string} viewPath  view的相对路径，相对于src目录
 */
export function lazyLoad(viewPath: string) {
  const modules = import.meta.glob("../views/**/*.vue");
  return modules[`../views/${viewPath}.vue`];
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  // 本地使用hash模式，使用history模式刷新会404
  history:
    import.meta.env.MODE === "production"
      ? createWebHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
