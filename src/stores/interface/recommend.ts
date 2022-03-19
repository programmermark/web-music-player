import { IArtist } from "@/views/home/components/main-content/views/artist-detail/interface";

/** 推荐轮播图列表接口定义 */
export interface IBanner {
  imageUrl: string /** 图片地址 */;
  targetId: number;
  targetType: number;
  exclusive: boolean /** 是否独家，但是字段应该是废弃 */;
  titleColor: string /** 底部水印标题的文字颜色 */;
  typeTitle: string /** 底部水印标题的文字内容 */;
  encodeId: string;
  scm: string;
}

/** 推荐歌单列表接口定义 */
export interface IRecommendSong {
  id: number;
  type: number;
  name: string /** 推荐歌单名称 */;
  copywriter: string /** 文案类型 */;
  picUrl: string /** 配图地址 */;
  canDislike: boolean;
  trackNumberUpdateTime: number /** 跟踪数量更新实践 */;
  playCount: number /** 播放量 */;
  trackCount: number /** 跟踪数 */;
  highQuality: boolean /** 是否高质量 */;
  alg: string;
}

/** 最新音乐返回值接口定义 */
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

/** 最新音乐接口定义 */
export interface ILatestMusicFormat {
  id: number;
  mvId?: number;
  name: string /** 歌曲名称 */;
  aliasName?: string /** 歌曲别名 */;
  picUrl: string /** 歌曲封面图片url */;
  artists: IArtist[];
}

/** 独家放送接口定义 */
export interface IExclusiveBroadcast {
  id: number;
  type: number;
  sPicUrl: string /** 图片url */;
  name: string /** 标题 */;
}

/** 推荐MV接口定义 */
export interface IRecommendMv {
  id: number;
  name: string /** MV名称 */;
  copywriter: string /** MV副标题 */;
  picUrl: string /** 封面图片地址 */;
  artists: IArtist[] /** MV作者 */;
  playCount: number /** 播放量 */;
}

/** 推荐Dj接口定义 */
export interface IRecommendDj {
  id: number;
  name: string /** 歌手名称 */;
  picUrl: string /** 封面URL */;
  rcmdText: string /** 推荐文本描述 */;
}

export interface IRecommendState {
  /** 推荐轮播图列表 */
  banners: IBanner[];
  /** 推荐歌单列表 */
  recommendSongList: IRecommendSong[];
  /** 独家放送列表 */
  exclusiveBroadcastList: IExclusiveBroadcast[];
  /** 最新音乐（新歌速度） */
  latestMusicList: ILatestMusicFormat[];
  /** 推荐MV */
  recommendMvList: IRecommendMv[];
  /** 推荐Dj */
  recommendDjList: IRecommendDj[];
}
