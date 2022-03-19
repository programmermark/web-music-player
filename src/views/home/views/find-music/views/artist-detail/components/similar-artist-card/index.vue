<template>
  <div
    class="similar-artist-card"
    title="点击查看歌手详情"
    @click="gotoArtistDetail(artist.id)"
  >
    <el-image class="image" :src="`${artist.img1v1Url}?param=400y400`" alt="歌手头像">
      <template #placeholder>
        <img class="no-image" src="@/assets/image/no-img.png" alt="歌手头像" />
      </template>
    </el-image>
    <div class="name">{{ artist.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { ISimilarArtist } from "@/stores/interface/artist-detail";
import { gotoArtistDetail } from "@/common/js/router";

defineProps<{
  artist: ISimilarArtist;
}>();
</script>

<style lang="scss" scoped>
.similar-artist-card {
  width: calc(20% - 16px);
  margin-right: 20px;
  margin-bottom: 30px;

  .image {
    width: 100%;
    margin-right: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #ededed;
    border-radius: 4px;

    .no-image {
      width: 100%;
      height: 100%;
    }

    :deep(.el-image__inner) {
      border-radius: 4px;
    }
  }

  .name {
    font-size: 14px;
    color: #333;
    margin-top: 8px;
    cursor: pointer;
  }
}

:nth-child(5n) {
  margin-right: 0px;
}

@media screen and (min-width: 1300px) {
  .similar-artist-card {
    width: calc(16.6% - 16.6px);
    &:nth-child(5n) {
      margin-right: 20px;
    }
    &:nth-child(6n) {
      margin-right: 0;
    }
  }
}
</style>
