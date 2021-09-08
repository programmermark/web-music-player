<template>
  <div class="max-width-1100 width-100 pdl-30 pdr-30 box-sizing-border-box">
    <!-- 轮播 -->
    <el-carousel
      class="carousel-wrapper"
      :interval="5000"
      type="card"
      height="200px"
    >
      <el-carousel-item v-for="banner in banners" :key="banner.targetId">
        <div
          class="banner-item"
          @click="playSongById(banner.targetId)"
          title="点击播放歌曲"
        >
          <img
            :src="`${banner.imageUrl}?param=540y200`"
            :alt="banner.typeTitle"
          />
          <span :style="{ backgroundColor: banner.titleColor }">{{
            banner.typeTitle
          }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <link-title url="/playlist" title="推荐歌单" />
    <div class="wrapper">
      <recommend-song-special-card url="" />
      <recommend-song-card
        v-for="song in recommendSongList"
        :key="song.id"
        :id="song.id"
        :title="song.name"
        :imgUrl="song.picUrl"
        :playCount="song.playCount"
        url=""
      />
    </div>
    <!-- 独家放送 -->
    <link-title url="/exclusive-broadcast" title="独家放送" />
    <div class="wrapper">
      <exclusive-broadcast-card
        v-for="broadcast in exclusiveBroadcastList"
        :key="broadcast.id"
        :id="broadcast.id"
        :imgUrl="broadcast.sPicUrl"
        :title="broadcast.name"
      />
    </div>
    <!-- 最新音乐 -->
    <link-title url="/latestMusic" title="最新音乐" />
    <div class="wrapper pd-40 card-move">
      <latest-music-card
        v-for="(latestMusic, index) in latestMusicList"
        :key="latestMusic.id"
        :id="latestMusic.id"
        :mvId="latestMusic.mvId"
        :orderNumber="index + 1"
        :songName="latestMusic.name"
        :aliasName="latestMusic.aliasName"
        :coverImg="latestMusic.picUrl"
        :artists="latestMusic.artists"
      />
    </div>
    <!-- 推荐MV -->
    <link-title url="" title="推荐MV" />
    <div class="wrapper pd-40">
      <recommend-mv-card
        v-for="recommendMv in recommendMvList"
        :key="recommendMv.id"
        :id="recommendMv.id"
        :name="recommendMv.name"
        :subTitle="recommendMv.copywriter"
        :imgUrl="recommendMv.picUrl"
        :playCount="recommendMv.playCount"
        :artists="recommendMv.artists"
      />
    </div>
    <!-- 主播电台 -->
    <link-title url="" title="主播电台" />
    <div class="wrapper pd-100 card-move">
      <recommend-dj-card
        v-for="recommendDj in recommendDjList"
        :key="recommendDj.id"
        :id="recommendDj.id"
        :singer="recommendDj.name"
        :imgUrl="recommendDj.picUrl"
        :recommendDesc="recommendDj.rcmdText"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import LinkTitle from "./components/link-title/index.vue";
import RecommendSongCard from "./components/recommend-song-card/index.vue";
import RecommendSongSpecialCard from "./components/recommend-song-special-card/index.vue";
import ExclusiveBroadcastCard from "./components/exclusive-broadcast-card/index.vue";
import LatestMusicCard from "./components/latest-music-card/index.vue";
import RecommendMvCard from "./components/recommend-mv-card/index.vue";
import RecommendDjCard from "./components/recommend-dj-card/index.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "PersonalRecommend",
  components: {
    LinkTitle,
    RecommendSongSpecialCard,
    RecommendSongCard,
    ExclusiveBroadcastCard,
    LatestMusicCard,
    RecommendMvCard,
    RecommendDjCard,
  },
  setup() {
    const store = useStore();

    const banners = computed(() => store.state.recommend.banners);
    const recommendSongList = computed(
      () => store.state.recommend.recommendSongList
    );
    const exclusiveBroadcastList = computed(
      () => store.state.recommend.exclusiveBroadcastList
    );
    const latestMusicList = computed(
      () => store.state.recommend.latestMusicList
    );
    const recommendMvList = computed(
      () => store.state.recommend.recommendMvList
    );
    const recommendDjList = computed(
      () => store.state.recommend.recommendDjList
    );

    const fetchBanner = () => {
      store.dispatch("recommend/fetchBanner");
    };

    const fetchRecommendSongList = () => {
      store.dispatch("recommend/fetchRecommendSongList");
    };

    const fetchBroadcastList = () => {
      store.dispatch("recommend/fetchBroadcastList");
    };

    const fetchLatestSongList = async () => {
      store.dispatch("recommend/fetchLatestSongList");
    };

    const fetchRecommendMv = async () => {
      store.dispatch("recommend/fetchRecommendMv");
    };

    const fetchRecommendDj = async () => {
      store.dispatch("recommend/fetchRecommendDj");
    };

    /** 播放一首歌曲 */
    const playSongById = (id: number) => {
      store.dispatch("player/setCurrentSong", id);
    };

    onMounted(() => {
      fetchBanner();
      fetchRecommendSongList();
      fetchBroadcastList();
      fetchLatestSongList();
      fetchRecommendMv();
      fetchRecommendDj();
    });

    return {
      banners,
      recommendSongList,
      exclusiveBroadcastList,
      latestMusicList,
      recommendMvList,
      recommendDjList,
      playSongById,
    };
  },
});
</script>

<style lang="scss" scoped>
/** 轮播banner */
.carousel-wrapper {
  margin: 20px 0;
  :deep(.el-carousel__item--card) {
    width: 540px;
    height: 200px;
  }
  .banner-item {
    width: 100%;
    height: 100%;
    display: flex;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
    & > span {
      font-size: 14px;
      font-weight: bold;
      position: absolute;
      right: 0;
      bottom: 0;
      color: white;
      padding: 4px 8px;
      border-top-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.pd-40 {
  padding-bottom: 40px;
}
.pd-100 {
  padding-bottom: 100px;
}
.card-move {
  position: relative;
  left: -10px;
}
</style>
