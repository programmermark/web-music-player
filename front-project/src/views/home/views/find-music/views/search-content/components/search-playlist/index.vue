<template>
  <div class="h-full">
    <el-scrollbar v-if="!loading">
      <div class="w-full">
        <div
          class="grid grid-cols-12 pl-[30px] pr-9 ml-1 cursor-pointer text-sm hover:bg-gray-100"
          :class="{ 'bg-gray-50': index % 2 !== 0 }"
          v-for="(playlist, index) in playlists"
          :key="playlist.id"
          @click="gotoPlaylistDetail(playlist.id)"
        >
          <div class="col-span-8 flex items-center">
            <img
              class="w-[60px] h-[60px] rounded my-[10px] mr-[10px] cursor-pointer border border-gray-100 box-border"
              :src="`${playlist.coverImgUrl}?param=120y120`"
            />
            <span class="cursor-pointer text-ellipsis" v-html="playlist.name"></span>
          </div>
          <div class="col-span-2 flex items-center text-[13px] text-gray-400">
            {{ playlist.trackCount }}首
          </div>
          <div class="col-span-2 flex items-center text-[13px] text-gray-400">
            by
            <span class="text-ellipsis" v-html="playlist.creator.nickname"></span>
          </div>
        </div>
        <!-- 分页 -->
        <div class="flex justify-center mt-6 pb-8" v-show="total > pageSize">
          <el-pagination
            :current-page="currentPage"
            :total="total"
            :page-size="pageSize"
            :pager-count="9"
            background
            layout="prev, pager, next"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
    </el-scrollbar>

    <!-- loading -->
    <div
      class="card-wrapper-loading"
      v-show="loading"
      v-loading="loading"
      element-loading-text="载入中..."
      element-loading-background="rgba(255, 255, 255)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { gotoPlaylistDetail } from "@/common/js/router";
import type { ISearchContentPlaylist } from "../../interface";

const props = withDefaults(
  defineProps<{
    /** 分页条数偏移量 */
    offset: number;
    /** 分页每页条数 */
    pageSize: number;
    /** 分页总条数 */
    total: number;
    /** 歌单列表 */
    playlists: ISearchContentPlaylist[];
    /** loading状态 */
    loading: boolean;
  }>(),
  {
    loading: false,
  }
);

const emits = defineEmits<{
  (e: "page-change", page: number): void;
}>();

/** 当前页码 */
const currentPage = computed(() => props.offset / props.pageSize + 1);

/** 切换分页 */
const handlePageChange = (page: number) => {
  emits("page-change", (page - 1) * props.pageSize);
};
</script>

<style lang="scss" scoped>
.card-wrapper-loading {
  height: 100%;
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
</style>
