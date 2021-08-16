import { ITab } from "./index";

export interface ITabsState {
  currentTab: string /** 当前歌曲类型 */;
  tabs: ITab[] /** 类型tabs */;
  currentType: string /** 热门歌曲｜全部歌曲 */;
  types: ITab[] /** 歌曲类型tabs */;
  currentAlbumId: undefined | number /** 当前专辑id */;
  limit: number;
  offset: number;
}
