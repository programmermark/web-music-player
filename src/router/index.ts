import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

/**
 * 实现路由懒加载的工具函数
 * @param {string} viewPath  view的相对路径，相对于src目录
 */
export function lazyLoad(viewPath: string) {
  const modules = import.meta.glob("../views/**/*.vue");
  return modules[`../views/${viewPath}/index.vue`];
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: lazyLoad("home"),
    children: [
      {
        path: "/",
        name: "Personal",
        component: lazyLoad("home/views/find-music/views/personal-recommends"),
      },
      {
        path: "/daily-recommend-songs",
        name: "DailyRecommendSongs",
        component: lazyLoad(
          "home/views/find-music/views/daily-recommend-songs"
        ),
      },
      {
        path: "/playlist",
        name: "Playlist",
        component: lazyLoad("home/views/find-music/views/playlist"),
      },
      {
        path: "playlistDetail/:id",
        name: "PlaylistDetail",
        component: lazyLoad("home/views/find-music/views/playlist-detail"),
      },
      {
        path: "rankList",
        name: "RankList",
        component: lazyLoad("home/views/find-music/views/rank-list"),
      },
      {
        path: "artistList",
        name: "ArtistList",
        component: lazyLoad("home/views/find-music/views/artist-list"),
      },
      {
        path: "latestMusic",
        name: "LatestMusic",
        component: lazyLoad("home/views/find-music/views/latest-music"),
      },
      {
        path: "system-notify",
        name: "SystemNotify",
        component: lazyLoad("home/views/find-music/views/system-notify"),
      },
      {
        path: "albumDetail/:id",
        name: "AlbumDetail",
        component: lazyLoad("home/views/find-music/views/album-detail"),
      },
      {
        path: "artistRankList",
        name: "ArtistRankList",
        component: lazyLoad("home/views/find-music/views/artist-rank-list"),
      },
      {
        path: "artist/:id",
        name: "Artist",
        component: lazyLoad("home/views/find-music/views/artist-detail"),
      },
      {
        path: "exclusive-broadcast",
        name: "ExclusiveBroadcast",
        component: lazyLoad("home/views/find-music/views/exclusive-broadcast"),
      },
      {
        path: "search-content/:keywords",
        name: "SearchContent",
        component: lazyLoad("home/views/find-music/views/search-content"),
      },
      // 视频列表
      {
        path: "videolist",
        name: "VideoList",
        component: lazyLoad("home/views/find-music/views/video-list"),
      },
    ],
  },
  {
    path: "/mv/:id",
    name: "MVDetail",
    component: lazyLoad("mv-detail"),
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
