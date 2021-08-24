import { baseUrl } from "@/api/common";

export default {
  /** 获取歌手详情 */
  artistDetail: baseUrl + "/artist/detail",
  /** 获取歌手专辑 */
  artistAlbum: baseUrl + "/artist/album",
  /** 相似歌手 */
  similarArtists: baseUrl + "/simi/artist",
  /** 歌手描述 */
  artistDesc: baseUrl + "/artist/desc",
  /** 歌手MV */
  artistMV: baseUrl + "/artist/mv",
  /** 歌手热门歌曲 */
  artistHotSongs: baseUrl + "/artists",
  /** 歌手专辑 */
  artistAlbums: baseUrl + "/artist/album",
  /** 专辑详情 */
  artistAlbumDetail: baseUrl + "/album",
};
