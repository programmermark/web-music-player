<template>
  <div>
    <!-- 轮播 -->
    <el-carousel
      class="carousel-wrapper"
      :interval="5000"
      type="card"
      height="200px"
    >
      <el-carousel-item v-for="banner in banners" :key="banner.targetId">
        <router-link class="banner-item" to="/">
          <img :src="banner.imageUrl" :alt="banner.typeTitle" />
          <span :style="{ backgroundColor: banner.titleColor }">{{
            banner.typeTitle
          }}</span>
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <link-title url="" title="推荐歌单" />
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
    <link-title url="" title="独家放送" />
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
    <link-title url="" title="最新音乐" />
    <div class="wrapper mt-40 card-move">
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
    <div class="wrapper mt-40">
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
    <div class="wrapper mt-100 card-move">
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
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import LinkTitle from "./components/link-title/index.vue";
import RecommendSongCard from "./components/recommend-song-card/index.vue";
import RecommendSongSpecialCard from "./components/recommend-song-special-card/index.vue";
import ExclusiveBroadcastCard from "./components/exclusive-broadcast-card/index.vue";
import LatestMusicCard from "./components/latest-music-card/index.vue";
import RecommendMvCard from "./components/recommend-mv-card/index.vue";
import RecommendDjCard from "./components/recommend-dj-card/index.vue";
import { http } from "@/common/js/http";
import { apis } from "@/api";
import { ILatestMusicFormat, IState } from "./interface";
import { IBanner } from "./interface/banner";
import { IRecommendSong } from "./interface/recommendSongList";
import { IExclusiveBroadcast } from "./interface/exclusiveBroadcastCard";
import { ILatestMusic } from "./interface/latestMusicCard";
import { IRecommendMv } from "./interface/recommendMvCard";
import { IRecommendDj } from "./interface/recommend-dj-card";

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
    const state = reactive<IState>({
      banners: [],
      recommendSongList: [],
      exclusiveBroadcastList: [],
      latestMusicList: [],
      recommendMvList: [],
      recommendDjList: [],
    });

    /**
     * 获取轮播图列表
     */
    const fetchBanner = async () => {
      const result = await http<IBanner[]>(
        {
          url: apis.personalBanner,
        },
        "banners"
      );
      state.banners = result;
    };

    const fetchSongList = async () => {
      const result = await http<IRecommendSong[]>(
        { url: apis.personalSongList },
        "result"
      );
      state.recommendSongList = result;
    };

    const fetchBroadcastList = async () => {
      const result = await http<IExclusiveBroadcast[]>(
        { url: apis.personalBroadcastList },
        "result"
      );
      state.exclusiveBroadcastList = result;
    };

    const fetchNewSongList = async () => {
      const result = await http<ILatestMusic[]>(
        { url: apis.personalNewSongList },
        "data"
      );
      const list = result.map((item) => {
        let latestMuisc: ILatestMusicFormat = {
          id: item.album.id,
          mvId: item.mvid,
          name: item.album.name,
          aliasName: item.album.alias[0],
          picUrl: item.album.picUrl,
          artists: item.album.artists,
        };
        return latestMuisc;
      });
      /** 只获取前10条数据 */
      state.latestMusicList = list.splice(0, 10);
    };

    const fetchRecommendMv = async () => {
      const result = await http<IRecommendMv[]>(
        { url: apis.personalMV },
        "result"
      );
      state.recommendMvList = result;
    };

    const fetchRecommendDj = async () => {
      const result = await http<IRecommendDj[]>(
        { url: apis.personalDj },
        "data"
      );
      state.recommendDjList = result;
    };

    onMounted(() => {
      fetchBanner();
      fetchSongList();
      fetchBroadcastList();
      fetchNewSongList();
      fetchRecommendMv();
      fetchRecommendDj();
    });

    return {
      ...toRefs(state),
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
.mt-40 {
  margin-bottom: 40px;
}
.mt-100 {
  margin-bottom: 100px;
}
.card-move {
  position: relative;
  left: -10px;
}
</style>
