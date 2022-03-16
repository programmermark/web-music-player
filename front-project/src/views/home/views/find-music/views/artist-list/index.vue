<template>
  <div class="max-w-[1100px] w-full pl-[30px] pr-[30px] box-border">
    <!-- 筛选器 -->
    <Filters @change-cat="onCatChange" />
    <!-- 歌手列表 -->
    <div class="w-full mt-[10px]" v-infinite-scroll="onPageChange">
      <ArtistRankCard
        v-if="artistRankImg && currentLanguageCatLabel"
        v-show="showRankCard"
        :imgUrl="artistRankImg"
        :type="currentLanguageCatLabel"
      />
      <ArtistCard v-for="artist in artistList" :key="artist.id" :artist="artist" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from "vue";
import Filters from "./components/filters/index.vue";
import ArtistCard from "./components/artist-card/index.vue";
import ArtistRankCard from "./components/artist-rank-card/index.vue";
import type { IFiltersState } from "./components/interface/filters";
import type { ISetArtistListPayload } from "@/stores/interface/artistlist";
import type { ILanguageCatOption } from "./components/interface";
import { useRankListStore } from "@/stores/rank-list";
import { useArtistListStore } from "@/stores/artist-list";

const rankListStore = useRankListStore();
const artistListStore = useArtistListStore();

const state = reactive<ISetArtistListPayload>({
  filters: {
    currentLanguageCat: "-1",
    currentTypeCat: "-1",
    currentWordCat: "-1",
  },
  limit: 30,
  offset: 0,
});

const currentLanguageCat = computed(() => state.filters.currentLanguageCat);
const currentTypeCat = computed(() => state.filters.currentTypeCat);
const currentWordCat = computed(() => state.filters.currentWordCat);
const artistLimit = computed(() => state.limit);
const artistOffset = computed(() => state.offset);

/** 是否显示歌手排行榜 */
const showRankCard = computed(
  () => state.filters.currentTypeCat === "-1" && state.filters.currentWordCat === "-1"
);

/** 当前语种类别显示名称 */
const currentLanguageCatLabel = computed(() => {
  const list: ILanguageCatOption[] = [
    { label: "华语", value: "7" },
    { label: "欧美", value: "96" },
    { label: "日本", value: "8" },
    { label: "韩国", value: "16" },
  ];
  const result = list.find((item) => item.value === state.filters.currentLanguageCat);
  if (result) {
    return result.label;
  }
  return undefined;
});

/** 歌手排行榜图片 */
const artistRankImg = computed(() => rankListStore.artistRank?.coverUrl);
/** 歌手列表 */
const artistList = computed(() => artistListStore.artistList);

const onCatChange = (filters: IFiltersState) => {
  state.filters = filters;
  state.offset = 0;
};

/**
 * 向下滚动时加载数据
 */
const onPageChange = () => {
  state.offset += state.limit;
};

/** 获取歌手列表 */
const fetchArtistList = (state: ISetArtistListPayload) => {
  artistListStore.setArtistList(state);
};

/** 获取所有排行榜数据 */
const fetchAllRankList = () => {
  rankListStore.setAllRankList();
};

watch(
  [currentLanguageCat, currentTypeCat, currentWordCat, artistLimit, artistOffset],
  ([languageCat, typeCat, wordCat, limit, offset]) => {
    fetchArtistList({
      filters: {
        currentLanguageCat: languageCat,
        currentTypeCat: typeCat,
        currentWordCat: wordCat,
      },
      limit,
      offset,
    });
  }
);

onMounted(() => {
  if (!artistRankImg.value) {
    fetchAllRankList();
  }
  fetchArtistList(state);
});
</script>
