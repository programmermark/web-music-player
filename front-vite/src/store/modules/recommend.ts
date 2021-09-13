/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import {
  IBanner,
  IExclusiveBroadcast,
  ILatestMusic,
  ILatestMusicFormat,
  IRecommendDj,
  IRecommendMv,
  IRecommendSong,
  IRecommendState,
} from "./interface/recommend";

const ModuleRecommend: Module<IRecommendState, IRootStateTypes> = {
  namespaced: true,
  state: (): IRecommendState => ({
    banners: [],
    recommendSongList: [],
    exclusiveBroadcastList: [],
    latestMusicList: [],
    recommendMvList: [],
    recommendDjList: [],
  }),
  mutations: {
    setBanners(state: IRecommendState, banners: IBanner[]) {
      state.banners = banners;
    },
    setRecommendSongList(
      state: IRecommendState,
      recommendSongList: IRecommendSong[]
    ) {
      state.recommendSongList = recommendSongList;
    },
    setExclusiveBroadcastList(
      state: IRecommendState,
      exclusiveBroadcastList: IExclusiveBroadcast[]
    ) {
      state.exclusiveBroadcastList = exclusiveBroadcastList;
    },
    setLatestMusicList(
      state: IRecommendState,
      latestMusicList: ILatestMusicFormat[]
    ) {
      state.latestMusicList = latestMusicList;
    },
    setRecommendMvList(
      state: IRecommendState,
      recommendMvList: IRecommendMv[]
    ) {
      state.recommendMvList = recommendMvList;
    },
    setRecommendDjList(
      state: IRecommendState,
      recommendDjList: IRecommendDj[]
    ) {
      state.recommendDjList = recommendDjList;
    },
  },
  actions: {
    /** 获取轮播图列表 */
    async fetchBanner(
      context: ActionContext<IRecommendState, IRootStateTypes>
    ) {
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
      context.commit("setBanners", bannerList);
    },
    /** 获取推荐歌单列表 */
    async fetchRecommendSongList(
      context: ActionContext<IRecommendState, IRootStateTypes>
    ) {
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
      context.commit("setRecommendSongList", songList);
    },
    /** 获取独家放送列表 */
    async fetchBroadcastList(
      context: ActionContext<IRecommendState, IRootStateTypes>
    ) {
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
      context.commit("setExclusiveBroadcastList", broadcastList);
    },
    /** 获取最新音乐列表 */
    async fetchLatestSongList(
      context: ActionContext<IRecommendState, IRootStateTypes>
    ) {
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
      context.commit("setLatestMusicList", musicList);
    },
    /** 获取推荐MV列表 */
    async fetchRecommendMv(
      context: ActionContext<IRecommendState, IRootStateTypes>
    ) {
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
      context.commit("setRecommendMvList", mvList);
    },
    /** 获取主播电台列表 */
    async fetchRecommendDj(
      context: ActionContext<IRecommendState, IRootStateTypes>
    ) {
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
      context.commit("setRecommendDjList", djList);
    },
  },
  getters: {},
};

export default ModuleRecommend;
