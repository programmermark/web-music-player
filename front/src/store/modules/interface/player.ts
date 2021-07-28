export interface IArtist {
  id: number /** 歌手id */;
  name: string /** 歌手名称 */;
}

export interface IPlaySong {
  id: number /** 歌曲id */;
  coverImg: string /** 歌曲封面图片 */;
  name: string /** 歌曲名 */;
  subName?: string /** 歌曲副标题 */;
  artists: IArtist[] /** 歌手 */;
  duration?: number /** 歌曲时长（秒：s） */;
  songUrl: string /** 歌曲的播放地址 */;
  hasCollected?: boolean /** 歌曲是否已收藏 */;
  lyric?: string /** 歌词 */;
}

export interface IPlayerState {
  currentSong?: IPlaySong /** 当前播放的歌曲 */;
  songList: IPlaySong[] /** 歌曲列表 */;
}

/** 歌曲TrackId */
export interface IPlayDetailTrackId {
  id: number /** 歌曲id */;
}

/** 歌曲列表详情 */
export interface IPlaylistDetail {
  trackIds: IPlayDetailTrackId[];
}

export interface ISongDetailAlbum {
  id: number /** 歌曲id */;
  name: string /** 歌曲名称 */;
  picUrl: string /** 歌曲封面地址 */;
}

/** 歌曲详情 */
export interface ISongDetail {
  id: number /** 歌曲id */;
  name: string /** 歌曲名称 */;
  al: ISongDetailAlbum;
  ar: IArtist[];
  dt: number /** 歌曲时长（毫秒） */;
}
