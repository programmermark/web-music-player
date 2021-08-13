export interface IArtist {
  id: number;
  cover: string /** 歌手封面 */;
  name: string /** 歌手名 */;
  musicSize: number /** 单曲数 */;
  mvSize: number /** 专辑数 */;
  videoCount: number /** MV数 */;
}

export interface IAlbum {
  id: number;
  name: string /** 专辑名 */;
  picUrl: string /** 专辑封面图片 */;
  publishTime: number /** 专辑发布时间 */;
}

/** 歌手详情接口定义 */
export interface IArtistBriefInfo {
  artist: IArtist;
}

/** 歌手专辑接口定义 */
export interface IArtistAlbumInfo {
  artist: IArtist;
  // hotAlbums:
}

export interface IArtistDetailState {
  briefInfo?: IArtist;
}