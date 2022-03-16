import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { IAlbum } from "@/views/home/views/find-music/views/artist-detail/interface";
import type {
  IAlbumsMutation,
  IAlbumsPayload,
  ILatestMusicState,
  ISong,
} from "./interface/latest-music";

/* 最新音乐 */
export const useLatestMusicStore = defineStore({
  id: "latest-music",
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
  getters: {},
  actions: {
    setAllAlbums(payload: IAlbumsMutation) {
      const { albums, isConcat = false } = payload;
      if (isConcat) {
        this.allAlbums = this.allAlbums.concat(albums);
      } else {
        this.allAlbums = albums;
      }
    },
    setChineseAlbums(payload: IAlbumsMutation) {
      const { albums, isConcat = false } = payload;
      if (isConcat) {
        this.chineseAlbums = this.chineseAlbums.concat(albums);
      } else {
        this.chineseAlbums = albums;
      }
    },
    setEuropeAndAmericaAlbums(payload: IAlbumsMutation) {
      const { albums, isConcat = false } = payload;
      if (isConcat) {
        this.europeAndAmericaAlbums =
          this.europeAndAmericaAlbums.concat(albums);
      } else {
        this.europeAndAmericaAlbums = albums;
      }
    },
    setKoreaAlbums(payload: IAlbumsMutation) {
      const { albums, isConcat = false } = payload;
      if (isConcat) {
        this.koreaAlbums = this.koreaAlbums.concat(albums);
      } else {
        this.koreaAlbums = albums;
      }
    },
    setJapaneseAlbums(payload: IAlbumsMutation) {
      const { albums, isConcat = false } = payload;
      if (isConcat) {
        this.japaneseAlbums = this.japaneseAlbums.concat(albums);
      } else {
        this.japaneseAlbums = albums;
      }
    },
    /** 新歌速递：根据类型获取最新歌单 */
    async setSongsByType(type: number) {
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
          cover: item.cover,
        })),
      }));
      if (type === 0) {
        this.allSongs = songList;
      } else if (type === 7) {
        this.chineseSongs = songList;
      } else if (type === 96) {
        this.europeAndAmericaSongs = songList;
      } else if (type === 8) {
        this, (this.koreaSongs = songList);
      } else if (type === 16) {
        this.japaneseSongs = songList;
      }
    },
    /** 新歌速递: 根据类型获取最新专辑 */
    async setAlbumsByType(payload: IAlbumsPayload) {
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
        artists: (album.artists || []).map((artist) => ({
          id: artist.id,
          name: artist.name,
        })),
      }));
      if (offset === 0) {
        const albumPayload = { albums: albumList, isConcat: false };
        if (area === "ALL") {
          this.setAllAlbums(albumPayload);
        } else if (area === "ZH") {
          this.setChineseAlbums(albumPayload);
        } else if (area === "EA") {
          this.setEuropeAndAmericaAlbums(albumPayload);
        } else if (area === "KR") {
          this.setKoreaAlbums(albumPayload);
        } else if (area === "JP") {
          this.setJapaneseAlbums(albumPayload);
        }
      } else {
        const albumPayload = { albums: albumList, isConcat: true };
        if (area === "ALL") {
          this.setAllAlbums(albumPayload);
        } else if (area === "ZH") {
          this.setChineseAlbums(albumPayload);
        } else if (area === "EA") {
          this.setEuropeAndAmericaAlbums(albumPayload);
        } else if (area === "KR") {
          this.setKoreaAlbums(albumPayload);
        } else if (area === "JP") {
          this.setJapaneseAlbums(albumPayload);
        }
      }
    },
  },
  persist: true,
});
