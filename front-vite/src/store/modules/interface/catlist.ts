/** 热门歌单分类 */
export interface IHotCat {
  id: number /** 分类id */;
  name: string /** 分类名称 */;
  category: number /** 分类key值 */;
  hot: boolean /** 是否显示hot标志 */;
}

export interface ICatListState {
  currentCat: string;
  hotCatList: IHotCat[];
}
