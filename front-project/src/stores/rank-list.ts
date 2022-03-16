import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type {
  IArtistRank,
  IRankListResponse,
  IRankListState,
  ISingerRankListResponse,
  ISongRank,
  ISongRankOfficial,
} from "./interface/ranklist";

/* 歌曲排行榜状态管理 */
export const useRankListStore = defineStore({
  id: "rank-list",
  state: (): IRankListState => ({
    loading: false,
    artistRank: undefined,
    songRankList: [],
    songRankListOfficial: [],
    songRankListGlobal: [],
  }),
  getters: {},
  actions: {
    /** 获取并设置所有排行榜 */
    async setAllRankList() {
      this.loading = true;
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
      this.songRankList = songRankList;

      const songRankListGlobal: ISongRank[] = songRankList.filter(
        (rank, index) => index >= 4
      );
      this.songRankListGlobal = songRankListGlobal;

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

      this.songRankListOfficial = songRankListOfficial;

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
      this.artistRank = artistRank;
      this.loading = false;
    },
  },
  persist: true,
});
