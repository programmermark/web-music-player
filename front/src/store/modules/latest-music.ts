/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { IAlbum } from "@/views/home/components/main-content/views/artist-detail/interface";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import {
  IAlbumsPayload,
  ILatestMusicState,
  ISong,
} from "./interface/latest-music";

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
    japaneseAlbums: [],
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
    setAllAlbums(state: ILatestMusicState, albums: IAlbum[]) {
      state.allAlbums = albums;
    },
    setChineseAlbums(state: ILatestMusicState, albums: IAlbum[]) {
      state.chineseAlbums = albums;
    },
    setEuropeAndAmericaAlbums(state: ILatestMusicState, albums: IAlbum[]) {
      state.europeAndAmericaAlbums = albums;
    },
    setKoreaAlbums(state: ILatestMusicState, albums: IAlbum[]) {
      state.koreaAlbums = albums;
    },
    setJapaneseAlbums(state: ILatestMusicState, albums: IAlbum[]) {
      state.japaneseAlbums = albums;
    },
  },
  actions: {
    /** 新歌速递：根据类型获取最新歌单 */
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
    /** 新歌速递: 根据类型获取最新专辑 */
    async setAlbumsByType(
      context: ActionContext<ILatestMusicState, IRootStateTypes>,
      payload: IAlbumsPayload
    ) {
      const { offset, limit, area, type } = payload;
      /** 根据id获取歌单详情 */
      const allAlbums = await http<IAlbum[]>(
        {
          url:
            apis.latestSongsTopAlbum +
            `?limit=${limit}&offset=${offset}&area=${area}&type=${type}`,
        },
        "albums"
      );
      const albumList = allAlbums.map((album) => ({
        id: album.id,
        name: album.name,
        alias: album.alias,
        picUrl: album.picUrl,
        publishTime: album.publishTime,
        artists: album.artists.map((artist) => ({
          id: artist.id,
          name: artist.name,
        })),
      }));
      if (area === "ALL") {
        context.commit("setAllAlbums", albumList);
      } else if (area === "ZH") {
        context.commit("setChineseAlbums", albumList);
      } else if (area === "EA") {
        context.commit("setEuropeAndAmericaAlbums", albumList);
      } else if (area === "KR") {
        context.commit("setKoreaAlbums", albumList);
      } else if (area === "JP") {
        context.commit("setJapaneseAlbums", albumList);
      }
    },
  },
  getters: {},
};

export default ModuleLatestMusic;
