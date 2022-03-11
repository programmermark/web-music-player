import { baseUrl } from "@/api/common";

export default {
  /** 获取所有排行榜 */
  rankListTopList: baseUrl + "/toplist/detail",
  /** 获取歌手排行榜 */
  rankListArtistList: baseUrl + "/toplist/artist",
};
