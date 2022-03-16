import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type {
  IArtist,
  IArtistResponse,
} from "@/views/home/views/find-music/views/artist-detail/interface";
import type {
  IArtistListState,
  ISetArtistListPayload,
} from "./interface/artistlist";

/* 歌手列表 */
export const useArtistListStore = defineStore({
  id: "artist-list",
  state: (): IArtistListState => ({
    loading: false,
    artistList: [],
  }),
  getters: {},
  actions: {
    /** 获取歌手列表 */
    async setArtistList(payload: ISetArtistListPayload) {
      this.loading = true;
      const { filters, offset, limit } = payload;
      const { currentLanguageCat, currentTypeCat, currentWordCat } = filters;
      /** 获取所有歌单榜单 */
      const url = `${apis.artistList}?area=${currentLanguageCat}&type=${currentTypeCat}&initial=${currentWordCat}&limit=${limit}&offset=${offset}`;
      const list = await http<IArtistResponse[]>(
        {
          url,
        },
        "artists"
      );
      const artistList: IArtist[] = list.map((artist) => ({
        id: artist.id,
        name: artist.name,
        cover: artist.picUrl,
      }));
      if (offset === 0) {
        this.artistList = artistList;
      } else {
        this.artistList = this.artistList.concat(artistList);
      }
      this.loading = false;
    },
  },
  persist: true,
});
