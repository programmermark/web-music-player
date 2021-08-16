import { IArtist } from "@/views/home/components/main-content/views/artist-detail/interface";

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

/**
 * 0: 未知
 * 1: 男
 * 2: 女
 */
export type Gender = 0 | 1 | 2;
export interface IPlayListSubscriber {
  id: number;
  nickname: string /** 订阅用户名 */;
  avatarUrl: string /** 订阅用户名头像 */;
  gender: Gender;
}

/** 歌曲列表详情 */
export interface IPlaylistDetail {
  id: number /** 歌单id */;
  name: string /** 歌单名 */;
  coverImgUrl: string /** 歌单封面 */;
  description: string /** 描述 */;
  tags: string[] /** 歌单标签 */;
  trackCount: number /** 歌曲数量 */;
  playCount: number /** 歌曲播放数 */;
  subscribedCount: number /** 收藏数 */;
  createTime: number /** 创建时间（时间戳） */;
  creator: {
    userId: number /** 创建者id */;
    nickname: string /** 创建者名 */;
    avatarUrl: string /** 创建者头像 */;
  };
  trackIds: IPlayDetailTrackId[];
  tracks: ISongDetail[] /** 歌曲track列表 */;
  subscribers: IPlayListSubscriber[] /** 歌单订阅用户列表 */;
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
  al: ISongDetailAlbum /** 专辑信息 */;
  alia: string[] /** 歌曲别名列表 */;
  ar: IArtist[] /** 歌手列表 */;
  dt: number /** 歌曲时长（毫秒） */;
}

/**
 * SetSongList 参数类型
 */
export interface ISetSongListPayload {
  id: number /** 歌单id */;
  noSetCurrentSong: boolean /** 是否设置当前歌曲，默认false，设置当前歌曲 */;
}

export interface ISetSongListByIdsPayload {
  ids: number[] /** 歌曲id数组 */;
  currentId?: number /** 当前播放的歌曲id */;
}
