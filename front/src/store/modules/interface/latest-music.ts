import { IAlbum } from "@/views/home/components/main-content/views/artist-detail/interface";
import { IArtist } from "./artistlist";

export interface ISong {
  id: number /** 歌曲id */;
  name: string /** 歌曲名 */;
  alias: string[] /** 歌曲别名数组 */;
  duration: number /** 歌曲时长（毫秒） */;
  mp3Url: string /** 歌曲链接 */;
  artists: IArtist[] /** 歌曲作者 */;
  album: IAlbum /** 歌曲专辑 */;
}

export interface ILatestMusicState {
  /** 新歌速递 */
  allSongs: ISong[];
  chineseSongs: ISong[];
  europeAndAmericaSongs: ISong[];
  koreaSongs: ISong[];
  japaneseSongs: ISong[];
  /** 新碟上架 */
  allAlbums: [];
  chineseAlbums: [];
  europeAndAmericaAlbums: [];
  koreaAlbums: [];
  japanAlbums: [];
}
