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

export interface IPlayerState {
  listState: PlayBackType /** 播放类型 */;
  volume: number /** 音量 */;
  showLyrics: boolean /** 是否展示歌词 */;
  expandSong: boolean /** 是否展开歌曲播放页面 */;
}

export interface ISongState {
  isPause: boolean /** 歌曲是否已暂停 */;
  playRate: number /** 播放进度 */;
  songDuration: number /** 歌曲时长 */;
  playedSongDuration: number /** 已播放歌曲时长 */;
}
