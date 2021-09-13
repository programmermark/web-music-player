import { IArtist } from "../../artist-detail/interface";

export interface IRecommendMv {
  id: number;
  name: string /** MV名称 */;
  copywriter: string /** MV副标题 */;
  picUrl: string /** 封面图片地址 */;
  artists: IArtist[] /** MV作者 */;
  playCount: number /** 播放量 */;
}
