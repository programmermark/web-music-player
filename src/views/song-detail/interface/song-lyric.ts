export interface ILyric {
  time: number /** 歌词播放时间，格式：00:00.123, 分:秒:毫秒 */;
  text: string /** 歌词内容（可能为空字符串） */;
  transText?: string /** 翻译歌词内容（可能为空字符串） */;
}
