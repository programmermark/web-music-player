import type { ITab } from "./index";

export interface ITabsState {
  currentTab: number /** 当前歌曲类型 */;
  tabs: ITab<number>[] /** 类型tabs */;
  currentSongId: undefined | number /** 当前歌曲id */;
}
