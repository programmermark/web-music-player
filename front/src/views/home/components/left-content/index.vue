<template>
  <div class="left-content">
    <!-- 用户头像和个人信息 -->
    <user-info />
    <el-scrollbar class="scrollbar-reset">
      <!-- 发现音乐、私人FM、视频、朋友 -->
      <!-- 我的音乐 -->
      <!-- 创建的歌单 -->
      <created-playlist :playlists="userCreatedPlaylists" />
      <!-- 收藏的歌单 -->
      <collected-playlist :playlists="userCollectedPlaylists" />
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import UserInfo from "./components/userinfo/index.vue";
import CreatedPlayList from "./components/created-playlist/index.vue";
import CollectedPlayList from "./components/collected-playlist/index.vue";
import { useStore } from "@/store";

/** 左侧主要内容 */
export default defineComponent({
  name: "LeftContent",
  components: {
    "user-info": UserInfo,
    "created-playlist": CreatedPlayList,
    "collected-playlist": CollectedPlayList,
  },
  setup() {
    const store = useStore();

    /** 用户id */
    const userId = computed(() => store.state.login.userInfo?.id);

    /** 用户所有歌单 */
    const userPlaylists = computed(() => store.state.playlist.allPlayList);
    /** 用户创建的歌单 */
    const userCreatedPlaylists = computed(() =>
      userPlaylists.value.filter((playlist) => playlist.isSelfCreated)
    );
    /** 用户收藏的歌单 */
    const userCollectedPlaylists = computed(() =>
      userPlaylists.value.filter((playlist) => !playlist.isSelfCreated)
    );

    /** 获取用户歌单 */
    const fetchUserPlaylist = (userId: number) => {
      store.dispatch("playlist/setAllPlaylist", userId);
    };

    onMounted(() => {
      if (userId.value) {
        fetchUserPlaylist(userId.value);
      }
    });

    return {
      userCreatedPlaylists,
      userCollectedPlaylists,
    };
  },
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

function onMount(arg0: () => void) { throw new Error("Function not
implemented."); }
