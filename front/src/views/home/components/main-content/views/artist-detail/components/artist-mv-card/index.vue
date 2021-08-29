<template>
  <div class="artist-mv-card">
    <div class="cover-wrapper" title="点击查看MV详情" @click="gotoMVDetail(id)">
      <el-image class="image" :src="`${cover}?param=480y270`" alt="MV封面">
        <template #placeholder>
          <img class="no-image" src="@/assets/image/no-img.png" alt="MV封面" />
        </template>
      </el-image>
      <div class="play-count">
        <MPIcon icon="play-caret" color="#fff" bgColor="none" />
        <span>{{ translatePlayCount(playCount) }}</span>
      </div>
      <div class="duration">
        {{ transformSecondToMinute(Math.floor(duration / 1000)) }}
      </div>
    </div>
    <div
      class="name text-ellipsis"
      title="点击查看MV详情"
      @click="gotoMVDetail(id)"
    >
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import MPIcon from "@/components/MPIcon.vue";
import { translatePlayCount, transformSecondToMinute } from "@/common/js/util";

defineProps<{
  id: number /** MV id */;
  cover: string /** MV封面图片 */;
  name: string /** MV名称 */;
  playCount: number /** MV播放量 */;
  duration: number /** MV持续时长 */;
}>();

/** 查看MV详情 */
const gotoMVDetail = (id: number) => {
  console.log("查看MV详情，MV id:", id);
};
</script>

<style lang="scss" scoped>
.artist-mv-card {
  display: inline-block;
  width: calc(25% - 12px);
  margin-right: 16px;
  border-radius: 8px;

  .cover-wrapper {
    position: relative;
    cursor: pointer;
    .image {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid #ededed;
    }

    .play-count {
      display: flex;
      align-items: center;
      position: absolute;
      top: 4px;
      right: 8px;
      color: white;
      font-size: 12px;
      font-weight: bold;
      & > span {
        margin-left: 2px;
      }
    }

    .duration {
      position: absolute;
      bottom: 8px;
      right: 8px;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  }
  .name {
    width: 100%;
    color: #434343;
    font-size: 13px;
    margin-top: 8px;
    margin-bottom: 32px;
    cursor: pointer;
  }
}
:nth-child(4n) {
  margin-right: 0px;
}

@media screen and (max-width: 1180px) {
  .artist-mv-card {
    width: calc(33.3% - 10.6px);
    &:nth-child(4n) {
      margin-right: 16px;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

@media screen and (min-width: 1300px) {
  .artist-mv-card {
    width: calc(20% - 12.8px);
    &:nth-child(4n) {
      margin-right: 16px;
    }
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
