<template>
  <div class="playlist-wrapper max-w-[1100px] w-full pl-[30px] pr-[30px] box-border">
    <!-- 精品歌单 -->
    <!-- 歌单分类 -->
    <div class="cat-wrapper">
      <cat-list class="flex-1" />
      <hot-cat-list />
    </div>
    <!-- 歌单列表（10 * 10） -->
    <div
      class="card-wrapper-loading"
      v-show="state.loading"
      v-loading="state.loading"
      element-loading-text="载入中..."
      element-loading-background="rgba(255, 255, 255)"
    ></div>
    <div class="card-wrapper" v-show="!state.loading">
      <PlaylistCard
        v-for="(listItem, index) in state.playlists"
        :key="`${listItem.id}-${index}`"
        :playlist="listItem"
      />
    </div>
    <!-- 分页 -->
    <el-pagination
      class="page-wrapper"
      background
      layout="prev, pager, next"
      :page-size="state.limit"
      :total="state.total"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { computed, onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import CatList from "./components/cat-list/index.vue";
import PlaylistCard from "./components/playlist-card/index.vue";
import HotCatList from "./components/hot-cat-list/index.vue";
import type { IPlaylistState, IPlaylistResponse } from "./interface/index";
import { useCatlistStore } from "@/stores/catlist";

const route = useRoute();
const catListStore = useCatlistStore();

const state = reactive<IPlaylistState>({
  loading: false,
  limit: 100,
  page: 1,
  total: 0,
  playlists: [],
});

const currentCat = computed(() => catListStore.currentCat);
const currentPage = computed(() => state.page);
const currentLimit = computed(() => state.limit);

const fetchPlayList = async (tag: string, page = 1, limit = 100) => {
  state.loading = true;
  const url = `${apis.playlistTop}?offset=${
    (page - 1) * limit
  }&limit=${limit}&cat=${tag}`;
  const { playlists, total } = await http<IPlaylistResponse>({ url });
  state.playlists = playlists.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    coverImgUrl: playlist.coverImgUrl,
    playCount: playlist.playCount,
    creator: {
      id: playlist.creator.id,
      nickname: playlist.creator.nickname,
    },
  }));
  state.total = total;
  state.loading = false;
};

/**
 * 切换分页
 */
const handlePageChange = (page: number) => {
  state.page = page;
};

/** 切换当前选中的歌单分类 */
const handleCatChange = (name = "全部歌单") => {
  catListStore.currentCat = name;
};

watch(
  [currentCat, currentPage, currentLimit],
  ([currentCat, currentPage, currentLimit]) => {
    fetchPlayList(currentCat, currentPage, currentLimit);
  }
);

onMounted(() => {
  const queryCat = route.query.cat;
  if (queryCat) {
    handleCatChange(queryCat as string);
    fetchPlayList(queryCat as string);
  } else {
    handleCatChange();
    fetchPlayList(catListStore.currentCat);
  }
});
</script>

<style lang="scss" scoped>
.playlist-wrapper {
  height: 100%;
  .cat-wrapper {
    display: flex;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 16px;
    .flex-1 {
      flex: 1;
    }
  }
  .card-wrapper-loading {
    height: calc(100% - 70px);
    :deep(.el-loading-spinner) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.el-icon-loading) {
      color: #666;
    }

    :deep(.el-loading-text) {
      margin-left: 2px;
      color: #666;
    }
  }
  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .page-wrapper {
    padding: 40px 0 100px;
    text-align: center;
  }
  :deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
    background-color: #d13b31;
  }
  :deep(.el-pagination.is-background .el-pager li:not(.disabled):hover) {
    color: #d13b31;
  }
}
</style>
