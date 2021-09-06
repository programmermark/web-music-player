<template>
  <div class="mv-detail">
    <!-- MV详情 -->
    <div class="detail-wrapper">
      <!-- 视频详情 -->
      <div class="router-wrapper" @click="gotBack">
        <MPIcon
          icon="arrow-left"
          color="#666"
          bg-color="none"
          :size="16"
          :scale="1"
        />
        <span class="text">视频详情</span>
      </div>
      <!-- MV 播放器 -->
      <!-- <MPVideoPlayer :src="" /> -->
      <!-- MV详细信息 -->
    </div>
    <!-- 相关推荐 -->
    <div class="recommend-mvs"></div>
  </div>
</template>

<script lang="ts" setup>
import MPIcon from "@/components/MPIcon.vue";
import { useRouter } from "vue-router";
import MPVideoPlayer from "@/components/MPVideoPlayer.vue";

const router = useRouter();

/** 路由回退到上一页 */
const gotBack = () => router.go(-1);
</script>

<style lang="scss" scoped>
.mv-detail {
  padding: 20px 0;
  .detail-wrapper {
    width: 640px;
    margin-right: 30px;
    .router-wrapper {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 16px;
      .text {
        margin-left: 10px;
        color: #333;
        size: 18px;
      }
    }
  }

  .recommend-mvs {
    width: 280px;
  }
}
</style>
