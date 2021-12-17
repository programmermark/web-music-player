<template>
  <div class="mb-8">
    <!-- 卡片图片 -->
    <div
      class="relative cursor-pointer"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="gotoMVDetail(videoId, videoType)"
    >
      <el-image
        class="w-full h-full flex items-center justify-center box-border rounded-md border border-gray-50"
        :src="`${image}?param=480y270`"
        alt="MV封面"
      >
        <template #placeholder>
          <img class="w-full h-full" src="@/assets/image/no-img-16x9.png" alt="MV封面" />
        </template>
      </el-image>
      <div v-if="playCount" class="absolute top-1 right-2 flex items-center">
        <MPIcon icon="play-caret" :size="16" color="#fff" bgColor="" :scale="0.8" />
        <span class="text-xs text-white font-medium">{{
          translatePlayCount(playCount)
        }}</span>
      </div>
      <span
        v-if="duration"
        class="absolute bottom-1 right-2 text-xs text-white font-medium"
        >{{ transformSecondToMinute(duration) }}</span
      >
      <div v-if="popularityDegree" class="absolute top-1 right-2 flex items-center">
        <MPIcon
          icon="popularity-degree"
          :size="16"
          color="#fff"
          bgColor=""
          :scale="0.8"
        />
        <span class="text-xs text-white font-medium">{{ popularityDegree }}</span>
      </div>
      <!-- 播放图标 -->
      <MPOptIcon
        v-show="showIcon"
        class="absolute top-[calc(50%-20px)] left-[calc(50%-20px)]"
        :size="40"
        icon="play-caret-solid"
        color="#d33a33"
        bgColor="#dddddd"
        display="always"
      />
    </div>
    <!-- 卡片标题 -->
    <div
      v-if="title"
      class="text-[13px] text-gray-600 font-medium mt-2 mb-1 cursor-pointer text-ellipsis"
      @click="gotoMVDetail(videoId, videoType)"
    >
      {{ title }}
    </div>
    <!-- 卡片副标题（可能为空） -->
    <div class="mb-2" v-if="artists && artists.length > 0">
      <div
        class="cursor-pointer text-[13px] text-gray-400"
        v-for="artist in artists"
        :key="artist.id"
        @click="gotoArtist(artist)"
      >
        {{ artist.name }}
      </div>
    </div>
  </div>
</template>

<!-- 视频卡片组件 -->
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MPIcon from "./MPIcon.vue";
import MPOptIcon from "./MPOptIcon.vue";
import { translatePlayCount, transformSecondToMinute } from "@/common/js/util";
import { ElMessage } from "element-plus";
import {
  IFormatArtist,
  VideoType,
} from "@/views/home/components/main-content/views/video-list/interface";

defineProps<{
  // 视频id
  videoId: number | string;
  // 视频类型
  videoType: VideoType;
  // 视频图片
  image: string;
  // 视频标题
  title: string;
  // 视频播放量
  playCount?: number;
  // 直播间热度
  popularityDegree?: number;
  // 视频时长
  duration?: number;
  // 视频作者
  artists?: IFormatArtist[];
}>();

const router = useRouter();

const showIcon = ref(false);

const handleMouseEnter = () => {
  showIcon.value = true;
};
const handleMouseLeave = () => {
  showIcon.value = false;
};

/**
 * 跳转到MV详情页
 */
const gotoMVDetail = (id: number | string, videoType: VideoType) => {
  if (id) {
    switch (videoType) {
      /** 视频 */
      case 1:
        router.push(`/mv/${id}`);
        break;
      /** MV */
      case 2:
        ElMessage.warning({
          message: "MV详情页面开发中，敬请期待！",
          type: "warning",
        });
        break;
      /** 直播 */
      case 7:
        const liveRoomUrl = `https://look.163.com/live?id=${id}`;
        window.open(liveRoomUrl);
        break;
      default:
        router.push(`/mv/${id}`);
        break;
    }
  }
};

/**
 * 跳转到歌手详情
 */
const gotoArtist = (artist: IFormatArtist) => {
  if (artist.isArtist) {
    router.push(`/artist/${artist.id}`);
  } else {
    ElMessage.warning({
      message: "用户详情页面开发中，敬请期待！",
      type: "warning",
    });
  }
};
</script>

<style lang="scss" scoped></style>
