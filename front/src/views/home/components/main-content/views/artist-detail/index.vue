<template>
  <div class="artist-detail width-100 pdl-30 pdr-30 box-sizing-border-box">
    <!-- 歌手头像 + 名字 -->
    <brief-info v-if="artistDetail" :artist="artistDetail" />
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
      <artist-desc
        v-show="currentTab.value === tabs[2].value"
        :descList="artistDesc"
      />
      <div class="similar-wrapper" v-show="currentTab.value === tabs[3].value">
        <similar-artist-card
          v-for="artist in similarArtists"
          :key="artist.id"
          :artist="artist"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ITabOption } from "../playlist-detail/interface/songList";
import BriefInfo from "./components/brief-info/index.vue";
import HotSong from "./components/hot-song/index.vue";
import ArtistDesc from "./components/artist-desc/index.vue";
import SimilarArtistCard from "./components/similar-artist-card/index.vue";
import ArtistMVCard from "./components/artist-mv-card/index.vue";

export default defineComponent({
  components: {
    "brief-info": BriefInfo,
    HotSong,
    "artist-desc": ArtistDesc,
    "similar-artist-card": SimilarArtistCard,
    ArtistMVCard,
  },
  name: "ArtistDetail",
  setup() {
    const route = useRoute();
    const store = useStore();

    const tabs: ITabOption[] = [
      { label: "专辑", value: "album" },
      { label: "MV", value: "MV" },
      { label: "歌手详情", value: "artistDetail" },
      { label: "相似歌手", value: "similarArtist" },
    ];
    const currentTab = ref<ITabOption>(tabs[0]);

    /** 歌手详情MV的分页参数 */
    const artistMVsPage = computed(
      () => store.state.artistDetail.artistMVsPage
    );

    /** 歌手详情  */
    const artistDetail = computed(() => store.state.artistDetail.artistDetail);

    /** 歌手描述 */
    const artistDesc = computed(() => store.state.artistDetail.artistDesc);

    /** 相似歌手 */
    const similarArtists = computed(
      () => store.state.artistDetail.similarArtists
    );

    /** 歌手MV */
    const artistMVs = computed(() => store.state.artistDetail.artistMVs);

    /** 歌手热门歌曲 */
    const hotSongs = computed(() => store.state.artistDetail.hotSongs);

    /** 获取歌手MV */
    const getArtistMvs = () => {
      store.dispatch("artistDetail/setArtistMVs", {
        id: route.params.id,
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
      store.dispatch("artistDetail/setArtistDetail", id);
      store.dispatch("artistDetail/setArtistDesc", id);
      store.dispatch("artistDetail/setSimilarArtists", id);
      store.dispatch("artistDetail/setHotSongs", id);
    };

    watch(
      () => route.params,
      (params) => {
        if (params.id) {
          getArtistDetail(Number(params.id));
        }
      }
    );

    onMounted(() => {
      if (route.params) {
        getArtistDetail(Number(route.params.id));
      }
    });

    return {
      tabs,
      currentTab,
      artistMVsPage,
      artistDetail,
      artistDesc,
      similarArtists,
      artistMVs,
      hotSongs,
      changeTab,
    };
  },
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
