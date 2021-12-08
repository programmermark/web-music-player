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
  publishTime: number /** 发布时间 */;
  duration: number /** MV时长（毫秒） */;
  cover: string /** MV封面图片地址 */;
  coverUrl?: string /** MV封面图片地址 */;
  imgurl16v9?: string /** MV封面图片地址 */;
  artists: IMVArtist[];
  desc: string /** MV详细描述 */;
  brs: IBR[];
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

/** 相似MV接口 */
export interface ISimilarMV {
  id: number /** MV id */;
  name: string /** MV名称 */;
  playCount: number /** 播放量 */;
  duration: number /** MV时长（毫秒） */;
  cover: string /** MV封面图片地址 */;
  artistId: number /** MV作者id */;
  artistName: string /** MV作者名 */;
}
