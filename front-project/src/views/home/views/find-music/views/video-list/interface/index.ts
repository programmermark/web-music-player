import { IMVArtist } from "@/views/home/components/mv-detail/interface";
import { IArtist } from "../../artist-detail/interface";

/**
 * 0: 未知
 * 1: 男
 * 2: 女
 */
export type Gender = 0 | 1 | 2;

export type VideoType = 1 | 2 | 7; // 1: 视频 2: MV 7: 直播

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

/** 直播电台接口定义 */
export interface IRadioVideo {
  liveData: {
    type: string;
    liveRoom: {
      coverTag: string /** 直播间标签 */;
      coverUrl: string /** 直播间封面图片 */;
      liveId: number /** 直播间数据id（唯一标识） */;
      liveRoomNo: string /** 直播间id */;
      liveStatus: number /** 直播间状态（0：未开播，1：直播中） */;
      popularity: number /** 直播间人气 */;
      title: string /** 直播间标题 */;
    };
    liveUser: {
      avatarUrl: string /** 用户头像 */;
      nickName: string /** 用户昵称 */;
      userId: number /** 用户id */;
    };
  };
}

export interface IFormatArtist {
  id: number;
  name: string /** 视频作者 */;
  isArtist: boolean /** 用户类型，true: 歌手， false: 普通用户 */;
}

/** 格式化后统一的video接口 */
export interface IFormatVideo {
  id: string | number /** 视频id */;
  type: VideoType;
  title: string /** 视频标题 */;
  playCount?: number /** 播放量 */;
  popularityDegree?: number /** 直播间热度 */;
  duration?: number /** MV时长（毫秒） */;
  cover: string /** MV封面图片地址 */;
  artists: IFormatArtist[];
}

export interface IVideoItem {
  type: VideoType;
  data: IVideo | IMVVideo | IRadioVideo;
}

export interface IVideoListResponse {
  datas: IVideoItem[];
  hasmore: boolean;
}
