export interface ITab {
  label: string /** tab显示值 */;
  value: string | number /** tab的value值 */;
}

export interface ITabsState {
  currentTab: string | number;
  tabs: ITab[];
}
