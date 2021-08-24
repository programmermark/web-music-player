/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import {
  IArtistAlbum,
  IArtistDescIntroduction,
  IArtistDetail,
  IArtistDetailResponse,
  IArtistDetailState,
  IArtistMV,
  IArtistMVPayload,
  IArtistMVResponse,
  IArtistPage,
  IHotSong,
  ISimilarArtist,
} from "./interface/artist-detail";

const ModuleArtistDetail: Module<IArtistDetailState, IRootStateTypes> = {
  namespaced: true,
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
  mutations: {
    setLoading(state: IArtistDetailState, loading: boolean) {
      state.loading = loading;
    },
    /** 设置歌手详情 */
    setArtistDetail(state: IArtistDetailState, artistDetail: IArtistDetail) {
      state.artistDetail = artistDetail;
    },
    /** 设置歌手描述 */
    setArtistDesc(
      state: IArtistDetailState,
      artistDesc: IArtistDescIntroduction[]
    ) {
      state.artistDesc = artistDesc;
    },
    /** 设置歌手相似歌手 */
    setSimilarArtists(
      state: IArtistDetailState,
      similarArtists: ISimilarArtist[]
    ) {
      state.similarArtists = similarArtists;
    },
    /** 设置歌手MV */
    setArtistMVs(state: IArtistDetailState, artistMVs: IArtistMV[]) {
      state.artistMVs = artistMVs;
    },
    /** 设置歌手MV */
    setArtistMVsConcat(state: IArtistDetailState, artistMVs: IArtistMV[]) {
      state.artistMVs = state.artistMVs.concat(artistMVs);
    },
    /** 设置歌手MV分页参数 */
    setArtistMVsPages(state: IArtistDetailState, page: IArtistPage) {
      state.artistMVsPage = page;
    },
    /** 设置歌手热门歌曲 */
    setHotSongs(state: IArtistDetailState, hotSongs: IHotSong[]) {
      state.hotSongs = hotSongs;
    },
    /** 设置歌手专辑 */
    setAlbums(state: IArtistDetailState, albums: IArtistAlbum[]) {
      state.albums = albums;
    },
  },
  actions: {
    /** 获取并设置歌手详情 */
    async setArtistDetail(
      context: ActionContext<IArtistDetailState, IRootStateTypes>,
      id: number
    ) {
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
      context.commit("setArtistDetail", formatArtist);
    },
    /** 获取并设置歌手描述信息 */
    async setArtistDesc(
      context: ActionContext<IArtistDetailState, IRootStateTypes>,
      id: number
    ) {
      /** 获取歌手描述 */
      const descList = await http<IArtistDescIntroduction[]>(
        {
          url: `${apis.artistDesc}?id=${id}`,
        },
        "introduction"
      );
      context.commit("setArtistDesc", descList);
    },
    /** 获取并设置相似歌手信息 */
    async setSimilarArtists(
      context: ActionContext<IArtistDetailState, IRootStateTypes>,
      id: number
    ) {
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
      }));
      context.commit("setSimilarArtists", formatList);
    },
    /** 获取并设置歌手MV */
    async setArtistMVs(
      context: ActionContext<IArtistDetailState, IRootStateTypes>,
      payload: IArtistMVPayload
    ) {
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
      }));
      context.commit("setArtistMVsPages", { limit, offset, hasMore });
      if (offset === 0) {
        context.commit("setArtistMVs", formatList);
      } else {
        context.commit("setArtistMVsConcat", formatList);
      }
    },
    /** 获取并设置歌手热门歌曲 */
    async setHotSongs(
      context: ActionContext<IArtistDetailState, IRootStateTypes>,
      id: number
    ) {
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
      context.commit("setHotSongs", formatList);
    },
  },
  getters: {},
};

export default ModuleArtistDetail;
