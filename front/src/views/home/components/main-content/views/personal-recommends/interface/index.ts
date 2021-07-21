import { IBanner } from "./banner";
import { IRecommendSong } from "./recommendSongList";
import { IExclusiveBroadcast } from "./exclusiveBroadcastCard";
import { IArtist } from "./latestMusicCard";
import { IRecommendMv } from "./recommendMvCard";
import { IRecommendDj } from "./recommend-dj-card";

/** 最新音乐接口定义 */
export interface ILatestMusicFormat {
  id: number;
  mvId?: number;
  name: string /** 歌曲名称 */;
  aliasName?: string /** 歌曲别名 */;
  picUrl: string /** 歌曲封面图片url */;
  artists: IArtist[];
}

export interface IState {
  /** 推荐轮播图列表 */
  banners: IBanner[];
  /** 推荐歌单列表 */
  recommendSongList: IRecommendSong[];
  /** 独家放送列表 */
  exclusiveBroadcastList: IExclusiveBroadcast[];
  /** 最新音乐（新歌速度） */
  latestMusicList: ILatestMusicFormat[];
  /** 推荐MV */
  recommendMvList: IRecommendMv[];
  /** 推荐Dj */
  recommendDjList: IRecommendDj[];
}
