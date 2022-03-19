import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { IArtist } from "@/views/home/views/find-music/views/artist-detail/interface";
import type { IListState } from "@/views/player/interface";
import type {
  IPlayerState,
  IPlaylistDetail,
  IPlaySong,
  ISetSongListByIdsPayload,
  ISetSongListPayload,
  ISongDetail,
} from "./interface/player";

/* 播放器状态管理 */
export const usePlayerStore = defineStore({
  id: "player",
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
    currentDuration: 0,
    currentTime: 0,
    currentSong: undefined,
    songList: [],
    isShowSongDetail: false,
  }),
  getters: {},
  actions: {
    setPlayBackType(playBackType: IListState) {
      const result = this.playBackTypeList.findIndex(
        (listState) => listState.listState === playBackType.listState
      );
      if (result !== -1) {
        const currentIndex =
          result === this.playBackTypeList.length - 1 ? 0 : result + 1;
        this.playBackType = this.playBackTypeList[currentIndex];
      } else {
        this.playBackType = this.playBackTypeList[0];
      }
    },
    /**
     * 调整音量
     * @param volume 音量，0-1之间的数字
     */
    setVolume(volume: number) {
      let volumeNum = 0;
      if (volume < 0) {
        volumeNum = 0;
      } else if (volume > 1) {
        volumeNum = 1;
      } else {
        volumeNum = volume;
      }
      this.volume = volumeNum;
    },
    setCurrentSongById(songId: number) {
      this.isPause = false;
      this.currentSong = this.songList.find((song) => song.id === songId);
    },
    setCurrentSongByName(songName: string) {
      this.isPause = false;
      this.currentSong = this.songList.find((song) => song.name === songName);
    },
    setCurrentSongByIndex(index: number) {
      this.isPause = false;
      this.currentSong = this.songList[index];
    },
    /** 根据id获取歌曲详情 */
    async setCurrentSong(id: number) {
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
      this.songList = songList;
      this.isPause = false;
      this.currentSong = songList[0];
    },
    async setSongListByIds(payload: ISetSongListByIdsPayload) {
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
      this.songList = songList;
      this.isPause = false;
      if (currentId) {
        const currentSong = songList.find((song) => song.id === currentId);
        this.currentSong = currentSong;
      } else {
        this.currentSong = songList[0];
      }
    },
    /** 根据id获取歌单的歌曲详情 */
    async setSongList(payload: ISetSongListPayload) {
      const { id, noSetCurrentSong = false } = payload;
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
      this.songList = songList;
      if (!noSetCurrentSong) {
        this.currentSong = songList[0];
        this.isPause = false;
      }
    },
    /** 清空播放列表 */
    async setSongListByAlbumId(albumId: number) {
      /** 根据专辑id获取专辑下的歌曲id，并设置第一首歌为当前播放的歌曲 */
      const albumDetailUrl = `${apis.albumDetail}?id=${albumId}`;
      const albumSongs = await http<ISongDetail[]>(
        { url: albumDetailUrl },
        "songs"
      );
      const albumSongIds = albumSongs.map((song) => song.id);
      const currentId = albumSongIds[0];
      const songIdStr = albumSongIds
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
      this.songList = songList;
      this.isPause = false;
      if (currentId) {
        const currentSong = songList.find((song) => song.id === currentId);
        this.currentSong = currentSong;
      } else {
        this.currentSong = songList[0];
      }
    },
  },
  persist: true,
});
