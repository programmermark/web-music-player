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

const dataSet = createPersistedState({
  /** 被持久化的状态格式为：模块名.状态名 */
  paths: [
    "login.hasLogged",
    "login.userInfo",
    "player.currentSong",
    "player.songList",
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
  },
  plugins: [dataSet],
});

// 定义注入类型
export const key: InjectionKey<Store<IRootStateTypes>> = Symbol("vue-store");

export function useStore<T = IAllStateTypes>() {
  return baseUseStore<T>(key);
}
