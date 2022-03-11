import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { IPlaylistState, IUserPlaylist } from "./interface/playlist";

/* 歌单状态管理  */
export const usePlaylistStore = defineStore({
  id: "playlist",
  state: (): IPlaylistState => ({
    currentPlaylist: undefined,
    allPlayList: [],
  }),
  getters: {},
  actions: {
    /** 根据用户id获取用户的歌单 */
    async setAllPlaylist(userId: number) {
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
      this.allPlayList = allPlaylist;
    },
  },
  persist: true,
});
