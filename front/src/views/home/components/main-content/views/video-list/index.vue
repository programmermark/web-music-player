<template>
  <div class="w-full pt-5 box-border">
    <!-- filters: 筛选器 -->
    <div class="flex mx-[30px]">
      <div class="flex-1">
        <GroupFilter
          :category="currentCategory"
          @category-change="handleCategoryChange"
        />
      </div>
      <CategoryFilter
        :category="currentCategory"
        @category-change="handleCategoryChange"
      />
    </div>
    <!-- content：MV -->
    <div v-if="data?.pages">
      <div v-for="(group, index) in data?.pages" :key="index">
        <MPVideoCard
          v-for="video in group.datas"
          class="lg:w-1/3 xl:w-1/4"
          :key="video.data.vid"
          :video-id="video.data.vid"
          :image="video.data.coverUrl"
          :title="video.data.title"
          :playCount="video.data.playTime"
          :duration="Math.round(video.data.durationms / 1000)"
          :artists="[
            {
              id: video.data.creator.userId,
              name: video.data.creator.nickname,
            },
          ]"
        />
      </div>
    </div>

    <!-- page footer：分页 -->
  </div>
</template>

<script lang="ts" setup>
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ref } from "vue";
import { useInfiniteQuery } from "vue-query";
import CategoryFilter from "./components/category-filter/index.vue";
import GroupFilter from "./components/group-filter/index.vue";
import { IVideoCategory, IVideoListResponse } from "./interface";
import MPVideoCard from "@/components/MPVideoCard.vue";

/** 当前视频类别 */
const currentCategory = ref<IVideoCategory | null>(null);

/** 切换视频类别 */
const handleCategoryChange = (category?: IVideoCategory) => {
  console.log({ category });
  if (category) {
    currentCategory.value = category;
  } else {
    currentCategory.value = null;
  }
};

const fetchVideoList = async ({ pageParam = 1 }) => {
  if (currentCategory.value === null) {
    return http<IVideoListResponse>({
      url: `${apis.allVideoList}?offset=${pageParam}`,
    });
  } else {
    return http<IVideoListResponse>({
      url: `${apis.VideoListByCategory}?id=${currentCategory.value.id}&offset=${pageParam}`,
    });
  }
};

const { isLoading, data } = useInfiniteQuery(
  ["video-list", { currentCategory }],
  fetchVideoList,
  {
    getNextPageParam: (_lastPage, pages) => {
      console.log({ pages });
      if (pages[pages.length - 1].hasMore) {
        return pages.length + 1;
      }
      return undefined;
    },
  }
);
</script>

<style lang="scss" scoped></style>
