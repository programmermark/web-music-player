<template>
  <div class="pl-[30px] pr-[30px] w-full box-sizing-border-box">
    <!-- 专辑信息 -->
    <AlbumInfo v-if="albumInfo" :album-info="albumInfo" :songList="songList" />
    <!-- 歌曲列表 -->
    <SongList
      v-if="albumInfo"
      :albumId="albumInfo.id"
      :songList="songList"
      :description="albumInfo.description || ''"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { IAlbumDetail } from "./interface/index";
import AlbumInfo from "./components/album-info/index.vue";
import SongList from "./components/song-list/index.vue";
import type { IAlbum } from "../artist-detail/interface";
import type { ISong } from "@/stores/interface/latest-music";

const route = useRoute();
const albumInfo = ref<IAlbum | undefined>(undefined);
const songList = ref<ISong[]>([]);

/** 获取专辑详情 */
const getPlaylistDetail = async (id: number) => {
  /** 根据id获取专辑详情 */
  const albumDetail = await http<IAlbumDetail>(
    { url: apis.albumDetail + `?id=${id}` },
    ""
  );
  const { album, songs } = albumDetail;
  /** 把歌单详情分为歌单信息哥歌曲列表两部分 */
  const info: IAlbum = {
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
  albumInfo.value = info;
  songList.value = songs.map(
    (song) =>
      ({
        id: song.id,
        name: song.name,
        alias: song.alia,
        duration: song.dt,
        artists: song.ar,
        album: song.al,
      } as ISong)
  );
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
</script>
