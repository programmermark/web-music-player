<template>
  <div class="w-full pt-5 box-border">
    <div class="h-10 leading-10 pl-[30px] pr-9">
      <span class="text-[23px] text-gray-800 font-semibold">{{ keywords }}</span>
      <span class="text-sm text-gray-500 ml-2">{{ titleContent }}</span>
    </div>
    <el-tabs
      class="h-[calc(100%-40px)]"
      v-model="contentTypeState.contentType"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        class="tabs-reset"
        v-for="type in contentTypeState.types"
        :key="type.value"
        :label="type.label"
        :name="type.value"
      >
        <SearchSong
          v-if="type.value === '1'"
          :offset="songState.offset"
          :page-size="songState.limit"
          :total="songState.songCount"
          :songs="songState.songs"
          :loading="songState.loading"
          @page-change="handlePageChange"
        />

        <SearchAlbum
          v-if="type.value === '10'"
          :offset="albumState.offset"
          :page-size="albumState.limit"
          :total="albumState.albumCount"
          :albums="albumState.albums"
          :loading="albumState.loading"
          @page-change="handlePageChange"
        />
        <SearchArtist
          v-if="type.value === '100'"
          :offset="artistState.offset"
          :page-size="artistState.limit"
          :total="artistState.artistCount"
          :artists="artistState.artists"
          :loading="artistState.loading"
          @page-change="handlePageChange"
        />
        <SearchPlaylist
          v-if="type.value === '1000'"
          :offset="playlistState.offset"
          :page-size="playlistState.limit"
          :total="playlistState.playlistCount"
          :playlists="playlistState.playlists"
          :loading="playlistState.loading"
          @page-change="handlePageChange"
        />
        <SearchMv
          v-if="type.value === '1014'"
          :offset="mvState.offset"
          :page-size="mvState.limit"
          :total="mvState.videoCount"
          :mvs="mvState.videos"
          :loading="mvState.loading"
          @page-change="handlePageChange"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { IContentTypeState } from "./interface";
import { useContentResult } from "./hooks/useContentResult";
import SearchSong from "./components/search-song/index.vue";
import SearchMv from "./components/search-mv/index.vue";
import SearchArtist from "./components/search-artist/index.vue";
import SearchAlbum from "./components/search-album/index.vue";
import SearchPlaylist from "./components/search-playlist/index.vue";

const route = useRoute();

/** 内容类型 */
const contentTypeState = reactive<IContentTypeState>({
  contentType: "1",
  types: [
    { label: "单曲", value: "1" },
    { label: "歌手", value: "100" },
    { label: "专辑", value: "10" },
    { label: "视频", value: "1014" },
    { label: "歌单", value: "1000" },
  ],
  limit: 100,
  offset: 0,
});

/** 关键词 */
const keywords = computed(() => route.params.keywords as string);
/** 内容类型 */
const contentType = computed(() => contentTypeState.contentType);
/** 每页条数（分页） */
const limit = computed(() => contentTypeState.limit);
/** 偏移量（分页） */
const offset = computed(() => contentTypeState.offset);

const { songState, artistState, albumState, mvState, playlistState } = useContentResult(
  keywords,
  contentType,
  limit,
  offset
);

/** 小标题内容 */
const titleContent = computed(() => {
  let content = "";
  switch (contentType.value) {
    case "1":
      content = `找到 ${songState.songCount} 首单曲`;
      break;
    case "100":
      content = `找到 ${artistState.artistCount} 位歌手`;
      break;
    case "10":
      content = `找到 ${albumState.albumCount} 张专辑`;
      break;
    case "1014":
      content = `找到 ${mvState.videoCount} 个视频`;
      break;
    case "1000":
      content = `找到 ${playlistState.playlistCount} 个歌单`;
      break;
  }
  return content;
});

const handleTabClick = () => {
  switch (contentTypeState.contentType) {
    case "1":
      contentTypeState.limit = 100;
      contentTypeState.offset = 0;
      break;
    case "10":
      contentTypeState.limit = 20;
      contentTypeState.offset = 0;
      break;
    case "100":
      contentTypeState.limit = 30;
      contentTypeState.offset = 0;
      break;
    case "1000":
      contentTypeState.limit = 20;
      contentTypeState.offset = 0;
    case "1014":
      contentTypeState.limit = 21;
      contentTypeState.offset = 0;
      break;
  }
};

/**
 * 分页变化
 */
const handlePageChange = (offset: number) => {
  contentTypeState.offset = offset;
};
</script>

<style lang="scss" scoped>
.tabs-reset {
  height: 100%;
  :deep(.el-tab-pane) {
    height: 100%;
  }
}

:deep(.el-tabs__content) {
  height: calc(100% - 55px);
}
:deep(.el-tabs__header) {
  padding-left: 30px;
  padding-right: 36px;
}
</style>
