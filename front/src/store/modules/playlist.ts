/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";

import { IPlaylist, IPlaylistState, IUserPlaylist } from "./interface/playlist";

const ModulePlaylist: Module<IPlaylistState, IRootStateTypes> = {
  namespaced: true,
  state: (): IPlaylistState => ({
    currentPlaylist: undefined,
    allPlayList: [],
  }),
  mutations: {
    setCurrentPlaylist(state: IPlaylistState, playlist: IPlaylist) {
      state.currentPlaylist = playlist;
    },
    setAllPlaylist(state: IPlaylistState, allList: IPlaylist[]) {
      state.allPlayList = allList;
    },
  },
  actions: {
    /** 根据用户id获取用户的歌单 */
    async setAllPlaylist(
      context: ActionContext<IPlaylistState, IRootStateTypes>,
      userId: number
    ) {
      /** 根据id获取歌单详情 */
      const allUserPlaylist = await http<IUserPlaylist[]>(
        { url: apis.userPlaylist + `?uid=${userId}` },
        "playlist"
      );
      const allPlaylist = allUserPlaylist.map((userPlaylist) => ({
        id: userPlaylist.id,
        name: userPlaylist.name,
        coverImgUrl: userPlaylist.coverImgUrl,
        isSelfCreated: userPlaylist.userId === userId,
      }));
      context.commit("setAllPlaylist", allPlaylist);
    },
  },
  getters: {},
};

export default ModulePlaylist;
