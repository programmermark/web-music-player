import { ITab } from "./index";

export interface ITabsState {
  currentTab: number /** 当前歌曲类型 */;
  tabs: ITab<number>[] /** 类型tabs */;
  currentSongId: undefined | number /** 当前歌曲id */;
}

export interface ICurrentSongsState {
  limit: 10 /** 分页参数 */;
  offset: 0 /** 分页参数 */;
}
