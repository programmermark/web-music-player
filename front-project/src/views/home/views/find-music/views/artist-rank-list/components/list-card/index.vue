<template>
  <div class="list-card" @click="gotoArtistDetail(artist.id)" title="点击查看歌手详情">
    <!-- 排名和排名变化 -->
    <div class="rank-wrapper">
      <div class="rank">{{ rank + 1 }}</div>
      <div class="text-base text-[#999999] scale-50 flex items-center">
        <el-icon class="font-bold" :color="cardIconColor">
          <minus v-if="rankChange.unchanged" />
          <top v-else-if="rankChange.rising" />
          <bottom v-else />
        </el-icon>
        <span class="ml-1">{{ rankChange.value }}</span>
      </div>
    </div>
    <!-- 歌手头像 -->
    <div class="portrait-wrapper" title="歌手头像">
      <el-image class="portrait" :src="`${artist.picUrl}?param=120y120`" alt="歌手头像">
        <template #placeholder>
          <img class="no-image" src="@/assets/image/no-img.png" alt="歌手头像" />
        </template>
      </el-image>
    </div>
    <!-- 歌手名和团体 -->
    <div class="name-wrapper">
      <span class="name">{{ artist.name }}</span>
      <span class="trans" v-if="artist.trans">（{{ artist.trans }}）</span>
    </div>
    <!-- 热度 -->
    <div class="score">热度：{{ artist.score }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { gotoArtistDetail } from "@/common/js/router";
import type { IArtistCard } from "@/stores/interface/artist-rank-list";

const props = defineProps<{
  /** 歌手排名 */
  rank: number;
  /** 歌手信息 */
  artist: IArtistCard;
}>();

const { rank, artist } = toRefs(props);

const cardIconColor = computed(() => {
  return rankChange.value.unchanged
    ? ""
    : rankChange.value.rising
    ? "#cc2829"
    : "#2c77ca";
});

const rankChange = computed(() => {
  const lastRank = artist.value.lastRank;
  const currentRank = rank.value;
  return {
    unchanged: currentRank === lastRank,
    rising: currentRank < lastRank,
    value: Math.abs(currentRank - lastRank),
  };
});
</script>

<style lang="scss" scoped>
.list-card {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 40px 0 30px;
  background-color: #fafafa;
  cursor: pointer;

  .rank-wrapper {
    text-align: center;
    position: relative;
    top: 8px;
    margin-right: 24px;

    .rank {
      color: #999;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .portrait-wrapper {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    overflow: hidden;

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

  .name-wrapper {
    flex: 1;
    font-size: 14px;
    .name {
      color: #333;
    }
    .trans {
      color: #999;
    }
  }

  .score {
    color: #999;
    font-size: 13px;
  }
}

.list-card:nth-child(2n) {
  background-color: #fff;
}

.list-card:hover {
  background-color: #f2f2f2;
}
</style>
