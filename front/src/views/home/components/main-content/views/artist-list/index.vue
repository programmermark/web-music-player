<template>
  <div class="artist-list">
    <!-- 筛选器 -->
    <filters @change-cat="onCatChange" />
    <!-- 歌手列表 -->
    <div class="artist-wrapper" v-infinite-scroll="onPageChange">
      <artist-rank-card
        v-show="showRankCard"
        :imgUrl="artistRankImg"
        :type="currentLanguageCatLabel"
      />
      <artist-card
        v-for="artist in artistList"
        :key="artist.id"
        :artist="artist"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from "vue";
import Filters from "./components/filters/index.vue";
import ArtistCard from "./components/artist-card/index.vue";
import ArtistRankCard from "./components/artist-rank-card/index.vue";
import { IFiltersState } from "./components/interface/filters";
import { ISetArtistListPayload } from "@/store/modules/interface/artistlist";
import { useStore } from "@/store";

export default defineComponent({
  name: "ArtistList",
  components: {
    filters: Filters,
    "artist-card": ArtistCard,
    "artist-rank-card": ArtistRankCard,
  },
  setup() {
    const store = useStore();

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
      () =>
        state.filters.currentTypeCat === "-1" &&
        state.filters.currentWordCat === "-1"
    );

    /** 当前语种类别显示名称 */
    const currentLanguageCatLabel = computed(() => {
      const list = [
        { label: "华语", value: "7" },
        { label: "欧美", value: "96" },
        { label: "日本", value: "8" },
        { label: "韩国", value: "16" },
      ];
      const result = list.find(
        (item) => item.value === state.filters.currentLanguageCat
      );
      if (result) {
        return result.label;
      }
      return undefined;
    });

    /** 歌手排行榜图片 */
    const artistRankImg = computed(
      () => store.state.rankList.artistRank?.coverUrl
    );
    /** 歌手列表 */
    const artistList = computed(() => store.state.artistList.artistList);

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
      store.dispatch("artistList/setArtistList", state);
    };

    watch(
      [
        currentLanguageCat,
        currentTypeCat,
        currentWordCat,
        artistLimit,
        artistOffset,
      ],
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
      fetchArtistList(state);
    });

    return {
      artistRankImg,
      currentLanguageCatLabel,
      showRankCard,
      artistList,
      onCatChange,
      onPageChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.artist-list {
  .artist-wrapper {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
