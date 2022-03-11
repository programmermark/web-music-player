<template>
  <div class="mp-video-player">
    <video
      class="player"
      :style="{ width: `${width}px`, height: `${height}px` }"
      ref="videoPlayerRef"
      :width="width"
      :height="height"
      :controls="controls"
      :autoplay="autoplay"
      :src="src"
    ></video>
  </div>
</template>

<script lang="ts" setup>
/** 自定义播放器：默认使用原生的<video>的原生样式，有时间再优化 */

import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = withDefaults(
  defineProps<{
    src: string /** 视频资源地址 */;
    controls?: boolean /** 是否显示视频默认工具条 */;
    autoplay?: boolean /** 是否自动播放视频 */;
    width?: number /** 视频播放器的宽度 */;
    height?: number /** 视频播放器的高度 */;
  }>(),
  {
    controls: true,
    autoplay: true,
    width: 640,
    height: 360,
  }
);

const route = useRoute();

/** 视频播放器元素 */
const videoPlayerRef = ref<HTMLVideoElement>();

watch(
  () => props.src,
  (nv, ov) => {
    if (nv && nv !== ov) {
      videoPlayerRef.value?.play();
    }
  }
);
</script>

<style lang="scss" scoped>
.mp-video-player {
  .player {
    border-radius: 8px;
    background-color: #000;
  }
}
</style>
