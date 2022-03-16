import { baseUrl } from "@/api/common";

export default {
  /** 获取歌曲MV */
  lyric: baseUrl + "/lyric",
  /** 获取歌曲评论 */
  fetchSongComment: baseUrl + "/comment/music?",
  /** 发表｜回复歌曲评论 */
  submitComment: baseUrl + "/comment",
};
