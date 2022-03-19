import { baseUrl } from "@/api/common";

export default {
  /** 获取歌单分类 */
  playlistCatList: baseUrl + "/playlist/catlist",
  /** 获取热门歌单分类 */
  playlistHotCatList: baseUrl + "/playlist/hot",
  /** 歌单 ( 网友精选碟 ) */
  playlistTop: baseUrl + "/top/playlist",
};
