<template>
  <div class="w-full h-full px-10">
    <Tabs />
    <div class="content-wrapper pb-5" v-show="!loading">
      <div class="w-full pt-14 px-10 pb-5 flex items-center">
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
      <div class="pt-5 pb-12">
        <ListCard
          v-for="(artist, index) in otherCardList"
          :key="index + 1"
          :rank="index + 3"
          :artist="artist"
        />
      </div>
    </div>
    <div
      class="h-[calc(100%-130px)] top-20 card-wrapper-loading"
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

<style lang="scss" scoped></style>
