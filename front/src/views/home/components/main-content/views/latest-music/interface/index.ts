export interface ITab {
  label: string /** tab显示值 */;
  value: string | number /** tab的value值 */;
}

export interface ITabsState {
  currentTab: string | number /** 当前歌曲类型 */;
  tabs: ITab[] /** 类型tabs */;
}
