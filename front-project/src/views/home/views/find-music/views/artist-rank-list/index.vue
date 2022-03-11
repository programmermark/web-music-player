<template>
  <div class="w-full h-full">
    <Tabs />
    <div class="content-wrapper" v-show="!loading">
      <div class="top-card-wrapper">
        <TopCard
          v-for="(artist, index) in topCardList"
          :key="artist.id"
          :id="artist.id"
          :no="index + 1"
          :name="artist.name"
          :trans="artist.trans"
          :portrait="artist.picUrl"
          :score="artist.score"
        />
      </div>
      <div class="card-list-wrapper">
        <ListCard
          v-for="(artist, index) in otherCardList"
          :key="index + 1"
          :rank="index + 3"
          :artist="artist"
        />
      </div>
    </div>
    <div
      class="card-wrapper-loading"
      v-show="loading"
      v-loading="loading"
      element-loading-text="载入中..."
      element-loading-background="rgba(255, 255, 255)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Tabs from "./components/tabs/index.vue";
import TopCard from "./components/top-card/index.vue";
import ListCard from "./components/list-card/index.vue";
import { useArtistRankListStore } from "@/stores/artist-rank-list";

const artistRankListStore = useArtistRankListStore();

const loading = computed(() => artistRankListStore.loading);

/** 排行前三的歌手列表 */
const topCardList = computed(() =>
  artistRankListStore.artistList.filter((_item, index) => index < 3)
);

/** 排行前三之外的歌手列表 */
const otherCardList = computed(() =>
  artistRankListStore.artistList.filter((_item, index) => index >= 3)
);
</script>

<style lang="scss" scoped>
.artist-rank-list {
  height: 100%;
  .content-wrapper {
    .top-card-wrapper {
      width: calc(100% - 70px);
      padding: 70px 40px 20px 30px;
      display: flex;
      align-items: center;
    }

    .card-list-wrapper {
      padding-top: 20px;
      padding-bottom: 50px;
    }
  }

  .card-wrapper-loading {
    top: 96px;
    height: calc(100% - 146px);
    :deep(.el-loading-spinner) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.el-icon-loading) {
      color: #666;
    }

    :deep(.el-loading-text) {
      margin-left: 2px;
      color: #666;
    }
  }
}
</style>
