<template>
  <div class="artist-detail w-full pl-[30px] pr-[30px] box-sizing-border-box">
    <!-- 歌手头像 + 名字 -->
    <BriefInfo v-if="artistDetail" :artist="artistDetail" />
    <!-- 专辑 + MV + 详情 + 相似歌手 -->
    <div class="tabs">
      <div
        class="tab"
        :class="[currentTab.value === tab.value && 'active']"
        v-for="tab in tabs"
        :key="tab.value"
        @click="changeTab(tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content">
      <HotSong
        v-show="currentTab.value === tabs[0].value"
        :songList="hotSongs"
      />
      <div class="mv-wrapper" v-show="currentTab.value === tabs[1].value">
        <ArtistMVCard
          v-for="mv in artistMVs"
          :key="mv.id"
          :id="mv.id"
          :name="mv.name"
          :cover="mv.imgurl16v9"
          :playCount="mv.playCount"
          :duration="mv.duration"
        />
      </div>
      <ArtistDesc
        v-show="currentTab.value === tabs[2].value"
        :descList="artistDesc"
      />
      <div class="similar-wrapper" v-show="currentTab.value === tabs[3].value">
        <SimilarArtistCard
          v-for="artist in similarArtists"
          :key="artist.id"
          :artist="artist"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { ITabOption } from "../playlist-detail/interface/songList";
import BriefInfo from "./components/brief-info/index.vue";
import HotSong from "./components/hot-song/index.vue";
import ArtistDesc from "./components/artist-desc/index.vue";
import SimilarArtistCard from "./components/similar-artist-card/index.vue";
import ArtistMVCard from "./components/artist-mv-card/index.vue";
import { useArtistDetailStore } from "@/stores/artist-detail";

const artistDetailStore = useArtistDetailStore();
const route = useRoute();

const tabs: ITabOption[] = [
  { label: "专辑", value: "album" },
  { label: "MV", value: "MV" },
  { label: "歌手详情", value: "artistDetail" },
  { label: "相似歌手", value: "similarArtist" },
];
const currentTab = ref<ITabOption>(tabs[0]);

/** 歌手详情MV的分页参数 */
const artistMVsPage = computed(() => artistDetailStore.artistMVsPage);

/** 歌手详情  */
const artistDetail = computed(() => artistDetailStore.artistDetail);

/** 歌手描述 */
const artistDesc = computed(() => artistDetailStore.artistDesc);

/** 相似歌手 */
const similarArtists = computed(() => artistDetailStore.similarArtists);

/** 歌手MV */
const artistMVs = computed(() => artistDetailStore.artistMVs);

/** 歌手热门歌曲 */
const hotSongs = computed(() => artistDetailStore.hotSongs);

/** 获取歌手MV */
const getArtistMvs = () => {
  artistDetailStore.setArtistMVs({
    id: route.params.id as unknown as number,
    limit: artistDetail.value?.mvSize || 10,
    offset: 0,
  });
};

/** 切换tab */
const changeTab = (value: string) => {
  const result = tabs.find((tab) => tab.value === value);
  if (result) {
    currentTab.value = result;
    if (result.label === "MV" && artistMVs.value.length === 0) {
      getArtistMvs();
    }
  }
};

/** 获取歌手详情 */
const getArtistDetail = (id: number) => {
  artistDetailStore.setArtistDetail(id);
  artistDetailStore.setArtistDesc(id);
  artistDetailStore.setSimilarArtists(id);
  artistDetailStore.setHotSongs(id);
};

watch(
  () => route.params.id,
  (id) => {
    if (id && route.name === "Artist") {
      getArtistDetail(Number(id));
    }
  }
);

onMounted(() => {
  if (route.params) {
    artistDetailStore.artistMVs = [];
    getArtistDetail(Number(route.params.id));
  }
});
</script>

<style lang="scss" scoped>
.artist-detail {
  display: flex;
  flex-direction: column;
  .tabs {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .tab {
      color: #333;
      font-size: 15px;
      margin-right: 30px;
      padding-bottom: 6px;
      cursor: pointer;
    }

    & .active {
      color: #d33a30;
      font-weight: bold;
      border-bottom: 2px solid #d13b31;
    }
  }

  .tab-content {
    height: 100%;
    .mv-wrapper {
      margin-top: 24px;
    }
    .similar-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-top: 24px;
      padding-bottom: 30px;
    }
  }
}
</style>
