<template>
  <div class="playlist-detail">
    <!-- 歌单信息 -->
    <playlist-info v-if="playlistInfo" :playlist-info="playlistInfo" />
    <!-- 歌单列表 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { IPlaylistDetail } from "@/store/modules/interface/player";
import { IPlaylistDetailState } from "./interface/index";
import PlaylistInfo from "./components/playlist-info/index.vue";

export default defineComponent({
  name: "PlaylistDetail",
  components: {
    "playlist-info": PlaylistInfo,
  },
  setup() {
    const router = useRouter();

    const state = reactive<IPlaylistDetailState>({
      /** 歌单信息 */
      playlistInfo: undefined,
      /** 歌单歌曲列表 */
      songList: [],
    });

    /** 获取歌单详情 */
    const getPlaylistDetail = async (id: number) => {
      /** 根据id获取歌单详情 */
      const playlist = await http<IPlaylistDetail>(
        { url: apis.playlistDetail + `?id=${id}` },
        "playlist"
      );
      /** 把歌单详情分为歌单信息哥歌曲列表两部分 */
      state.playlistInfo = {
        id: playlist.id,
        name: playlist.name,
        coverImgUrl: playlist.coverImgUrl,
        description: playlist.description,
        tags: playlist.tags,
        trackCount: playlist.trackCount,
        playCount: playlist.playCount,
        subscribedCount: playlist.subscribedCount,
        createTime: playlist.createTime,
        creator: playlist.creator,
      };
      state.songList = playlist.tracks;
    };

    onMounted(() => {
      const { params } = router.currentRoute.value;
      if (typeof params.id === "string") {
        getPlaylistDetail(Number(params.id));
      }
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped></style>
