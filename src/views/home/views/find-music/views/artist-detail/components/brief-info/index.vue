<template>
  <div class="brief-info">
    <el-image class="image" :src="`${artist.cover}?param=400y400`" alt="歌手头像">
      <template #placeholder>
        <img class="no-image" src="@/assets/image/no-img.png" alt="歌手头像" />
      </template>
    </el-image>
    <div class="main-content">
      <div class="name">{{ artist.name }}</div>
      <div class="trans" v-if="artist.transNames && artist.transNames.length > 0">
        {{ artist.transNames[0] }}
      </div>
      <div class="count-wrapper">
        <div class="count-item">
          单曲数：<span class="name">{{ artist.musicSize }}</span>
        </div>
        <div class="count-item">
          专辑数：<span class="name">{{ artist.mvSize }}</span>
        </div>
        <div class="count-item">
          MV数：<span class="name">{{ artist.albumSize }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IArtistDetail } from "@/stores/interface/artist-detail";

defineProps<{
  /** 歌手详情 */
  artist: IArtistDetail;
}>();
</script>

<style lang="scss" scoped>
.brief-info {
  display: flex;
  padding: 15px 0 36px 0;

  .image {
    width: 200px;
    height: 200px;
    margin-right: 30px;
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

  .main-content {
    .name {
      font-size: 22px;
      color: #333;
      font-weight: 500;
      margin-bottom: 14px;
    }
    .trans {
      font-size: 12px;
      color: #666;
      margin-bottom: 20px;
    }

    .count-wrapper {
      display: flex;
      align-items: center;
      .count-item {
        font-size: 13px;
        color: #333;
        margin-right: 16px;
        .name {
          font-size: 13px;
          color: #666;
        }
      }
    }
  }
}
</style>
