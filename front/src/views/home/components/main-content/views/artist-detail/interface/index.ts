export interface IArtist {
  id: number;
  cover: string /** 歌手封面 */;
  name: string /** 歌手名 */;
  musicSize: number /** 单曲数 */;
  mvSize: number /** 专辑数 */;
  videoCount: number /** MV数 */;
  alias: string[] /** 歌手别名（英文名｜中文名） */;
}

export interface IAlbum {
  id: number;
  name: string /** 专辑名 */;
  picUrl: string /** 专辑封面图片 */;
  publishTime: number /** 专辑发布时间 */;
  alias: string[] /** 专辑别名数组 */;
  artists: IArtist[] /** 歌曲作者 */;
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
