/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import {
  IPlayerState,
  IPlaylistDetail,
  IPlaySong,
  ISongDetail,
} from "./interface/player";

const ModulePlayer: Module<IPlayerState, IRootStateTypes> = {
  namespaced: true,
  state: (): IPlayerState => ({
    currentSong: undefined,
    songList: [],
  }),
  mutations: {
    setCurrentSong(state: IPlayerState, song: IPlaySong) {
      state.currentSong = song;
    },
    setSongList(state: IPlayerState, list: IPlaySong[]) {
      state.songList = list;
    },
  },
  actions: {
    /** 根据id获取歌曲详情 */
    async setCurrentSong(
      context: ActionContext<IPlayerState, IRootStateTypes>,
      id: number
    ) {
      const songDetailUrl = `${apis.songDetail}?ids=${id}`;
      const songs = await http<ISongDetail[]>({ url: songDetailUrl }, "songs");
      const songList: IPlaySong[] = songs.map((song) => ({
        id: song.id,
        name: song.name,
        coverImg: song.al.picUrl,
        artists: song.ar.map((item) => ({ id: item.id, name: item.name })),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
      }));
      context.commit("setSongList", songList);
      context.commit("setCurrentSong", songList[0]);
    },
    /** 根据id获取歌单的歌曲详情 */
    async setSongList(
      context: ActionContext<IPlayerState, IRootStateTypes>,
      id: number
    ) {
      /** 根据id获取歌单详情 */
      const playlist = await http<IPlaylistDetail>(
        { url: apis.playlistDetail + `?id=${id}` },
        "playlist"
      );
      const songIdStr = playlist.trackIds
        .map((item) => String(item.id))
        .reduce((initValue, currentValue) => initValue + "," + currentValue);
      const songDetailUrl = `${apis.songDetail}?ids=${songIdStr}`;
      /** 根据id数组获取歌曲详情 */
      const songs = await http<ISongDetail[]>({ url: songDetailUrl }, "songs");
      const songList: IPlaySong[] = songs.map((song) => ({
        id: song.id,
        name: song.name,
        coverImg: song.al.picUrl,
        artists: song.ar.map((item) => ({ id: item.id, name: item.name })),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
        duration: Math.floor((song.dt || 0) / 1000),
      }));
      context.commit("setSongList", songList);
      context.commit("setCurrentSong", songList[0]);
    },
  },
  getters: {},
};

export default ModulePlayer;
