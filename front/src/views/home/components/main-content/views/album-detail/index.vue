<template>
  <div class="pdl-30 pdr-30 width-100 box-sizing-border-box">
    <!-- 专辑信息 -->
    <album-info v-if="albumInfo" :album-info="albumInfo" :songList="songList" />
    <!-- 歌曲列表 -->
    <song-list
      v-if="albumInfo"
      :albumId="albumInfo.id"
      :songList="songList"
      :description="albumInfo.description || ''"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { IAlbumDetail, IAlbumDetailState } from "./interface/index";
import AlbumInfo from "./components/album-info/index.vue";
import SongList from "./components/song-list/index.vue";
import { IAlbum } from "../artist-detail/interface";

export default defineComponent({
  name: "AlbumDetail",
  components: {
    "album-info": AlbumInfo,
    "song-list": SongList,
  },
  setup() {
    const route = useRoute();

    const state = reactive<IAlbumDetailState>({
      /** 专辑信息 */
      albumInfo: undefined,
      /** 专辑歌曲列表 */
      songList: [],
    });

    /** 获取专辑详情 */
    const getPlaylistDetail = async (id: number) => {
      /** 根据id获取专辑详情 */
      const albumDetail = await http<IAlbumDetail>(
        { url: apis.albumDetail + `?id=${id}` },
        ""
      );
      const { album, songs } = albumDetail;
      /** 把歌单详情分为歌单信息哥歌曲列表两部分 */
      const albumInfo: IAlbum = {
        id: album.id,
        name: album.name,
        picUrl: album.picUrl,
        description: album.description,
        publishTime: album.publishTime,
        alias: album.alias,
        artists: (album.artists || []).map((artist) => ({
          id: artist.id,
          cover: artist.cover,
          name: artist.name,
          musicSize: artist.musicSize,
          mvSize: artist.mvSize,
          videoCount: artist.videoCount,
          alias: artist.alias,
        })),
      };
      state.albumInfo = albumInfo;

      state.songList = songs.map((song) => ({
        id: song.id,
        name: song.name,
        album: {
          id: song.al.id,
          name: song.al.name,
          picUrl: song.al.picUrl,
        },
        alias: song.alia,
        artists: song.ar.map((ar) => ({
          id: ar.id,
          name: ar.name,
        })),
        duration: song.dt,
      }));
    };

    watch(
      () => route.params.id,
      (id) => {
        if (id && route.name === "AlbumDetail") {
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
