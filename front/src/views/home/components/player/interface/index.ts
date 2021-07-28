/**
 * "in-order": '顺序播放'
 * "list-loop": '列表循环'
 * "single-cycle": '单曲循环'
 * "shuffle": '乱序播放'
 */
export type PlayBackType =
  | "in-order"
  | "list-loop"
  | "single-cycle"
  | "shuffle";

/** 播放器当前状态 */
export interface IPlayerState {
  listState: PlayBackType /** 播放类型 */;
  listStateDesc: string /** 播放类型文本描述 */;
  listStateIcon: PlayBackType /** 播放类型图标 */;
  volume: number /** 音量 */;
  showLyrics: boolean /** 是否展示歌词 */;
  expandSong: boolean /** 是否展开歌曲播放页面 */;
}

/** 歌曲当前状态 */
export interface ISongState {
  isPause: boolean /** 歌曲是否已暂停 */;
  playRate: number /** 播放进度 */;
  songDuration: number /** 歌曲时长 */;
  playedSongDuration: number /** 已播放歌曲时长 */;
}

/** 播放器播放列表状态定义 */
export interface IListState {
  listState: PlayBackType /** 播放类型 */;
  listStateDesc: string /** 播放类型文本描述 */;
  listStateIcon: PlayBackType /** 播放类型图标 */;
}

/**
 * usePlayerState hook接口定义
 */
export interface IUsePlayerState {
  playerState: IPlayerState /** 歌曲列表当前状态 */;
  changeListState: (state: PlayBackType) => void /** 切换当前播放状态 */;
  toggleExpandSong: () => void /** 展开｜关闭 播放列表 */;
}
