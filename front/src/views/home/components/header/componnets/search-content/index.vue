<template>
  <div>
    <div>
      <span>{{ keywords }}</span
      >找到
    </div>
  </div>
</template>

<script lang="ts" setup>
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import {
  ISearchContentAlbum,
  ISearchContentAlbumResponse,
  ISearchContentAlbumState,
  ISearchContentArtist,
  ISearchContentArtistResponse,
  ISearchContentArtistState,
  ISearchContentMV,
  ISearchContentMVResponse,
  ISearchContentMVState,
  ISearchContentSong,
  ISearchContentSongResponse,
  ISearchContentSongState,
  SearchType,
} from "./interface";

const route = useRoute();

/** 内容类型 */
const contentType = ref<SearchType>(1);

/** 单曲 */
const songState = reactive<ISearchContentSongState>({
  songCount: 0 /** 搜索到的歌曲总数量 */,
  songs: [] /** 歌曲列表 */,
  limit: 100,
  offset: 0,
});

/** 歌手 */
const artistState = reactive<ISearchContentArtistState>({
  artistCount: 0 /** 搜索到的歌手总数量 */,
  artists: [] /** 歌手列表 */,
  limit: 30,
  offset: 0,
});

/** 专辑 */
const albumState = reactive<ISearchContentAlbumState>({
  albumCount: 0 /** 搜索到的专辑总数量 */,
  albums: [] /** 专辑列表 */,
  limit: 20,
  offset: 0,
});

/** 视频 */
const mvState = reactive<ISearchContentMVState>({
  mvCount: 0 /** 搜索到的MV总数量 */,
  mvs: [] /** MV列表 */,
  limit: 20,
  offset: 0,
});

/** 关键词 */
const keywords = computed(() => route.params.keywords as string);

/** 小标题内容 */

/**
 * 获取搜索内容（歌曲）
 */
const fetchSearchContentSong = async (keywords: string, type: SearchType = 1) => {
  const { songCount, songs } = await http<ISearchContentSongResponse>(
    { url: `${apis.searchResult}?keywords=${keywords}&type=${type}` },
    "result"
  );
  songState.songCount = songCount;
  const formatSongs: ISearchContentSong[] = songs.map((song) => ({
    id: song.id,
    name: song.name,
    mvid: song.mvid,
    album: {
      id: song.album.id,
      name: song.album.name,
      alia: song.album.alia,
      artists: song.album.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        img1v1Url: artist.img1v1Url,
      })),
    },
    artists: song.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      img1v1Url: artist.img1v1Url,
    })),
    duration: song.duration,
    transNames: song.transNames,
  }));
  songState.songs = formatSongs;
};

/**
 * 获取搜索内容（歌手）
 */
const fetchSearchContentArtist = async (keywords: string, type: SearchType = 100) => {
  const { artistCount, artists } = await http<ISearchContentArtistResponse>(
    { url: `${apis.searchResult}?keywords=${keywords}&type=${type}` },
    "result"
  );
  artistState.artistCount = artistCount;
  const formatArtists: ISearchContentArtist[] = artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    img1v1Url: artist.img1v1Url,
  }));
  artistState.artists = formatArtists;
};

/**
 * 获取搜索内容（专辑）
 */
const fetchSearchContentAlbum = async (keywords: string, type: SearchType = 100) => {
  const { albumCount, albums } = await http<ISearchContentAlbumResponse>(
    { url: `${apis.searchResult}?keywords=${keywords}&type=${type}` },
    "result"
  );
  albumState.albumCount = albumCount;
  const formatAlbum: ISearchContentAlbum[] = albums.map((album) => ({
    id: album.id,
    name: album.name,
    alia: album.alia,
    artists: album.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      img1v1Url: artist.img1v1Url,
    })),
  }));
  albumState.albums = formatAlbum;
};

/**
 * 获取搜索内容（MV）
 */
const fetchSearchContentMV = async (keywords: string, type: SearchType = 100) => {
  const { mvCount, mvs } = await http<ISearchContentMVResponse>(
    { url: `${apis.searchResult}?keywords=${keywords}&type=${type}` },
    "result"
  );
  mvState.mvCount = mvCount;
  const formatMV: ISearchContentMV[] = mvs.map((mv) => ({
    id: mv.id,
    name: mv.name,
    cover: mv.cover,
    duration: mv.duration,
    playCount: mv.playCount,
    artists: mv.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
  }));
  mvState.mvs = formatMV;
};

/**
 * 获取搜索结果
 */
const fetchSearchResult = async (keywords: string, type: SearchType) => {
  switch (type) {
    case 1:
      fetchSearchContentSong(keywords);
      break;
    case 10:
      fetchSearchContentAlbum(keywords);
      break;
    case 100:
      fetchSearchContentArtist(keywords);
      break;
    case 10:
      fetchSearchContentMV(keywords);
      break;
    default:
      fetchSearchContentSong(keywords);
      break;
  }
};

watch([keywords, contentType], ([newKeywords, newContentType]) => {});
</script>

<style lang="scss" scoped></style>
