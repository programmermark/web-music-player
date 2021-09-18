import { baseUrl } from "@/api/common";

export default {
  /** 获取MV详情 */
  mvDetail: baseUrl + "/mv/detail",
  /** 获取MV的播放地址 */
  mvUrl: baseUrl + "/mv/url",
  /** 获取MV相似的MV列表（默认5条） */
  similarMvList: baseUrl + "/simi/mv",
};
