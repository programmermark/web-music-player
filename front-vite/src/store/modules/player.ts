/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { IArtist } from "@/views/home/components/main-content/views/artist-detail/interface";
import { IListState } from "@/views/home/components/player/interface";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import {
  IPlayerState,
  IPlaylistDetail,
  IPlaySong,
  ISetSongListByIdsPayload,
  ISetSongListPayload,
  ISongDetail,
} from "./interface/player";

const ModulePlayer: Module<IPlayerState, IRootStateTypes> = {
  namespaced: true,
  state: (): IPlayerState => ({
    isPause: true /** 歌曲是否已暂停 */,
    playBackType: {
      listState: "in-order",
      listStateDesc: "顺序播放",
      listStateIcon: "in-order",
    },
    playBackTypeList: [
      {
        listState: "in-order",
        listStateDesc: "顺序播放",
        listStateIcon: "in-order",
      },
      {
        listState: "list-loop",
        listStateDesc: "列表循环",
        listStateIcon: "list-loop",
      },
      {
        listState: "single-cycle",
        listStateDesc: "单曲循环",
        listStateIcon: "single-cycle",
      },
      {
        listState: "shuffle",
        listStateDesc: "随机播放",
        listStateIcon: "shuffle",
      },
    ],
    volume: 0.6,
    currentTime: 0,
    currentSong: undefined,
    songList: [],
  }),
  mutations: {
    setIsPause(state: IPlayerState, isPause: boolean) {
      state.isPause = isPause;
    },
    setPlayBackType(state: IPlayerState, playBackType: IListState) {
      const result = state.playBackTypeList.findIndex(
        (listState) => listState.listState === playBackType.listState
      );
      if (result !== -1) {
        const currentIndex =
          result === state.playBackTypeList.length - 1 ? 0 : result + 1;
        state.playBackType = state.playBackTypeList[currentIndex];
      } else {
        state.playBackType = state.playBackTypeList[0];
      }
    },
    /**
     * 调整音量
     * @param volume 音量，0-1之间的数字
     */
    setVolume(state: IPlayerState, volume: number) {
      let volumeNum = 0;
      if (volume < 0) {
        volumeNum = 0;
      } else if (volume > 1) {
        volumeNum = 1;
      } else {
        volumeNum = volume;
      }
      state.volume = volumeNum;
    },
    /** 设置当前时间 */
    setCurrentTime(state: IPlayerState, time: number) {
      state.currentTime = time;
    },
    setCurrentSong(state: IPlayerState, song: IPlaySong | undefined) {
      state.isPause = false;
      state.currentSong = song;
    },
    setCurrentSongById(state: IPlayerState, songId: number) {
      state.isPause = false;
      state.currentSong = state.songList.find((song) => song.id === songId);
    },
    setCurrentSongByName(state: IPlayerState, songName: string) {
      state.isPause = false;
      state.currentSong = state.songList.find((song) => song.name === songName);
    },
    setCurrentSongByIndex(state: IPlayerState, index: number) {
      state.isPause = false;
      state.currentSong = state.songList[index];
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
        subName: song.alia[0],
        coverImg: song.al.picUrl,
        album: {
          id: song.al.id,
          name: song.al.name,
          picUrl: song.al.picUrl,
        },
        artists: song.ar.map(
          (item) => ({ id: item.id, name: item.name } as IArtist)
        ),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
      }));
      context.commit("setSongList", songList);
      context.commit("setCurrentSong", songList[0]);
    },
    async setSongListByIds(
      context: ActionContext<IPlayerState, IRootStateTypes>,
      payload: ISetSongListByIdsPayload
    ) {
      const { ids, currentId } = payload;
      const songIdStr = ids
        .map((id) => String(id))
        .reduce((initValue, currentValue) => initValue + "," + currentValue);
      const songDetailUrl = `${apis.songDetail}?ids=${songIdStr}`;
      /** 根据id数组获取歌曲详情 */
      const songs = await http<ISongDetail[]>({ url: songDetailUrl }, "songs");
      const songList: IPlaySong[] = songs.map((song) => ({
        id: song.id,
        name: song.name,
        subName: song.alia[0],
        coverImg: song.al.picUrl,
        album: {
          id: song.al.id,
          name: song.al.name,
          picUrl: song.al.picUrl,
        },
        artists: song.ar.map(
          (item) => ({ id: item.id, name: item.name } as IArtist)
        ),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
        duration: Math.floor((song.dt || 0) / 1000),
      }));
      context.commit("setSongList", songList);
      if (currentId) {
        const currentSong = songList.find((song) => song.id === currentId);
        context.commit("setCurrentSong", currentSong);
      } else {
        context.commit("setCurrentSong", songList[0]);
      }
    },
    /** 根据id获取歌单的歌曲详情 */
    async setSongList(
      context: ActionContext<IPlayerState, IRootStateTypes>,
      payload: ISetSongListPayload
    ) {
      const { id, noSetCurrentSong } = payload;
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
        subName: song.alia[0],
        coverImg: song.al.picUrl,
        album: {
          id: song.al.id,
          name: song.al.name,
          picUrl: song.al.picUrl,
        },
        artists: song.ar.map(
          (item) => ({ id: item.id, name: item.name } as IArtist)
        ),
        songUrl: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
        duration: Math.floor((song.dt || 0) / 1000),
      }));
      context.commit("setSongList", songList);
      if (!noSetCurrentSong) {
        context.commit("setCurrentSong", songList[0]);
      }
    },
    /** 清空播放列表 */
  },
  getters: {},
};

export default ModulePlayer;
