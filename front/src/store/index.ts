/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import ModulePlayer from "./modules/player";
import ModuleLogin from "./modules/login";
import ModulePlaylist from "./modules/playlist";
import { IAllStateTypes, IRootStateTypes } from "./modules/interface";
import { InjectionKey } from "vue";
import ModuleCatList from "./modules/catlist";
import ModuleRankList from "./modules/ranklist";
import ModuleArtistList from "./modules/artistlist";
import ModuleRecommend from "./modules/recommend";
import ModuleBulletin from "./modules/bulletin";
import ModuleLatestMusic from "./modules/latest-music";
import ModuleArtistRankList from "./modules/artist-rank-list";
import ModuleArtistDetail from "./modules/artist-detail";

const dataSet = createPersistedState({
  /** 被持久化的状态格式为：模块名.状态名 */
  paths: [
    "login.hasLogged",
    "login.userInfo",
    /** 播放器 */
    "player.isPause",
    "player.volume",
    "player.playBackType",
    "player.currentSong",
    "player.songList",
    /** 歌单 */
    "playlist.currentPlaylist",
    "playlist.allPlayList",
    "catList.currentCat",
    "catList.hotCatList",
    "catList.hotCatList",
    "rankList.artistRank",
    "rankList.songRankList",
    "rankList.songRankListOfficial",
    "rankList.songRankListGlobal",
    "artistList.loading",
    "artistList.artistList",
    "recommend.banners",
    "recommend.recommendSongList",
    "recommend.exclusiveBroadcastList",
    "recommend.latestMusicList",
    "recommend.recommendMvList",
    "recommend.recommendDjList",
    "bulletin.hasNotified",
    "bulletin.currentBulletin",
    "bulletin.bulletinList",
    /** 新歌速递 */
    "latestMusic.allSongs",
    "latestMusic.chineseSongs",
    "latestMusic.europeAndAmericaSongs",
    "latestMusic.koreaSongs",
    "latestMusic.japaneseSongs",
    /** 新碟上架 */
    "latestMusic.allAlbums",
    "latestMusic.chineseAlbums",
    "latestMusic.europeAndAmericaAlbums",
    "latestMusic.koreaAlbums",
    "latestMusic.japanAlbums",
    /** 歌手排行榜 */
    "artistRankList.loading",
    "artistRankList.tabs",
    "artistRankList.currentTab",
    "artistRankList.artistList",
    /** 歌手详情 */
    "artistDetail.loading",
    "artistDetail.artistDetail",
    "artistDetail.artistDesc",
    "artistDetail.similarArtists",
    "artistDetail.artistMVs",
    "artistDetail.artistMVsPage",
    "artistDetail.hotSongs",
    "artistDetail.albums",
  ],
});

export default createStore<IRootStateTypes>({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    player: ModulePlayer,
    login: ModuleLogin,
    playlist: ModulePlaylist,
    catList: ModuleCatList,
    rankList: ModuleRankList,
    artistList: ModuleArtistList,
    recommend: ModuleRecommend,
    bulletin: ModuleBulletin,
    latestMusic: ModuleLatestMusic,
    artistRankList: ModuleArtistRankList,
    artistDetail: ModuleArtistDetail,
  },
  plugins: [dataSet],
});

// 定义注入类型
export const key: InjectionKey<Store<IRootStateTypes>> = Symbol("vue-store");

export function useStore<T = IAllStateTypes>() {
  return baseUseStore<T>(key);
}
