import type { IArtist } from "../../artist-detail/interface";

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
