import type { ISong } from "@/stores/interface/latest-music";
import type { ISongDetail } from "@/stores/interface/player";

/**
 * 每日歌曲推荐状态
 */
export interface IDailyRecommendSongsState {
  dailySongs: ISong[];
}

/**
 * 每日歌曲推荐接口返回值
 */
export interface IDailyRecommendSongs {
  dailySongs: ISongDetail[];
}
