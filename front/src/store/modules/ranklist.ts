/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";

import {
  IArtistRank,
  IRankListResponse,
  IRankListState,
  ISingerRankListResponse,
  ISongRank,
  ISongRankOfficial,
} from "./interface/ranklist";

const ModuleRankList: Module<IRankListState, IRootStateTypes> = {
  namespaced: true,
  state: (): IRankListState => ({
    loading: false,
    artistRank: undefined,
    songRankList: [],
    songRankListOfficial: [],
    songRankListGlobal: [],
  }),
  mutations: {
    setLoading(state: IRankListState, loading: boolean) {
      state.loading = loading;
    },
    /** 设置歌手榜单 */
    setArtistRank(state: IRankListState, artistRank: IArtistRank) {
      state.artistRank = artistRank;
    },
    setSongRankList(state: IRankListState, songRankList: ISongRank[]) {
      state.songRankList = songRankList;
    },
    setSongRankListOfficial(
      state: IRankListState,
      songRankListOfficial: ISongRankOfficial[]
    ) {
      state.songRankListOfficial = songRankListOfficial;
    },
    setSongRankListGlobal(state: IRankListState, songRankList: ISongRank[]) {
      state.songRankListGlobal = songRankList;
    },
  },
  actions: {
    /** 获取并设置所有排行榜 */
    async setAllRankList(
      context: ActionContext<IRankListState, IRootStateTypes>
    ) {
      context.commit("setLoading", true);
      /** 获取所有歌单榜单 */
      const { artistToplist, list: allRankList } =
        await http<IRankListResponse>({
          url: apis.rankListTopList,
        });
      const songRankList: ISongRank[] = allRankList.map((rank) => ({
        id: rank.id,
        name: rank.name,
        coverImgUrl: rank.coverImgUrl,
        description: rank.description,
        trackNumberUpdateTime: rank.trackNumberUpdateTime,
        playCount: rank.playCount,
      }));
      context.commit("setSongRankList", songRankList);

      const songRankListGlobal: ISongRank[] = songRankList.filter(
        (rank, index) => index >= 4
      );
      context.commit("setSongRankListGlobal", songRankListGlobal);

      const songRankListOfficial: ISongRankOfficial[] = allRankList
        .filter((rank, index) => index < 4)
        .map((rank) => ({
          id: rank.id,
          name: rank.name,
          coverImgUrl: rank.coverImgUrl,
          description: rank.description,
          trackNumberUpdateTime: rank.trackNumberUpdateTime,
          playCount: rank.playCount,
          songList: rank.tracks.map((track) => ({
            name: track.first,
            artistStr: track.second,
          })),
        }));
      context.commit("setSongRankListOfficial", songRankListOfficial);

      /** 获取所有歌手榜单 */
      const { artists } = await http<ISingerRankListResponse>(
        { url: apis.rankListArtistList },
        "list"
      );
      const artistRankList = artists
        .map((artist) => ({
          id: artist.id,
          name: artist.name,
          picUrl: artist.picUrl,
          score: artist.score,
          lastRank: artist.lastRank,
        }))
        .filter((artist, index) => index < 3);
      const artistRank: IArtistRank = {
        ...artistToplist,
        name: artistToplist.name,
        coverUrl: artistToplist.coverUrl,
        updateTime: Date.now(),
        artistList: artistRankList,
      };
      context.commit("setArtistRank", artistRank);
      context.commit("setLoading", false);
    },
  },
  getters: {},
};

export default ModuleRankList;
