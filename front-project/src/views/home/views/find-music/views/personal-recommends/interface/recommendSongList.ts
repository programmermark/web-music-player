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
