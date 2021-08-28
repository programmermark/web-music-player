export interface IArtistDetailState {
  loading: boolean;
  artistDetail?: IArtistDetail;
  artistDesc: IArtistDescIntroduction[];
  similarArtists: ISimilarArtist[];
  artistMVs: IArtistMV[];
  /** 歌手MV分页参数 */
  artistMVsPage: IArtistPage;
  /** 热门歌曲50首 */
  hotSongs: IHotSong[];
  /** 歌手专辑 */
  albums: IArtistAlbum[];
}

/** 歌手详情 */
export interface IArtistDetail {
  id: number;
  cover?: string /** 歌手封面 */;
  name: string /** 歌手名 */;
  musicSize?: number /** 单曲数 */;
  mvSize?: number /** 专辑数 */;
  albumSize?: number /** MV数 */;
  transNames: string[] /** 中文名｜英文名 */;
}

/** 歌手描述 */
export interface IArtistDescIntroduction {
  ti: string /** 歌手简介标题 */;
  txt: string /** 歌手简介内容 */;
}

/** 相似歌手 */
export interface ISimilarArtist {
  id: number /** 歌手id */;
  name: number /** 歌手名 */;
  picUrl: string /** 歌手头像 */;
  img1v1Url: string /** 歌手头像(比例1:1) */;
}

/** 歌手MV的分页参数 */
export interface IArtistPage {
  limit: number;
  offset: number;
  hasMore: boolean /** 是否还有更多MV */;
}

/** 歌手MV */
export interface IArtistMV {
  id: number /** 歌手id */;
  name: string /** MV名 */;
  artistName: string /** 歌手名 */;
  playCount: number /** MV播放量 */;
  imgurl: string /** MV封面 */;
  imgurl16v9: string /** MV封面 */;
}

/** 歌手热门歌曲 */
export interface IHotSong {
  id: number /** 歌曲id */;
  name: string /** 歌曲名 */;
  alia: string[] /** 歌曲别名 */;
  dt: number /** 歌曲时长（毫秒） */;
}

export interface IArtistAlbum {
  id: number /** 专辑id */;
  name: string /** 专辑名 */;
  picUrl: string /** 专辑封面 */;
  publishTime: number /** 专辑发布时间 */;
  songs: IAlbumSong[] /** 专辑歌曲 */;
}

export interface IAlbumSong {
  id: number /** 歌曲id */;
  name: string /** 歌曲名 */;
  dt: number /** 歌曲时长 */;
  mv?: number /** 歌曲MV id */;
}

/** 歌手详情返回值接口定义 */
export interface IArtistDetailResponse {
  artist: IArtistDetail;
}

/** 设置歌手的MV信息的参数 */
export interface IArtistMVPayload {
  id: number /** 歌手id */;
  limit: number /** MV 分页参数 */;
  offset: number /** MV 分页参数 */;
}

/** 歌手MV返回值接口定义 */
export interface IArtistMVResponse {
  hasMore: boolean /** 是否还有更多数据 */;
  mvs: IArtistMV[] /** 歌手MV */;
}
