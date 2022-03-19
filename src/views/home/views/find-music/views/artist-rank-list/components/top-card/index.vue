<template>
  <div class="top-card" @click="gotoArtistDetail(id)" title="点击查看歌手详情">
    <div class="no">{{ no }}</div>

    <div class="content">
      <div class="main-content">
        <div class="name-wrapper">
          <span class="name">{{ name }}</span>
          <span class="trans text-ellipsis" v-if="trans">（{{ trans }}）</span>
        </div>
        <div class="score">热度：{{ score }}</div>
      </div>
      <div class="portrait-wrapper" title="歌手头像">
        <el-image class="portrait" :src="`${portrait}?param=200y200`" alt="歌手头像">
          <template #placeholder>
            <img class="no-image" src="@/assets/image/no-img.png" alt="歌手头像" />
          </template>
        </el-image>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gotoArtistDetail } from "@/common/js/router";

/** 歌手排行榜 - 排行前三的card */
defineProps<{
  /** 歌手id */
  id: number;
  /** 排行顺序 */
  no: number;
  /** 歌手名 */
  name: string;
  /** 歌手名(译名) */
  trans: string;
  /** 歌手头像url */
  portrait: string;
  /** 热度 */
  score: number;
}>();
</script>

<style lang="scss" scoped>
.top-card {
  height: 100px;
  flex: 1;
  margin-right: 16px;
  position: relative;

  .no {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    font-size: 36px;
    font-weight: 500;
    color: #edafab;
    background-color: #fff;
    padding: 2px 0 0 4px;
    box-sizing: border-box;
    clip-path: path("M 0 0 H 50 L 0 50 V 0");
  }

  .content {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    .main-content {
      flex: 1;
      margin-left: 34px;
      .name-wrapper {
        width: 100%;
        display: flex;
        color: #333;
        font-size: 15px;
        margin-bottom: 10px;

        .trans {
          flex: 1;
          color: #999;
        }
      }
      .score {
        color: #b8b8b8;
        font-size: 13px;
      }
    }

    .portrait-wrapper {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid #ededed;

      .portrait {
        width: auto;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: 1px solid #ededed;
        border-radius: 4px;

        .no-image {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }

        :deep(.el-image__inner) {
          border-radius: 4px;
        }
      }
    }
  }
}

:last-child {
  margin-right: 0;
}
</style>
