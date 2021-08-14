import { ITab } from "./index";

export interface ITabsState {
  currentTab: string | number;
  tabs: ITab[];
}
