import { baseUrl } from "@/api/common";

export default {
  /** 获取用户喜欢的歌曲组成的歌单 */
  likedPlaylist: baseUrl + "/likelist?uid=",
  /** 获取用户歌单 */
  userPlaylist: baseUrl + "/user/playlist",
};
