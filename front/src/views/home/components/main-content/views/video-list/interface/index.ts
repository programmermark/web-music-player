/**
 * 0: 未知
 * 1: 男
 * 2: 女
 */
export type Gender = 0 | 1 | 2;

export interface IVideoCategory {
  id: number;
  name: string;
}

export interface IVideoCreator {
  userId: number;
  nickname: string /** 昵称 */;
  gender: Gender /** 性别 */;
  signature: string /** 个人简介 */;
}

export interface IVideo {
  vid: string /** 视频id */;
  title: string /** 视频标题 */;
  durationms: number /** 视频时长（毫秒） */;
  playTime: number /** 播放量 */;
  coverUrl: string /** 视频封面图 */;
  previewUrl: string /** 视频预览图 */;
  description: string /** 视频描述 */;
  creator: IVideoCreator /** 视频创建者 */;
}

export interface IVideoItem {
  data: IVideo;
}

export interface IVideoListResponse {
  datas: IVideoItem[];
  hasmore: boolean;
}
