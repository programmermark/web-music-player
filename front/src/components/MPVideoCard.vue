<template>
  <div class="mb-8">
    <!-- 卡片图片 -->
    <div
      class="relative cursor-pointer"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="gotoMVDetail(videoId)"
    >
      <el-image
        class="
          w-full
          h-full
          flex
          items-center
          justify-center
          box-border
          rounded
          border border-gray-50
        "
        :src="`${image}?param=480y270`"
        alt="MV封面"
      >
        <template #placeholder>
          <img
            class="w-full h-full"
            src="@/assets/image/no-img-16x9.png"
            alt="MV封面"
          />
        </template>
      </el-image>
      <div class="absolute top-1 right-2">
        <MPIcon icon="play-caret" :size="16" color="#fff" />
        <span class="ml-1 text-xs text-white">{{
          translatePlayCount(playCount)
        }}</span>
      </div>
      <span class="absolute top-1 right-2 text-xs text-white">{{
        transformSecondToMinute(duration)
      }}</span>
      <!-- 播放图标 -->
      <MPOptIcon
        v-show="showIcon"
        class="top-0 right-0 bottom-0 left-0"
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
      class="text-sm text-gray-600 my-2 cursor-pointer text-ellipsis"
      @click="gotoMVDetail(videoId)"
    >
      {{ title }}
    </div>
    <!-- 卡片副标题（可能为空） -->
    <div class="mb-2" v-if="artists && artists.length > 0">
      <div
        class="cursor-pointer text-gray-300"
        v-for="artist in artists"
        :key="artist.id"
        @click="gotoArtist(artist.id)"
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
import { IArtist } from "@/views/home/components/main-content/views/artist-detail/interface";
import { translatePlayCount, transformSecondToMinute } from "@/common/js/util";

defineProps<{
  // 视频id
  videoId: number | string;
  // 视频图片
  image: string;
  // 视频标题
  title: string;
  // 视频播放量
  playCount: number;
  // 视频时长
  duration: number;
  // 视频作者
  artists?: IArtist[];
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
const gotoMVDetail = (id: number | string) => {
  if (id) {
    router.push(`/mv/${id}`);
  }
};

/**
 * 跳转到歌手详情
 */
const gotoArtist = (id: number) => {
  router.push(`/artist/${id}`);
};
</script>

<style lang="scss" scoped></style>
