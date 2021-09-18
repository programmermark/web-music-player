<template>
  <div class="playlist-detail pdl-30 pdr-30 width-100 box-sizing-border-box">
    <!-- 歌单信息 -->
    <playlist-info v-if="playlistInfo" :playlist-info="playlistInfo" />
    <!-- 歌单列表 -->
    <song-list
      v-if="playlistInfo"
      :playlistId="playlistInfo.id"
      :songList="songList"
      :subscribers="subscribers"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { IPlaylistDetail, ISongDetail } from "@/store/modules/interface/player";
import { IPlaylistDetailState } from "./interface/index";
import PlaylistInfo from "./components/playlist-info/index.vue";
import SongList from "./components/song-list/index.vue";

export default defineComponent({
  name: "PlaylistDetail",
  components: {
    "playlist-info": PlaylistInfo,
    "song-list": SongList,
  },
  setup() {
    const route = useRoute();

    const state = reactive<IPlaylistDetailState>({
      /** 歌单信息 */
      playlistInfo: undefined,
      /** 歌单歌曲列表 */
      songList: [],
      /** 歌曲订阅用户列表 */
      subscribers: [],
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
        creator: {
          userId: playlist.creator.userId,
          nickname: playlist.creator.nickname,
          avatarUrl: playlist.creator.avatarUrl,
        },
      };
      if (playlist.trackIds && playlist.trackIds.length > 0) {
        const songIdStr = playlist.trackIds
          .map((item) => String(item.id))
          .reduce((initValue, currentValue) => initValue + "," + currentValue);
        const songDetailUrl = `${apis.songDetail}?ids=${songIdStr}`;
        /** 根据id数组获取歌曲详情 */
        const songs = await http<ISongDetail[]>(
          { url: songDetailUrl },
          "songs"
        );
        state.songList = songs.map((song) => ({
          id: song.id,
          name: song.name,
          al: {
            id: song.al.id,
            name: song.al.name,
            picUrl: song.al.picUrl,
          },
          alia: song.alia,
          ar: song.ar.map((ar) => ({
            id: ar.id,
            name: ar.name,
          })),
          dt: song.dt,
        }));
      } else {
        /** 歌单一首歌曲都没有 */
        state.songList = [];
      }
      if (playlist.subscribers && playlist.subscribers.length > 0) {
        state.subscribers = playlist.subscribers.map((subscriber) => ({
          id: subscriber.id,
          nickname: subscriber.nickname,
          avatarUrl: subscriber.avatarUrl,
          gender: subscriber.gender,
        }));
      } else {
        /** 歌单没有任何收藏者 */
        state.subscribers = [];
      }
    };

    watch(
      () => route.params.id,
      (id) => {
        if (id && route.name === "PlaylistDetail") {
          getPlaylistDetail(Number(id));
        }
      }
    );

    onMounted(() => {
      if (route.params) {
        getPlaylistDetail(Number(route.params.id));
      }
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped></style>
