// 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export type SearchType =
  | 1
  | 10
  | 100
  | 1000
  | 1002
  | 1004
  | 1006
  | 1009
  | 1014
  | 1018;

export type SearchContent =
  | ISearchContentArtistResponse
  | ISearchContentAlbumResponse
  | ISearchContentSongResponse
  | ISearchContentMVResponse;

export interface ISearchContentArtist {
  id: number;
  name: string /** 歌手名 */;
  img1v1Url: string /** 歌手头像 */;
}

export interface ISearchContentArtistResponse {
  artistCount: number /** 搜索到的歌手总数量 */;
  artists: ISearchContentArtist[] /** 歌手列表 */;
}

export interface ISearchContentArtistState
  extends ISearchContentArtistResponse {
  limit: number;
  offset: number;
}

export interface ISearchContentAlbum {
  id: number;
  name: string /** 专辑名 */;
  alia: string[] /** 专辑别名 */;
  artists: ISearchContentArtist[] /** 歌手 */;
}

export interface ISearchContentAlbumResponse {
  albumCount: number /** 搜索到的专辑总数量 */;
  albums: ISearchContentAlbum[] /** 专辑列表 */;
}

export interface ISearchContentAlbumState extends ISearchContentAlbumResponse {
  limit: number;
  offset: number;
}

export interface ISearchContentSong {
  id: number;
  name: string /** 歌曲名 */;
  mvid: number /** mv id */;
  album: ISearchContentAlbum /** 专辑 */;
  artists: ISearchContentArtist[] /** 歌手 */;
  duration: number /** 歌曲时长(毫秒) */;
  transNames?: string /** 歌曲译名 */;
}

export interface ISearchContentSongResponse {
  songCount: number /** 搜索到的歌曲总数量 */;
  songs: ISearchContentSong[] /** 歌曲列表 */;
}

export interface ISearchContentSongState extends ISearchContentSongResponse {
  limit: number;
  offset: number;
}

export interface ISearchContentMVArtist {
  id: number;
  name: string /** 歌手名 */;
}

export interface ISearchContentMV {
  id: number;
  name: string /** MV名称 */;
  cover: string /** MV封面图片 */;
  duration: number /** MV时长 */;
  playCount: number /** MV点击数 */;
  artists: ISearchContentMVArtist[];
}

export interface ISearchContentMVResponse {
  mvCount: number /** 搜索到的MV总数量 */;
  mvs: ISearchContentMV[] /** MV列表 */;
}

export interface ISearchContentMVState extends ISearchContentMVResponse {
  limit: number;
  offset: number;
}

export interface ISearchContentState {
  type: SearchType;
  songState: ISearchContentSongState;
  artistState: ISearchContentArtistState;
  albumState: ISearchContentAlbumState;
  mvState: ISearchContentMVState;
}
