<template>
  <div class="card" @click="gotoMVDetail(id)">
    <img class="image" :src="`${imgUrl}?param=320y180`" alt="MV封面" />
    <div class="icon">
      <MPIcon icon="play-caret" color="#fff" bgColor="none" />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
import MPIcon from "@/components/MPIcon.vue";
import { gotoMVDetail } from "@/common/js/router";

/** 独家放送卡片 */
defineProps<{
  id: number;
  /** 图片链接地址 */
  imgUrl: string;
  /** 卡片标题 */
  title: string;
}>();
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: calc(25% - 15px);
  margin-right: 20px;
  border-radius: 4px;
  margin-bottom: 40px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }

  & > .image {
    width: 100%;
    border-radius: 4px;
  }

  .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 4px;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      border-radius: 50%;
      background-color: #000;
      border: 1px solid #efefef;
      opacity: 0.5;
      z-index: -1;
    }
  }

  .title {
    width: 100%;
    font-size: 13px;
    line-height: 1.5;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
