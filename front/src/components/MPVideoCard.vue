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
        class="w-full h-full flex items-center justify-center box-border rounded-md border border-gray-50"
        :src="`${image}?param=480y270`"
        alt="MV封面"
      >
        <template #placeholder>
          <img class="w-full h-full" src="@/assets/image/no-img-16x9.png" alt="MV封面" />
        </template>
      </el-image>
      <div class="absolute top-1 right-2 flex items-center">
        <MPIcon icon="play-caret" :size="16" color="#fff" bgColor="" :scale="0.8" />
        <span class="text-xs text-white font-medium">{{
          translatePlayCount(playCount)
        }}</span>
      </div>
      <span class="absolute bottom-1 right-2 text-xs text-white font-medium">{{
        transformSecondToMinute(duration)
      }}</span>
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
      @click="gotoMVDetail(videoId)"
    >
      {{ title }}
    </div>
    <!-- 卡片副标题（可能为空） -->
    <div class="mb-2" v-if="artists && artists.length > 0">
      <div
        class="cursor-pointer text-[13px] text-gray-400"
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
import { ElMessage } from "element-plus";

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
  if (id && typeof id === "number") {
    router.push(`/mv/${id}`);
  } else if (id && typeof id === "string") {
    ElMessage.warning({
      message: "功能开发中，敬请期待！",
      type: "warning",
    });
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
