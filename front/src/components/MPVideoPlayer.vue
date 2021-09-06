<template>
  <div class="mp-video-player">
    <video class="player" :width="width" :height="height">
      <source :src="src" />
    </video>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    src: string /** 视频资源地址 */;
    width: number /** 视频播放器的宽度 */;
    height: number /** 视频播放器的高度 */;
  }>(),
  {
    width: 640,
    height: 360,
  }
);
</script>

<style lang="scss" scoped>
.mp-video-player {
  .player {
    border-radius: 8px;
  }
}
</style>
