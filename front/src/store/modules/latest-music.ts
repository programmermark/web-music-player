/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import { ILatestMusicState, ISong } from "./interface/latest-music";

const ModuleLatestMusic: Module<ILatestMusicState, IRootStateTypes> = {
  namespaced: true,
  state: (): ILatestMusicState => ({
    /** 新歌速递 */
    allSongs: [],
    chineseSongs: [],
    europeAndAmericaSongs: [],
    koreaSongs: [],
    japaneseSongs: [],
    /** 新碟上架 */
    allAlbums: [],
    chineseAlbums: [],
    europeAndAmericaAlbums: [],
    koreaAlbums: [],
    japanAlbums: [],
  }),
  mutations: {
    setAllSongs(state: ILatestMusicState, songs: ISong[]) {
      state.allSongs = songs;
    },
    setChineseSongs(state: ILatestMusicState, songs: ISong[]) {
      state.chineseSongs = songs;
    },
    setEuropeAndAmericaSongs(state: ILatestMusicState, songs: ISong[]) {
      state.europeAndAmericaSongs = songs;
    },
    setKoreaSongs(state: ILatestMusicState, songs: ISong[]) {
      state.koreaSongs = songs;
    },
    setJapaneseSongs(state: ILatestMusicState, songs: ISong[]) {
      state.japaneseSongs = songs;
    },
  },
  actions: {
    /** 根据类型获取新歌速递获取用户的歌单 */
    async setSongsByType(
      context: ActionContext<ILatestMusicState, IRootStateTypes>,
      type: number
    ) {
      /** 根据id获取歌单详情 */
      const allSongs = await http<ISong[]>(
        { url: apis.latestSongsTopSong + `?type=${type}` },
        "data"
      );
      const songList = allSongs.map((songs) => ({
        id: songs.id,
        name: songs.name,
        alias: songs.alias,
        duration: songs.duration,
        mp3Url: songs.mp3Url,
        album: {
          id: songs.album.id,
          name: songs.album.name,
          picUrl: songs.album.picUrl,
          publishTime: songs.album.publishTime,
        },
        artists: songs.artists.map((item) => ({
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
        })),
      }));
      if (type === 0) {
        context.commit("setAllSongs", songList);
      } else if (type === 7) {
        context.commit("setChineseSongs", songList);
      } else if (type === 96) {
        context.commit("setEuropeAndAmericaSongs", songList);
      } else if (type === 8) {
        context.commit("setKoreaSongs", songList);
      } else if (type === 16) {
        context.commit("setJapaneseSongs", songList);
      }
    },
  },
  getters: {},
};

export default ModuleLatestMusic;
