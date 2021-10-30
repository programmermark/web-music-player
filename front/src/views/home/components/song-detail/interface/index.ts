export interface ILyric {
  lyric: string /** 歌词（包含歌词和每句歌词的时间） */;
  version: number;
}

export interface IlyricUser {
  id: number /** 记录id */;
  nickname: string /** 歌词贡献者名 */;
  uptime: number /** 歌词上传时间（时间戳） */;
  userid: number /** 歌词贡献者id */;
}

/** 歌词接口定义 */
export interface ILyricResponse {
  lrc: ILyric /** 歌词 */;
  lyricUser: IlyricUser /** 歌词贡献者 */;
  tlyric: ILyric /** 翻译后的歌词 */;
  transUser: IlyricUser /** 翻译歌词贡献者 */;
}

export interface ILyricState {
  lyric: string /** 歌词 */;
  lyricUser?: IlyricUser /** 歌词贡献者  */;
  transLyric: string /** 翻译歌词 */;
  transLyricUser?: IlyricUser /** 翻译歌词贡献者 */;
}
