<template>
  <div class="h-full">
    <el-scrollbar v-if="!loading">
      <div>
        <!-- 表格内容 -->
        <div class="mb-6">
          <!-- 标题 -->
          <div class="grid grid-cols-24 h-9 text-[13px] text-gray-400">
            <div class="col-span-4"></div>
            <div class="col-span-8">音乐标题</div>
            <div class="col-span-4">歌手</div>
            <div class="col-span-5">专辑</div>
            <div class="col-span-3">时长</div>
          </div>
          <!-- 内容 -->
          <div
            class="grid grid-cols-24 text-[13px] py-2 hover:bg-gray-100"
            :class="{ 'bg-gray-50': index % 2 === 0 }"
            v-for="(song, index) in songs"
            :key="song.id"
          >
            <!-- 序号 -->
            <div class="col-span-4 text-gray-400 pl-7">
              {{ formatNo(index + 1) }}
            </div>
            <!-- 音乐标题 -->
            <div class="col-span-8 pr-6 box-border text-ellipsis text-gray-800">
              <div class="flex items-center">
                <span
                  class="cursor-pointer mr-2 text-ellipsis"
                  v-html="song.name"
                  @click="playSong(song.id)"
                ></span>
                <div
                  class="mv-wrapper"
                  v-show="song.mvid > 0"
                  title="跳转到MV详情"
                >
                  <MPIcon
                    icon="mv"
                    :size="16"
                    :scale="1"
                    color="#d33333"
                    bgColor="none"
                    @click="gotoMVDetail(song.mvid)"
                  />
                </div>
              </div>
            </div>
            <!-- 歌手 -->
            <div class="col-span-4 pr-4 box-border text-ellipsis">
              <span
                v-for="(artist, index) in song.artists"
                :key="artist.id"
                class="max-w-[150px] text-ellipsis"
              >
                <span
                  class="cursor-pointer"
                  title="跳转到歌手详情"
                  v-html="artist.name"
                  @click="gotoArtistDetail(artist.id)"
                ></span>
                <span v-if="index + 1 < song.artists.length" class="px-1"
                  >/</span
                >
              </span>
            </div>
            <!-- 专辑 -->
            <div class="col-span-5 cursor-pointer text-gray-600">
              <div
                class="cursor-pointer pr-2 box-border text-ellipsis"
                title="跳转到专辑详情"
                v-html="song.album.name"
                @click="gotoAlbumDetail(song.album.id)"
              ></div>
            </div>
            <!-- 时长 -->
            <div class="col-span-3 text-gray-400">
              {{ transformSecondToMinute(song.duration / 1000) }}
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="flex justify-center pb-8">
          <el-pagination
            :current-page="currentPage"
            :total="total"
            :page-size="pageSize"
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

<!-- 搜索内容（单曲） -->
<script lang="ts" setup>
import { formatNo, transformSecondToMinute } from "@/common/js/util";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { ISearchContentSong } from "../../interface";
import MPIcon from "@/components/MPIcon.vue";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    /** 分页每页条数 */
    pageSize: number;
    /** 分页总条数 */
    total: number;
    /** 歌曲列表 */
    songs: ISearchContentSong[];
    /** loading状态 */
    loading: boolean;
  }>(),
  {
    total: 0,
    pageSize: 100,
  }
);

const emits = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const store = useStore();
const router = useRouter();

const currentPage = ref(1);

/**
 * 播放歌曲
 */
const playSong = (id: number) => {
  store.dispatch("player/setCurrentSong", id);
};

/** 跳转到歌手详情 */
const gotoArtistDetail = (id: number) => {
  if (id) {
    router.push(`/artist/${id}`);
  }
};

/** 跳转到专辑详情 */
const gotoAlbumDetail = (id: number) => {
  if (id) {
    router.push(`/albumDetail/${id}`);
  }
};

/** 跳转到MV详情 */
const gotoMVDetail = (id: number) => {
  router.push(`/mv/${id}`);
};

/** 切换分页 */
const handlePageChange = (page: number) => {
  currentPage.value = page;
  emits("page-change", page * props.pageSize);
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
