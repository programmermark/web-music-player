<template>
  <div class="playlist-wrapper pdl-30 pdr-30">
    <!-- 精品歌单 -->
    <!-- 歌单分类 -->
    <div class="cat-wrapper">
      <cat-list class="flex-1" />
      <hot-cat-list />
    </div>
    <!-- 歌单列表（10 * 10） -->
    <div
      class="card-wrapper-loading"
      v-show="loading"
      v-loading="loading"
      element-loading-text="载入中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255)"
    ></div>
    <div class="card-wrapper" v-show="!loading">
      <playlist-card
        v-for="listItem in playlists"
        :key="listItem.id"
        :playlist="listItem"
      />
    </div>
    <!-- 分页 -->
    <el-pagination
      class="page-wrapper"
      background
      layout="prev, pager, next"
      :page-size="limit"
      :total="total"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useStore } from "@/store";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import CatList from "./components/cat-list/index.vue";
import PlaylistCard from "./components/playlist-card/index.vue";
import HotCatList from "./components/hot-cat-list/index.vue";
import { IPlaylistState, IPlaylistResponse } from "./interface/index";

export default defineComponent({
  name: "PlayList",
  components: {
    "cat-list": CatList,
    "hot-cat-list": HotCatList,
    "playlist-card": PlaylistCard,
  },
  setup() {
    const store = useStore();

    const state = reactive<IPlaylistState>({
      loading: false,
      limit: 100,
      page: 1,
      total: 0,
      playlists: [],
    });

    const currentCat = computed(() => store.state.catList.currentCat);
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

    watch(
      [currentCat, currentPage, currentLimit],
      ([currentCat, currentPage, currentLimit]) => {
        fetchPlayList(currentCat, currentPage, currentLimit);
      }
    );

    onMounted(() => {
      fetchPlayList(store.state.catList.currentCat);
    });

    return {
      ...toRefs(state),
      handlePageChange,
    };
  },
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
