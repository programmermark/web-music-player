<template>
  <div class="left-content">
    <!-- 用户头像和个人信息 -->
    <UserInfo />
    <el-scrollbar class="scrollbar-reset">
      <!-- 发现音乐、私人FM、视频、朋友 -->

      <!-- 我的音乐 -->
      <NavList />
      <!-- 创建的歌单 -->
      <CreatedPlayList :playlists="userCreatedPlaylists" />
      <!-- 收藏的歌单 -->
      <CollectedPlayList :playlists="userCollectedPlaylists" />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import UserInfo from "./components/userinfo/index.vue";
import CreatedPlayList from "./components/created-playlist/index.vue";
import CollectedPlayList from "./components/collected-playlist/index.vue";
import NavList from "./components/nav-list/index.vue";
import { useLoginStore } from "@/stores/login";
import { usePlaylistStore } from "@/stores/playlist";
import { useRecommendStore } from "@/stores/recommend";

const loginStore = useLoginStore();
const playlistStore = usePlaylistStore();
const recommendStore = useRecommendStore();
const router = useRouter();

/** 用户id */
const userId = computed(() => loginStore.userInfo?.id);
/** 用户所有歌单 */
const userPlaylists = computed(() => playlistStore.allPlayList);
/** 用户创建的歌单 */
const userCreatedPlaylists = computed(() =>
  userPlaylists.value.filter((playlist) => playlist.isSelfCreated)
);
/** 用户收藏的歌单 */
const userCollectedPlaylists = computed(() =>
  userPlaylists.value.filter((playlist) => !playlist.isSelfCreated)
);

/**
 * 登陆后刷新用户歌单，跳转到个性推荐并刷新页面接口
 */
const refreshPage = (userId: number) => {
  /** 更新用户歌单 */
  playlistStore.setAllPlaylist(userId);
  /** 跳转到首页（当前在首页则不跳转） */
  if (router.currentRoute.value.path !== "/") {
    router.push("/");
  } else {
    /** 刷新首页的数据 */
    recommendStore.fetchBanner();
    recommendStore.fetchRecommendSongList();
    recommendStore.fetchBroadcastList();
    recommendStore.fetchLatestSongList();
    recommendStore.fetchRecommendMv();
    recommendStore.fetchRecommendDj();
  }
};

/** 获取用户歌单 */
const fetchUserPlaylist = (userId: number) => {
  playlistStore.setAllPlaylist(userId);
};

watch(userId, (userId) => {
  if (userId) {
    refreshPage(userId);
  }
});

onMounted(() => {
  if (userId.value) {
    fetchUserPlaylist(userId.value);
  }
});
</script>

<style lang="scss" scoped>
.left-content {
  width: 100%;
  height: calc(100% - 70px);

  .scrollbar-reset {
    height: calc(100% - 50px);
  }
}
</style>
