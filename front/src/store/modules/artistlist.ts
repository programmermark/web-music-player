/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import {
  IArtist,
  IArtistResponse,
} from "@/views/home/components/main-content/views/artist-detail/interface";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import {
  IArtistListState,
  ISetArtistListPayload,
} from "./interface/artistlist";

const ModuleArtistList: Module<IArtistListState, IRootStateTypes> = {
  namespaced: true,
  state: (): IArtistListState => ({
    loading: false,
    artistList: [],
  }),
  mutations: {
    setLoading(state: IArtistListState, loading: boolean) {
      state.loading = loading;
    },
    /** 设置歌手列表 */
    setArtistList(state: IArtistListState, artistList: IArtist[]) {
      state.artistList = artistList;
    },
    /** 和当前歌手列表合并 */
    setConcatArtistList(state: IArtistListState, artistList: IArtist[]) {
      state.artistList = state.artistList.concat(artistList);
    },
  },
  actions: {
    /** 获取歌手列表 */
    async setArtistList(
      context: ActionContext<IArtistListState, IRootStateTypes>,
      payload: ISetArtistListPayload
    ) {
      context.commit("setLoading", true);
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
        context.commit("setArtistList", artistList);
      } else {
        context.commit("setConcatArtistList", artistList);
      }
      context.commit("setLoading", false);
    },
  },
  getters: {},
};

export default ModuleArtistList;
