<template>
  <div class="h-full">
    <el-scrollbar v-if="!loading">
      <div class="w-full">
        <div
          class="grid grid-cols-12 pl-[30px] pr-9 ml-1 cursor-pointer text-sm hover:bg-gray-100"
          :class="{ 'bg-gray-50': index % 2 !== 0 }"
          v-for="(album, index) in albums"
          :key="album.id"
          @click="gotoAlbumDetail(album.id)"
        >
          <div class="col-span-7 flex items-center">
            <img
              class="w-[60px] h-[60px] rounded my-[10px] mr-[10px] cursor-pointer border border-gray-100 box-border"
              :src="`${album.picUrl}?param=120y120`"
            />
            <span class="cursor-pointer text-ellipsis" v-html="album.name"></span>
            <span
              class="text-gray-500 text-ellipsis pr-4"
              v-if="album.alias && album.alias.length > 0"
              >（{{ album.alias[0] }}）</span
            >
          </div>
          <div
            class="col-span-5 flex items-center text-[13px]"
            @click="
              (e) => {
                e.stopPropagation();
                gotoArtistDetail(album.artist.id);
              }
            "
          >
            <span v-html="album.artist.name"></span>
            <span
              v-if="album.artist.alias && album.artist.alias.length > 0"
              class="text-gray-400"
              >（{{ album.artist.alias[0] }}）</span
            >
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
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ISearchContentAlbum } from "../../interface";

const props = withDefaults(
  defineProps<{
    /** 分页条数偏移量 */
    offset: number;
    /** 分页每页条数 */
    pageSize: number;
    /** 分页总条数 */
    total: number;
    /** 专辑列表 */
    albums: ISearchContentAlbum[];
    /** loading状态 */
    loading: boolean;
  }>(),
  {
    loading: false,
  }
);

import { gotoAlbumDetail, gotoArtistDetail } from "@/common/js/router";

const emits = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const router = useRouter();

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
