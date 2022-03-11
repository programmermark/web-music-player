<template>
  <div class="w-full pt-5 box-border">
    <!-- filters: 筛选器 -->
    <div class="flex mx-[30px] pb-5">
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
    <div
      v-if="data?.pages.length"
      class="overflow-y-scroll max-h-[calc(100vh-220px)]"
      v-infinite-scroll="onPageChange"
      :infinite-scroll-disabled="disabled"
    >
      <div class="mx-[30px] mb-6" v-for="(group, index) in data?.pages" :key="index">
        <div
          v-for="video in group.datas"
          class="inline-block lg:w-1/3 xl:w-1/4 mr-0"
          :key="video.id"
        >
          <MPVideoCard
            class="mr-5"
            :video-id="video.id"
            :video-type="video.type"
            :image="video.cover"
            :title="video.title"
            :playCount="video.playCount"
            :duration="video.duration"
            :popularityDegree="video.popularityDegree"
            :artists="video.artists"
          />
        </div>
      </div>
      <!-- isLoading -->
      <div
        class="flex justify-center items-center pb-6"
        v-show="(isLoading || isFetching) && hasNextPage"
      >
        <i class="el-icon-loading text-gray-500"></i>
        <div class="ml-2 text-gray-500 text-xs">载入中...</div>
      </div>
      <!-- noMore data -->
      <div
        v-show="(isLoading || isFetching) && !hasNextPage"
        class="flex items-center justify-center text-gray-500 text-xs py-5"
      >
        <span class="w-3 h-[1px] bg-gray-500"></span>
        <span class="px-2">没有更多视频</span>
        <span class="w-3 h-[1px] bg-gray-500"></span>
        <span></span>
      </div>
      <!-- no data -->
      <div class="text-center text-[13px] text-gray-600 mt-24" v-show="noData">
        暂无推荐视频
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ref, computed, reactive } from "vue";
import { useInfiniteQuery } from "vue-query";
import CategoryFilter from "./components/category-filter/index.vue";
import GroupFilter from "./components/group-filter/index.vue";
import type {
  IFormatVideo,
  IMVVideo,
  IRadioVideo,
  IVideo,
  IVideoCategory,
  IVideoListResponse,
} from "./interface";
import MPVideoCard from "@/components/MPVideoCard.vue";
import { useVideoListStore } from "@/stores/video-list";

const videoListstore = useVideoListStore();

/** 当前视频类别 */
const currentCategory = computed(() => videoListstore.currentCategory);

const queryKey = reactive(["video-list", { currentCategory }]);

/** 切换视频类别 */
const handleCategoryChange = (category?: IVideoCategory) => {
  if (category) {
    videoListstore.currentCategory = category;
  } else {
    videoListstore.currentCategory = null;
  }
};

/** 获取视频列表 */
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
    select: (data) => {
      const pages = data.pages.map((pageData) => {
        const formatDatas = pageData.datas
          .filter((result) => [1, 2, 7].includes(result.type))
          .map((result) => {
            let formatVideoData: IFormatVideo;
            if (result.type === 1) {
              const videoData = result.data as IVideo;
              formatVideoData = {
                id: videoData.vid,
                type: result.type,
                title: videoData.title,
                playCount: videoData.playTime,
                duration: Math.round(videoData.durationms / 1000),
                cover: videoData.coverUrl,
                artists: [
                  {
                    id: videoData.creator?.userId,
                    name: videoData.creator?.nickname,
                    isArtist: false,
                  },
                ],
              };
            } else if (result.type === 2) {
              const videoData = result.data as IMVVideo;
              formatVideoData = {
                id: videoData.id,
                type: result.type,
                title: videoData.name,
                playCount: videoData.playCount,
                duration: Math.round(videoData.duration / 1000),
                cover: videoData.imgurl16v9,
                artists: videoData.artists.map((artist) => ({
                  id: artist.id,
                  name: artist.name,
                  isArtist: true,
                })),
              };
            } else {
              const videoData = result.data as IRadioVideo;
              const { liveRoom, liveUser } = videoData.liveData;
              formatVideoData = {
                id: liveRoom.liveRoomNo,
                type: result.type,
                title: liveRoom.title,
                popularityDegree: liveRoom.popularity,
                cover: liveRoom.coverUrl,
                artists: [
                  {
                    id: liveUser.userId,
                    name: liveUser.nickName,
                    isArtist: false,
                  },
                ],
              };
            }
            return formatVideoData;
          });
        return {
          ...pageData,
          datas: formatDatas,
        };
      });
      return {
        ...data,
        pages,
      };
    },
    getNextPageParam: (_lastPage, pages) => {
      if (pages[pages.length - 1].hasmore) {
        return pages.length + 1;
      }
      return undefined;
    },
  }
);

/** 页面是否没有数据 */
const noData = computed(() => {
  return !data.value?.pages[0].datas.length;
});

/** 禁用下拉，防止重复请求 */
const disabled = computed(() => {
  const reuslt = isLoading.value || isFetching.value || !hasNextPage?.value;
  return reuslt;
});

const onPageChange = () => {
  if (isFetched.value && hasNextPage?.value) {
    fetchNextPage.value();
  }
};
</script>

<style lang="scss" scoped></style>
