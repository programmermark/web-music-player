import type {
  IAlbum,
  IArtist,
} from "@/views/home/views/find-music/views/artist-detail/interface";

export interface ISong {
  id: number /** 歌曲id */;
  name: string /** 歌曲名 */;
  alias: string[] /** 歌曲别名数组 */;
  duration: number /** 歌曲时长（毫秒） */;
  mp3Url?: string /** 歌曲链接 */;
  mvId?: number /** 歌曲MV id */;
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
  allAlbums: IAlbum[];
  chineseAlbums: IAlbum[];
  europeAndAmericaAlbums: IAlbum[];
  koreaAlbums: IAlbum[];
  japaneseAlbums: IAlbum[];
}

export interface IAlbumsPayload {
  offset: number;
  limit: number;
  area: string;
  type: string;
}

export interface IAlbumsMutation {
  albums: IAlbum[] /** 专辑列表 */;
  isConcat: boolean /** 是否拼接到已有数据上 */;
}
