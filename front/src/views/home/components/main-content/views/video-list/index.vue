<template>
  <div
    class="w-full pt-5 box-border overflow-auto h-[calc(100vh-170px)]"
    v-infinite-scroll="onPageChange"
    :infinite-scroll-disabled="disabled"
  >
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
    <div v-if="data?.pages.length">
      <div class="mx-[30px] mt-6" v-for="(group, index) in data?.pages" :key="index">
        <div
          v-for="video in group.datas.filter((item) => item.data.vid)"
          class="inline-block lg:w-1/3 xl:w-1/4 mr-0"
          :key="video.data.vid"
        >
          <MPVideoCard
            class="mr-5"
            :video-id="video.data.vid"
            :image="video.data.coverUrl"
            :title="video.data.title"
            :playCount="video.data.playTime"
            :duration="Math.round(video.data.durationms / 1000)"
            :artists="[
              {
                id: video.data.creator?.userId,
                name: video.data.creator?.nickname,
              },
            ]"
          />
        </div>
      </div>
      <!-- isLoading -->
      <div
        class="card-wrapper-loading"
        v-show="!isLoading"
        v-loading="!isLoading"
        element-loading-text="载入中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255)"
      ></div>
      <!-- noMore data -->
    </div>

    <!-- page footer：分页 -->
  </div>
</template>

<script lang="ts" setup>
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ref, computed, reactive } from "vue";
import { useInfiniteQuery } from "vue-query";
import CategoryFilter from "./components/category-filter/index.vue";
import GroupFilter from "./components/group-filter/index.vue";
import { IVideoCategory, IVideoListResponse } from "./interface";
import MPVideoCard from "@/components/MPVideoCard.vue";

/** 当前视频类别 */
const currentCategory = ref<IVideoCategory | null>(null);

const queryKey = reactive(["video-list", { currentCategory }]);

/** 切换视频类别 */
const handleCategoryChange = (category?: IVideoCategory) => {
  if (category) {
    currentCategory.value = category;
  } else {
    currentCategory.value = null;
  }
};

const fetchVideoList = async (category: IVideoCategory | null, pageParam: number) => {
  if (category === null) {
    return http<IVideoListResponse>({
      url: `${apis.allVideoList}?offset=${pageParam}`,
    });
  } else {
    return http<IVideoListResponse>({
      url: `${apis.VideoListByCategory}?id=${category.id}&offset=${pageParam}`,
    });
  }
};

const {
  isLoading,
  isFetching,
  isFetched,
  data,
  hasNextPage,
  fetchNextPage,
} = useInfiniteQuery(
  queryKey,
  ({ pageParam = 1 }) => fetchVideoList(currentCategory.value, pageParam),
  {
    getNextPageParam: (_lastPage, pages) => {
      if (pages[pages.length - 1].hasmore) {
        return pages.length + 1;
      }
      return undefined;
    },
  }
);

const disabled = computed(() => {
  const reuslt = isLoading.value || isFetching.value || !hasNextPage?.value;
  console.log({ reuslt });
  return reuslt;
});

const onPageChange = () => {
  if (isFetched.value && hasNextPage) {
    fetchNextPage.value();
  }
};
</script>

<style lang="scss" scoped></style>
