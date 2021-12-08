import { IMVArtist } from "@/views/home/components/mv-detail/interface";
import { IArtist } from "../../artist-detail/interface";

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

export interface IMVVideo {
  id: number /** MV id */;
  name: string /** MV名称 */;
  playCount: number /** 播放量 */;
  publishTime: number /** 发布时间 */;
  duration: number /** MV时长（毫秒） */;
  coverUrl: string /** MV封面图片地址 */;
  imgurl16v9: string /** MV封面图片地址 */;
  artists: IMVArtist[];
  desc: string /** MV详细描述 */;
}

/** 格式化后统一的video接口 */
export interface IFormatVideo {
  id: string | number /** 视频id */;
  type: 1 | 2; // 1: 视频 2: MV
  title: string /** 视频标题 */;
  playCount: number /** 播放量 */;
  duration: number /** MV时长（毫秒） */;
  cover: string /** MV封面图片地址 */;
  artists: IArtist[];
}

export interface IVideoItem {
  // type: 1 | 2; // 1: 视频 2: MV
  // data: IVideo;
  type: 1 | 2; // 1: 视频 2: MV
  data: IVideo | IMVVideo;
}

export interface IVideoListResponse {
  datas: IVideoItem[];
  hasmore: boolean;
}
