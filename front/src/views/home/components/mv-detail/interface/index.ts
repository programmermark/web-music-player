/** MV艺术家 */
export interface IMVArtist {
  id: number /** 艺术家id */;
  name: string /** 艺术家名 */;
  img1v1Url: string /** 艺术家头像 */;
  followed: boolean /** 是否已关注该艺术家 */;
}

/** MV分辨率 */
export interface IBR {
  size: number;
  br: number /** 分辨率：如 480、720、1080 */;
  point: number;
}

/** MV 详情 */
export interface IMVDetail {
  id: number /** MV id */;
  name: string /** MV名称 */;
  playCount: number /** 播放量 */;
  publishTime: string /** 发布时间 */;
  duration: number /** MV时长（毫秒） */;
  cover: string /** MV封面图片地址 */;
  coverUrl?: string /** MV封面图片地址 */;
  imgurl16v9?: string /** MV封面图片地址 */;
  desc: string /** MV详细描述 */;
  commentCount: number /** 评论数 */;
  shareCount: number /** 分享数 */;
  subCount: number /** 订阅数 */;
  artists: IMVArtist[];
  brs: IBR[];
  videoGroup: IVideoGroupItem[];
}

/** MV 点赞数、评论数、分享数 */
export interface IMVInfo {
  likedCount?: number /** 点赞数 */;
  shareCount: number /** 分享数 */;
  commentCount: number /** 评论数 */;
}

/** MV url地址 */
export interface IMVUrl {
  id: number /** MV id */;
  url: string /** MV 真实播放地址 */;
}

/** MV详情状态接口 */
export interface IMVDetailState {
  mvDetail?: IMVDetail;
  mvUrl?: IMVUrl;
  showMVDesc: boolean /** 是否显示MV详细描述 */;
}

/** 相似MV状态接口 */
export interface ISimilarMVState {
  list: ISimilarMV[];
}

/** 视频创建者接口 */
export interface IVideoCreator {
  avatarUrl: string /** 创建者头像 */;
  nickname: string /** 创建者昵称 */;
  userId: number /** 创建者id */;
  userType: number /** 创建者类型 */;
}

/** 视频分类 */
export interface IVideoGroupItem {
  id: number /** 视频分类id */;
  name: string /** 视频分类名称 */;
}

/** 视频详情接口 */
export interface IVideoDetail {
  vid: string /** 视频id */;
  commentCount: number /** 视频评论数 */;
  durationms: number /** 视频时长(毫秒) */;
  playTime: number /** 视频播放数 */;
  praisedCount: number /** 视频点赞数 */;
  publishTime: number /** 视频发布时间 */;
  shareCount: number /** 视频分享数 */;
  subscribeCount: number /** 视频收藏数 */;
  title: string /** 视频标题 */;
  description: string /** 视频描述 */;
  avatarUrl: string /** 视频作者头像 */;
  coverUrl: string /** 视频封面图片地址 */;
  creator: IVideoCreator;
  videoGroup: IVideoGroupItem[];
}

/** 视频详情、MV详情格式化接口 */
export interface IVideoDetailFormat {
  type: number /** 视频类型 */;
  vid: string | number /** 视频id */;
  durationms: number /** 视频时长(毫秒) */;
  playTime: number /** 视频播放数 */;
  publishTime: string /** 视频发布时间 */;
  title: string /** 视频标题 */;
  description: string /** 视频描述 */;
  coverUrl: string /** 视频封面图片地址 */;
  creators: IVideoCreator[] /** 视频创建者(type === 1) */;
  videoGroup: IVideoGroupItem[];
  praisedCount?: number /** 视频点赞数 */;
  subscribeCount?: number /** 视频收藏数 */;
  shareCount?: number /** 视频分享数 */;
  commentCount: number /** 视频评论数 */;
}

/** 相似视频作者 */
export interface ISimilarArtist {
  alias: string[] /** 别名 */;
  id: number /** 作者id */;
  name: string /** 作者名 */;
  transNames: string /** 作者译名 */;
}

/** 相似MV接口 */
export interface ISimilarMV {
  id: number /** MV id */;
  name: string /** MV名称 */;
  playCount: number /** 播放量 */;
  duration: number /** MV时长（毫秒） */;
  cover: string /** MV封面图片地址 */;
  artistId: number /** MV作者id */;
  artistName: string /** MV作者名 */;
  artists: ISimilarArtist[];
}

/** 相关视频创建者 */
export interface IRelatedVideoCreator {
  userId: number /** 创建者id */;
  userName: string /** 创建者昵称 */;
}

/** 获取相关联视频 */
export interface IRelatedVideo {
  vid: string /** 视频id */;
  type: number /** 视频类型 */;
  title: string /** 视频标题 */;
  coverUrl: string /** 视频封面图片地址 */;
  durationms: number /** 视频时长(毫秒) */;
  playTime: number /** 视频播放数 */;
  creator: IRelatedVideoCreator[];
}

/** 相关视频格式化 */
export interface IRelatedVideoFormat {
  vid: string | number /** 视频id */;
  type: number /** 视频类型 */;
  title: string /** 视频标题 */;
  coverUrl: string /** 视频封面图片地址 */;
  durationms: number /** 视频时长(毫秒) */;
  playTime: number /** 视频播放数 */;
  creators: IRelatedVideoCreator[];
}
