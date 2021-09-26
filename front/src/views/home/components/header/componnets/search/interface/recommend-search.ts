export interface IState {
  hotSearchList: IHotSearch[];
}
/**
 * 热搜榜接口定义
 */
export interface IHotSearch {
  searchWord: string /** 热搜榜关键字 */;
  score: number /** 热度 */;
  content: string /** 标题 */;
  iconUrl: string /** 显示在关键词后的图标，有则显示，无则不显示 */;
}
