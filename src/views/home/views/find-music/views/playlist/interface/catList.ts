import type { IHotCat } from "@/stores/interface/catlist";

export interface ICategory {
  /** 分类id: 分类名称 */
  [index: number]: string;
}

/** 二级歌单分类 */
export interface ISubCategory {
  category: number /** 歌单一级分类的key值 */;
  hot: boolean /** 是否显示hot标志 */;
  name: string /** 分类名称 */;
}

export interface ICatList {
  all: {
    name: string /** 分类名称 */;
    hot: boolean /** 是否显示hot标志 */;
  };
  /** 歌单分类 */
  categories: ICategory;
  /** 歌单二级分类 */
  sub: ISubCategory[];
}

/** catListState中的catList的接口定义 */
export interface IStateCatList {
  category: number /** 分类key值  */;
  name: string /** 分类名称 */;
  icon: string /** 分类的图标类名 */;
}

export interface ICatListState {
  allCat: string /** 全部分类 */;
  catList: IStateCatList[] /** 一级歌单分类 */;
  subCatList: ISubCategory[] /** 二级歌单分类 */;
}

export interface IHotCatListState {
  currentCat: string /** 当前选中的分类 */;
  catList: IHotCat[];
}
