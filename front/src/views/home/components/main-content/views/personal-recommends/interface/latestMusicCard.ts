export interface IArtist {
  id: number;
  name: string /** 歌手/作者 名称 */;
}

export interface ILatestMusic {
  id: number /** 歌曲id */;
  mvid: number /** 歌曲的MV的id */;
  album: {
    id: number;
    alias: string[] /** 歌曲名称的第二部分，只有一个值的数组 */;
    name: string /** 歌曲名称 */;
    picUrl: string /** 歌曲封面图片url */;
    artists: IArtist[];
  };
}
