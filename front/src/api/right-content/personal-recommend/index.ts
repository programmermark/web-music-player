import { baseUrl } from "@/api/common";

export default {
  /** 获取个性推荐轮播列表 */
  personalBanner: baseUrl + "/banner",
  /** 获取推荐歌单: 默认请求9条 */
  personalSongList: baseUrl + "/personalized?limit=9",
  /** 获取每日歌曲推荐(需登录) */
  personalDailyReocommendSongs: baseUrl + "/recommend/songs",
  /** 获取独家放送：默认请求前4条 */
  personalBroadcastList:
    baseUrl + "/personalized/privatecontent/list?limit=4&offset=0",
  /** 新歌速递 */
  personalNewSongList: baseUrl + "/top/song?type=0",
  /** 推荐MV */
  personalMV: baseUrl + "/personalized/mv",
  /** 主播电台（替换为电台个性推荐） */
  personalDj: baseUrl + "/dj/personalize/recommend",
  /** 根据歌单id获取歌单详情 */
  playlistDetail: baseUrl + "/playlist/detail",
  /** 根据歌曲id获取歌曲详情 */
  songDetail: baseUrl + "/song/detail",
};
