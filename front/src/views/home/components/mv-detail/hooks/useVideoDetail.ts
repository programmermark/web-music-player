import { apis } from "@/api";
import { http } from "@/common/js/http";
import { formatTime } from "@/common/js/util";
import { toRefs, ref } from "vue";
import { useQuery } from "vue-query";
import {
  IMVDetail,
  IMVInfo,
  IVideoCreator,
  IVideoDetail,
  IVideoDetailFormat,
} from "../interface";

/**
 * 获取MV详情
 */
const fetchMVDetail = async (id: number, type = 1) => {
  const data = await http<IMVDetail>(
    { url: `${apis.mvDetail}?mvid=${id}` },
    "data"
  );
  const mvDetail: IVideoDetailFormat = {
    type: type,
    vid: data.id,
    durationms: data.duration,
    playTime: data.playCount,
    publishTime: data.publishTime,
    title: data.name,
    description: data.desc,
    coverUrl: data.cover,
    creators: data.artists.map(
      (artist) =>
        ({
          avatarUrl: artist.img1v1Url,
          nickname: artist.name,
          userId: artist.id,
          userType: type,
        } as IVideoCreator)
    ),
    videoGroup: data.videoGroup,
    commentCount: data.commentCount,
  };
  return mvDetail;
};

/** 获取MV的点赞数、收藏数、分享数 */
const fetchMVIfo = async (id: number) => {
  const data = await http<IMVInfo>({ url: `${apis.mvInfo}?mvid=${id}` }, "");
  return data;
};

/** 获取视频详情 */
const fetchVideoDetail = async (id: string, type = 2) => {
  const data = await http<IVideoDetail>(
    { url: `${apis.videoDetail}?id=${id}` },
    "data"
  );
  const mvDetail: IVideoDetailFormat = {
    type: type,
    vid: data.vid,
    durationms: data.durationms,
    playTime: data.playTime,
    publishTime: formatTime(data.publishTime, "yyyy-MM-dd"),
    title: data.title,
    description: data.description,
    coverUrl: data.coverUrl,
    creators: [data.creator],
    videoGroup: data.videoGroup,
    commentCount: data.commentCount,
    praisedCount: data.praisedCount,
    subscribeCount: data.subscribeCount,
    shareCount: data.shareCount,
  };
  return mvDetail;
};

/**
 * 根据视频类型获取视频url
 * @param id 视频id
 * @param type 视频类型：1-MV，2-视频
 * @returns
 */
const fetchVideoUrl = async (id: number | string, type: number) => {
  if (type === 1) {
    const { url } = await http<{ url: string }>(
      { url: `${apis.mvUrl}?id=${id}` },
      "data"
    );
    return url;
  } else {
    const urls = await http<{ url: string }[]>(
      { url: `${apis.videoUrl}?id=${id}` },
      "urls"
    );
    return urls[0].url;
  }
};

/**
 * 获取视频详情
 * @param id 视频id
 * @param type 视频类型：1-MV，2-视频
 * @returns
 */
export const useVideoDetail = (id: number | string, type: number) => {
  if (type === 1) {
    return useQuery(["fetchVideoDetail", { id, type }], () =>
      fetchMVDetail(id as number, type)
    );
  } else {
    return useQuery(["fetchVideoDetail", { id, type }], () =>
      fetchVideoDetail(id as string, type)
    );
  }
};

/**
 * 获取MV(视频类型： type === 1)详情信息
 * @param id 视频id
 * @returns
 */
export const useVideoInfo = (id: number | string) => {
  return useQuery(["fetchMVIfo", { id }], () => fetchMVIfo(id as number));
};

/**
 * 获取视频url
 * @param id 视频id
 * @param type 视频类型：1-MV，2-视频
 * @returns
 */
export const useVideoUrl = (id: number | string, type: number) => {
  return useQuery(["fetchVideoUrl", { id, type }], () =>
    fetchVideoUrl(id, type)
  );
};
