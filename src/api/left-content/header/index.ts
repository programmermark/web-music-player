import { baseUrl } from "@/api/common";

export default {
  /** 获取热搜榜 */
  hotSearchRankList: baseUrl + "/search/hot/detail",
  /** 获取关键词搜索建议 */
  searchSuggest: baseUrl + "/search/suggest",
  /** 获取搜索关键词搜索结果 */
  searchResult: baseUrl + "/search",
};
