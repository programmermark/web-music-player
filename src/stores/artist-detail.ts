import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type {
  IArtistDescIntroduction,
  IArtistDetail,
  IArtistDetailResponse,
  IArtistDetailState,
  IArtistMVPayload,
  IArtistMVResponse,
  IHotSong,
  ISimilarArtist,
} from "./interface/artist-detail";

/* 歌手详情 */
export const useArtistDetailStore = defineStore({
  id: "artist-detail",
  state: (): IArtistDetailState => ({
    loading: false,
    artistDetail: undefined,
    artistDesc: [],
    similarArtists: [],
    artistMVs: [],
    /** 歌手MV分页参数 */
    artistMVsPage: {
      limit: 10,
      offset: 0,
      hasMore: true,
    },
    /** 热门歌曲50首 */
    hotSongs: [],
    /** 歌手专辑 */
    albums: [],
  }),
  getters: {},
  actions: {
    /** 获取并设置歌手详情 */
    async setArtistDetail(id: number) {
      /** 获取歌手详情 */
      const { artist } = await http<IArtistDetailResponse>(
        {
          url: `${apis.artistDetail}?id=${id}`,
        },
        "data"
      );
      const formatArtist: IArtistDetail = {
        id: artist.id,
        cover: artist.cover,
        name: artist.name,
        musicSize: artist.musicSize,
        mvSize: artist.mvSize,
        albumSize: artist.albumSize,
        transNames: artist.transNames,
      };
      this.artistDetail = formatArtist;
    },
    /** 获取并设置歌手描述信息 */
    async setArtistDesc(id: number) {
      /** 获取歌手描述 */
      const descList = await http<IArtistDescIntroduction[]>(
        {
          url: `${apis.artistDesc}?id=${id}`,
        },
        "introduction"
      );
      this.artistDesc = descList;
    },
    /** 获取并设置相似歌手信息 */
    async setSimilarArtists(id: number) {
      /** 获取相似歌手 */
      const artists = await http<ISimilarArtist[]>(
        {
          url: `${apis.similarArtists}?id=${id}`,
        },
        "artists"
      );
      const formatList = artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        picUrl: artist.picUrl,
        img1v1Url: artist.img1v1Url,
      }));
      this.similarArtists = formatList;
    },
    /** 获取并设置歌手MV */
    async setArtistMVs(payload: IArtistMVPayload) {
      const { id, limit, offset } = payload;
      /** 获取歌手MV */
      const { hasMore, mvs } = await http<IArtistMVResponse>(
        {
          url: `${apis.artistMV}?id=${id}&limit=${limit}&offset=${offset}`,
        },
        ""
      );
      const formatList = mvs.map((mv) => ({
        id: mv.id,
        name: mv.name,
        artistName: mv.artistName,
        playCount: mv.playCount,
        imgurl: mv.imgurl,
        imgurl16v9: mv.imgurl16v9,
        duration: mv.duration,
      }));
      this.artistMVsPage = { limit, offset, hasMore };
      if (offset) {
        this.artistMVs = formatList;
      } else {
        this.artistMVs = this.artistMVs.concat(formatList);
      }
    },
    /** 获取并设置歌手热门歌曲 */
    async setHotSongs(id: number) {
      /** 获取歌手热门歌曲 */
      const hotSongs = await http<IHotSong[]>(
        {
          url: `${apis.artistHotSongs}?id=${id}`,
        },
        "hotSongs"
      );
      const formatList = hotSongs.map((hotSong) => ({
        id: hotSong.id,
        name: hotSong.name,
        alia: hotSong.alia,
        dt: hotSong.dt,
      }));
      this.hotSongs = formatList;
    },
  },
  persist: true,
});
