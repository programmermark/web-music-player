import { lazyLoad } from "@/util/router";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/",
    name: "Home",
    component: lazyLoad("home/Home"),
    children: [
      {
        path: "/",
        name: "Personal",
        component: lazyLoad(
          "home/components/main-content/views/personal-recommends/index"
        ),
      },
      {
        path: "playlistDetail/:id",
        name: "PlaylistDetail",
        component: lazyLoad(
          "home/components/main-content/views/playlist-detail/index"
        ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
