import { baseUrl } from "@/api/common";

export default {
  /** 获取MV详情 */
  mvDetail: baseUrl + "/mv/detail",
  /** 获取MV的播放地址 */
  mvUrl: baseUrl + "/mv/url",
  /** 获取MV的点赞数、评论数、分享数 */
  mvInfo: baseUrl + "/mv/detail/info",
  /** 获取MV相似的MV列表（默认5条） */
  similarMvList: baseUrl + "/simi/mv",

  /** 获取视频详情 */
  videoDetail: baseUrl + "/video/detail",
  /** 获取视频的播法地址 */
  videoUrl: baseUrl + "/video/url",
  /** 获取视频相似的视频列表（默认5条） */
  similarVideoList: baseUrl + "/related/allvideo",
};
