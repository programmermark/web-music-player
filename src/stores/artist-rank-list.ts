import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type {
  IArtistCard,
  IArtistRankListResponse,
  IArtistRankListState,
} from "./interface/artist-rank-list";

/* 歌手排行榜 */
export const useArtistRankListStore = defineStore({
  id: "artist-rank-list",
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
  getters: {},
  actions: {
    /** 获取并设置所有排行榜 */
    async setArtistList(type: number) {
      this.loading = true;
      this.currentTab = type;
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
        trans: artist.trans,
        score: artist.score,
        picUrl: artist.picUrl,
        lastRank: artist.lastRank,
      }));
      this.artistList = formatList;
      this.loading = false;
    },
  },
  persist: true,
});
