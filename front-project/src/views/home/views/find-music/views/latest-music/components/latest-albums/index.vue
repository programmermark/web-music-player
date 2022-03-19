<template>
  <div class="latest-albums pl-[30px] w-full box-sizing-border-box">
    <div class="header pr-[30px]">
      <div class="tab-wrapper">
        <div
          class="tab-item"
          :class="[currentTab === tab.value && 'active']"
          v-for="tab in tabs"
          :key="tab.value"
          @click="toggleTab(tab.value)"
        >
          {{ tab.label }}
        </div>
      </div>
      <div class="flex-wrapper">
        <div class="operate-wrapper">
          <div
            class="operate-item"
            :class="[currentType === type.value && 'active']"
            v-for="type in types"
            :key="type.value"
            @click="toggleType(type.value)"
          >
            <span class="text">{{ type.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="date">
        <span class="month">{{ formatMonth(new Date().getMonth() + 1) }}</span>
        <span class="year">{{ formatMonth(new Date().getFullYear()) }}</span>
      </div>
      <div class="flex-1">
        <div
          v-if="currentAlbums && currentAlbums.pages.length > 0"
          class="flex flex-wrap pr-14 overflow-y-scroll max-h-[calc(100vh-276px)]"
          v-infinite-scroll="onPageChange"
          :infinite-scroll-disabled="disabled"
        >
          <template v-for="(group, index) in currentAlbums.pages" :key="index">
            <album-card v-for="album in group" :key="album.id" :album="album" />
          </template>
        </div>
        <!-- isLoading -->
        <div
          class="flex justify-center items-center pb-6"
          v-show="(isLoading || isFetching) && hasNextPage"
        >
          <el-icon class="text-gray-500">
            <loading />
          </el-icon>
          <div class="ml-2 text-gray-500 text-xs">载入中...</div>
        </div>
        <!-- noMore data -->
        <div
          v-show="(isLoading || isFetching) && !hasNextPage"
          class="flex items-center justify-center text-gray-500 text-xs py-5"
        >
          <span class="w-3 h-[1px] bg-gray-500"></span>
          <span class="px-2">没有更多歌曲</span>
          <span class="w-3 h-[1px] bg-gray-500"></span>
          <span></span>
        </div>
        <!-- no data -->
        <div class="text-center text-[13px] text-gray-600 mt-24" v-show="noData">
          暂无新上架歌曲
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatMonth } from "@/common/js/util";
import AlbumCard from "../album-card/index.vue";
import { useNewAlbum } from "../../hooks/useNewAlbum";

const tabs = [
  { label: "全部", value: "ALL" },
  { label: "华语", value: "ZH" },
  { label: "欧美", value: "EA" },
  { label: "日本", value: "KR" },
  { label: "韩国", value: "JP" },
];
const types = [
  { label: "推荐", value: "hot" },
  { label: "全部", value: "new" },
];
const currentTab = ref("ALL");
const currentType = ref("hot");
const limit = 20;

const {
  isLoading,
  isFetching,
  isFetched,
  data: currentAlbums,
  hasNextPage,
  fetchNextPage,
} = useNewAlbum(currentTab, currentType, limit);

const noData = computed(() => {
  return !currentAlbums.value?.pages[0].length;
});

/** 禁用下拉，防止重复请求 */
const disabled = computed(() => {
  const reuslt = isLoading.value || isFetching.value || !hasNextPage?.value;
  return reuslt;
});

/**
 * 切换tab
 */
const toggleTab = (value: string) => {
  if (value !== currentTab.value) {
    currentTab.value = value;
  }
};

/**
 * 切换type
 */
const toggleType = (value: string) => {
  if (value !== currentType.value) {
    currentType.value = value;
  }
};

/**
 * 向下滚动时加载数据
 */
const onPageChange = () => {
  console.log("onPageChange");
  if (isFetched.value && hasNextPage?.value) {
    fetchNextPage.value();
  }
};
</script>

<style lang="scss" scoped>
.latest-albums {
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tab-wrapper {
      display: inline-flex;
      .tab-item {
        font-size: 14px;
        color: #666;
        margin-right: 28px;
        cursor: pointer;
      }
      .active {
        color: #000;
        font-weight: bold;
      }
    }
    .flex-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      .operate-wrapper {
        display: flex;
        align-items: center;
        .operate-item {
          font-size: 13px;
          padding: 0 10px;
          color: #666;
          border-right: 1px solid #eee;

          &:last-child {
            border-right: none;
          }
          & > .text {
            display: block;
            padding: 5px 12px;
            font-size: 13px;
            border-radius: 12px;
            cursor: pointer;
          }
        }
        .active {
          .text {
            background-color: #fef5f5;
            color: #d33a31;
          }
        }
      }
    }
  }

  .content {
    display: flex;
    .date {
      width: 56px;
      display: flex;
      flex-direction: column;
      font-weight: bold;
      color: #333;
      .month {
        font-size: 20px;
      }
      .year {
        font-size: 12px;
      }
    }
    .albums {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 56px);
    }
  }
}
</style>
