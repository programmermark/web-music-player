/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import {
  IArtistCard,
  IArtistRankListResponse,
  IArtistRankListState,
} from "./interface/artist-rank-list";

const ModuleArtistRankList: Module<IArtistRankListState, IRootStateTypes> = {
  namespaced: true,
  state: (): IArtistRankListState => ({
    loading: false,
    tabs: [
      { label: "华语", value: 1 },
      { label: "欧美", value: 2 },
      { label: "韩国", value: 3 },
      { label: "日本", value: 4 },
    ],
    currentTab: 1,
    artistList: [],
  }),
  mutations: {
    setLoading(state: IArtistRankListState, loading: boolean) {
      state.loading = loading;
    },
    /** 设置当前选中的区域 */
    setCurrentTab(state: IArtistRankListState, tabValue: number) {
      state.currentTab = tabValue;
    },
    /** 设置排行榜中的所有歌手 */
    setArtistList(state: IArtistRankListState, artistList: IArtistCard[]) {
      state.artistList = artistList;
    },
  },
  actions: {
    /** 获取并设置所有排行榜 */
    async setArtistList(
      context: ActionContext<IArtistRankListState, IRootStateTypes>,
      type: number
    ) {
      context.commit("setLoading", true);
      context.commit("setCurrentTab", type);
      /** 获取所有歌单榜单 */
      const { artists: list } = await http<IArtistRankListResponse>(
        {
          url: `${apis.artistRankList}?type=${type}`,
        },
        "list"
      );
      const formatList: IArtistCard[] = list.map((artist) => ({
        id: artist.id,
        name: artist.name,
        score: artist.score,
        picUrl: artist.picUrl,
        lastRank: artist.lastRank,
      }));
      context.commit("setArtistList", formatList);
      context.commit("setLoading", false);
    },
  },
  getters: {},
};

export default ModuleArtistRankList;
