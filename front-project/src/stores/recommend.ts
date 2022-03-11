import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type {
  IBanner,
  IExclusiveBroadcast,
  ILatestMusic,
  ILatestMusicFormat,
  IRecommendDj,
  IRecommendMv,
  IRecommendSong,
  IRecommendState,
} from "./interface/recommend";

/* 个性推荐状态管理 */
export const useRecommendStore = defineStore({
  id: "recommend",
  state: (): IRecommendState => ({
    banners: [],
    recommendSongList: [],
    exclusiveBroadcastList: [],
    latestMusicList: [],
    recommendMvList: [],
    recommendDjList: [],
  }),
  getters: {},
  actions: {
    /** 获取轮播图列表 */
    async fetchBanner() {
      const banners = await http<IBanner[]>(
        { url: apis.personalBanner },
        "banners"
      );
      const bannerList: IBanner[] = banners.map((banner) => ({
        imageUrl: banner.imageUrl,
        targetId: banner.targetId,
        targetType: banner.targetType,
        exclusive: banner.exclusive,
        titleColor: banner.titleColor,
        typeTitle: banner.typeTitle,
        encodeId: banner.encodeId,
        scm: banner.scm,
      }));
      this.banners = bannerList;
    },
    /** 获取推荐歌单列表 */
    async fetchRecommendSongList() {
      const result = await http<IRecommendSong[]>(
        { url: apis.personalSongList },
        "result"
      );
      const songList: IRecommendSong[] = result.map((item) => ({
        id: item.id,
        type: item.type,
        name: item.name,
        copywriter: item.copywriter,
        picUrl: item.picUrl,
        canDislike: item.canDislike,
        trackNumberUpdateTime: item.trackNumberUpdateTime,
        playCount: item.playCount,
        trackCount: item.trackCount,
        highQuality: item.highQuality,
        alg: item.alg,
      }));
      this.recommendSongList = songList;
    },
    /** 获取独家放送列表 */
    async fetchBroadcastList() {
      const result = await http<IExclusiveBroadcast[]>(
        { url: apis.personalBroadcastList },
        "result"
      );
      const broadcastList: IExclusiveBroadcast[] = result.map((item) => ({
        id: item.id,
        type: item.type,
        name: item.name,
        sPicUrl: item.sPicUrl,
      }));
      this.exclusiveBroadcastList = broadcastList;
    },
    /** 获取最新音乐列表 */
    async fetchLatestSongList() {
      const result = await http<ILatestMusic[]>(
        { url: apis.personalNewSongList },
        "data"
      );
      /** 只获取前10条数据 */
      const musicList: ILatestMusicFormat[] = result
        .map((item) => ({
          id: item.id,
          mvId: item.mvid,
          name: item.album.name,
          aliasName: item.album.alias[0],
          picUrl: item.album.picUrl,
          artists: item.album.artists,
        }))
        .splice(0, 10);
      this.latestMusicList = musicList;
    },
    /** 获取推荐MV列表 */
    async fetchRecommendMv() {
      const result = await http<IRecommendMv[]>(
        { url: apis.personalMV },
        "result"
      );
      const mvList: IRecommendMv[] = result.map((item) => ({
        id: item.id,
        name: item.name,
        copywriter: item.copywriter,
        picUrl: item.picUrl,
        artists: item.artists.map((item) => ({
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
        })),
        playCount: item.playCount,
      }));
      this.recommendMvList = mvList;
    },
    /** 获取主播电台列表 */
    async fetchRecommendDj() {
      const result = await http<IRecommendDj[]>(
        { url: apis.personalDj },
        "data"
      );
      const djList: IRecommendDj[] = result.map((item) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        rcmdText: item.rcmdText,
      }));
      this.recommendDjList = djList;
    },
  },
  persist: true,
});
