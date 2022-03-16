import { IOption } from "@/common/interface/common";

export interface IArtistCard {
  id: number /** 歌手id */;
  name: string /** 歌手名 */;
  trans: string /** 歌手名(译名) */;
  score: number /** 热度 */;
  picUrl: string /** 头像 */;
  lastRank: number /** 上一次的排名（排名从0开始计算） */;
}

export interface IArtistRankListState {
  loading: boolean /** 是否显示loading */;
  currentTab: number /** 排行榜当前的地区分类 */;
  tabs: IOption<number>[] /** 所有的地区分类 */;
  artistList: IArtistCard[] /** 歌手列表 */;
}

export interface IArtistRankListResponse {
  artists: IArtistCard[];
}
