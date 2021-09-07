<template>
  <div class="mp-video-player">
    <video
      class="player"
      :width="width"
      :height="height"
      :controls="controls"
      :autoplay="autoplay"
    >
      <source :src="src" />
    </video>
  </div>
</template>

<script lang="ts" setup>
/** 自定义播放器：默认使用原生的<video>的原生样式，有时间再优化 */

withDefaults(
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
</script>

<style lang="scss" scoped>
.mp-video-player {
  .player {
    border-radius: 8px;
    background-color: #000;
  }
}
</style>
