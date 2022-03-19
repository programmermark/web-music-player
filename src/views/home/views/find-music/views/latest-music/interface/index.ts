export interface ITab<T = string> {
  label: string /** tab显示值 */;
  value: T /** tab的value值 */;
}

export interface ITabsState<T = string> {
  currentTab: T /** 当前歌曲类型 */;
  tabs: ITab[] /** 类型tabs */;
}
