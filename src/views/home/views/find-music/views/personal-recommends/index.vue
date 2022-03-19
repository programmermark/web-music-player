<template>
  <div class="max-w-[1100px] w-full pl-[30px] pr-[30px] box-border">
    <!-- 轮播 -->
    <el-carousel class="carousel-wrapper" :interval="5000" type="card" height="200px">
      <el-carousel-item v-for="banner in banners" :key="banner.targetId">
        <div
          class="banner-item"
          @click="playSongById(banner.targetId)"
          title="点击播放歌曲"
        >
          <img :src="`${banner.imageUrl}?param=540y200`" :alt="banner.typeTitle" />
          <span :style="{ backgroundColor: banner.titleColor }">{{
            banner.typeTitle
          }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <LinkTitle url="/playlist" title="推荐歌单" />
    <div class="wrapper">
      <RecommendSongSpecialCard url="/daily-recommend-songs" />
      <RecommendSongCard
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
    <LinkTitle url="/exclusive-broadcast" title="独家放送" />
    <div class="wrapper">
      <ExclusiveBroadcastCard
        v-for="broadcast in exclusiveBroadcastList"
        :key="broadcast.id"
        :id="broadcast.id"
        :imgUrl="broadcast.sPicUrl"
        :title="broadcast.name"
      />
    </div>
    <!-- 最新音乐 -->
    <LinkTitle url="/latestMusic" title="最新音乐" />
    <div class="wrapper pd-40 card-move">
      <LatestMusicCard
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
    <LinkTitle url="" title="推荐MV" />
    <div class="wrapper pd-40">
      <RecommendMvCard
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
    <LinkTitle url="" title="主播电台" />
    <div class="wrapper pd-100 card-move">
      <RecommendDjCard
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

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import LinkTitle from "./components/link-title/index.vue";
import RecommendSongCard from "./components/recommend-song-card/index.vue";
import RecommendSongSpecialCard from "./components/recommend-song-special-card/index.vue";
import ExclusiveBroadcastCard from "./components/exclusive-broadcast-card/index.vue";
import LatestMusicCard from "./components/latest-music-card/index.vue";
import RecommendMvCard from "./components/recommend-mv-card/index.vue";
import RecommendDjCard from "./components/recommend-dj-card/index.vue";
import { useRecommendStore } from "@/stores/recommend";
import { usePlayerStore } from "@/stores/player";

const recommendStore = useRecommendStore();
const playerStore = usePlayerStore();

const banners = computed(() => recommendStore.banners);
const recommendSongList = computed(() => recommendStore.recommendSongList);
const exclusiveBroadcastList = computed(() => recommendStore.exclusiveBroadcastList);
const latestMusicList = computed(() => recommendStore.latestMusicList);
const recommendMvList = computed(() => recommendStore.recommendMvList);
const recommendDjList = computed(() => recommendStore.recommendDjList);

const fetchBanner = () => {
  recommendStore.fetchBanner();
};

const fetchRecommendSongList = () => {
  recommendStore.fetchRecommendSongList();
};

const fetchBroadcastList = () => {
  recommendStore.fetchBroadcastList();
};

const fetchLatestSongList = async () => {
  recommendStore.fetchLatestSongList();
};

const fetchRecommendMv = async () => {
  recommendStore.fetchRecommendMv();
};

const fetchRecommendDj = async () => {
  recommendStore.fetchRecommendDj();
};

/** 播放一首歌曲 */
const playSongById = (id: number) => {
  playerStore.setCurrentSong(id);
};

onMounted(() => {
  fetchBanner();
  fetchRecommendSongList();
  fetchBroadcastList();
  fetchLatestSongList();
  fetchRecommendMv();
  fetchRecommendDj();
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
