// 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export type SearchTypeValue =
  | "1"
  | "10"
  | "100"
  | "1000"
  | "1002"
  | "1004"
  | "1006"
  | "1009"
  | "1014"
  | "1018";

export type SearchTypeLabel =
  | "单曲"
  | "专辑"
  | "歌手"
  | "歌单"
  | "用户"
  | "MV"
  | "歌词"
  | "电台"
  | "视频"
  | "综合";

export interface IOption {
  label: SearchTypeLabel;
  value: SearchTypeValue;
}
export interface IContentTypeState {
  contentType: SearchTypeValue;
  types: IOption[];
  limit: number;
  offset: number;
}

export type SearchContent =
  | ISearchContentArtistResponse
  | ISearchContentAlbumResponse
  | ISearchContentSongResponse
  | ISearchContentMVResponse;

export interface ISearchContentArtist {
  id: number;
  name: string /** 歌手名 */;
  alias?: string[] /** 歌手别名 */;
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
  loading: boolean;
}

export interface ISearchContentAlbum {
  id: number;
  name: string /** 专辑名 */;
  picUrl?: string /** 专辑封面 */;
  alias: string[] /** 专辑别名 */;
  artist: ISearchContentArtist /** 歌手 */;
}

export interface ISearchContentAlbumResponse {
  albumCount: number /** 搜索到的专辑总数量 */;
  albums: ISearchContentAlbum[] /** 专辑列表 */;
}

export interface ISearchContentAlbumState extends ISearchContentAlbumResponse {
  limit: number;
  offset: number;
  loading: boolean;
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
  loading: boolean;
}

export interface IMVCreator {
  userId: number;
  userName: string /** 歌手名 */;
}

export interface ISearchContentMV {
  id?: number;
  vid: string;
  type: 0 | 1;
  title: string /** MV名称 */;
  coverUrl: string /** MV封面图片 */;
  durationms: number /** MV时长 */;
  playTime: number /** MV点击数 */;
  creator: IMVCreator[];
}

export interface ISearchContentMVResponse {
  videoCount: number /** 搜索到的MV总数量 */;
  videos: ISearchContentMV[] /** MV列表 */;
}

export interface ISearchContentMVState extends ISearchContentMVResponse {
  limit: number;
  offset: number;
  loading: boolean;
}

export interface IPlaylistCreator {
  userId: number /** 用户id */;
  nickname: string /** 用户昵称 */;
  avatarUrl: string /** 用户头像 */;
}

export interface ISearchContentPlaylist {
  id: number;
  name: string /** 歌单名称 */;
  coverImgUrl: string /** 歌单封面图片 */;
  trackCount: number /** 歌单歌曲数量 */;
  creator: IPlaylistCreator /** 歌单创建者 */;
}

export interface ISearchContentPlaylistResponse {
  playlistCount: number /** 搜索到的歌单总数量 */;
  playlists: ISearchContentPlaylist[] /** 歌单列表 */;
}

export interface ISearchContentPlaylistState
  extends ISearchContentPlaylistResponse {
  limit: number;
  offset: number;
  loading: boolean;
}

export interface ISearchContentState {
  type: SearchTypeValue;
  songState: ISearchContentSongState;
  artistState: ISearchContentArtistState;
  albumState: ISearchContentAlbumState;
  mvState: ISearchContentMVState;
}
