export interface IArtist {
  id: number /** 歌手id */;
  name: string /** 歌手名 */;
  picUrl: string /** 歌手封面图片 */;
  score: number /** 歌手热度 */;
  lastRank: number /** 上一次的排行：用于计算在榜单上排名的升降 */;
}

export interface ISongRank {
  id: number /** 榜单id */;
  name: string /** 榜单名 */;
  description: string /** 内容描述 */;
  coverImgUrl: string /** 榜单封面图片 */;
  trackNumberUpdateTime: number /** 榜单更新时间（时间戳） */;
  playCount: number /** 点击数 */;
}

export interface IRankSong {
  name: string /** 歌曲名 */;
  artistStr: string /** 拼接后的歌手名 */;
}

export interface ISongRankOfficial extends ISongRank {
  songList: IRankSong[] /** 榜单歌曲（默认前3首：接口支持前3，官网是前5） */;
}

/** 歌手排行榜 */
export interface IArtistRank extends IArtistRankListResponse {
  artistList: IArtist[];
}

export interface IRankListState {
  loading: boolean /** 是否显示loading */;
  artistRank?: IArtistRank /** 歌手榜 */;
  songRankList: ISongRank[] /** 所有的歌曲榜单 */;
  songRankListOfficial: ISongRankOfficial[] /** 歌曲榜单（官方榜：前4的歌曲榜单） */;
  songRankListGlobal: ISongRank[] /** 歌曲榜单（全球榜：除去前4后的歌曲榜单） */;
}

/** 排行榜歌曲接口定义 */
export interface IRankListTrack {
  first: string /** 歌曲名 */;
  second: string /** 歌手名（多个歌手时，会拼接成一个字符串） */;
}

/** 歌曲排行榜接口数据 */
export interface ISongRankListResponse extends ISongRank {
  tracks: IRankListTrack[];
}

/** 歌手排行榜返回值 */
export interface IArtistRankListResponse {
  name: string /** 榜单名称 */;
  coverUrl: string /** 榜单封面 */;
  updateTime: number /** 更新时间，默认为每天更新 */;
}

/** 所有歌曲排行榜接口返回值 */
export interface IRankListResponse {
  artistToplist: IArtistRankListResponse /** 歌手排行榜 */;
  list: ISongRankListResponse[] /** 歌曲排行榜 */;
}

export interface ISingerRankListResponse {
  artists: IArtist[] /** 歌手榜单 */;
}
