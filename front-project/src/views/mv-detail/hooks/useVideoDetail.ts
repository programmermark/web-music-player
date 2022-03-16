import { apis } from "@/api";
import { http } from "@/common/js/http";
import { formatTime } from "@/common/js/util";
import { type ComputedRef, reactive, type Ref } from "vue";
import { useQuery } from "vue-query";
import type {
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
export const useVideoDetail = (
  id: Ref<number | string>,
  type: ComputedRef<number>
) => {
  if (type.value === 1) {
    return useQuery(reactive(["fetchVideoDetail", { id, type }]), () =>
      fetchMVDetail(id.value as number, type.value)
    );
  } else {
    return useQuery(reactive(["fetchVideoDetail", { id, type }]), () =>
      fetchVideoDetail(id.value as string, type.value)
    );
  }
};

/**
 * 获取MV(视频类型： type === 1)详情信息
 * @param id 视频id
 * @returns
 */
export const useVideoInfo = (id: Ref<number | string>) => {
  return useQuery(reactive(["fetchMVIfo", { id }]), () =>
    fetchMVIfo(id.value as number)
  );
};

/**
 * 获取视频url
 * @param id 视频id
 * @param type 视频类型：1-MV，2-视频
 * @returns
 */
export const useVideoUrl = (
  id: Ref<number | string>,
  type: ComputedRef<number>
) => {
  return useQuery(reactive(["fetchVideoUrl", { id, type }]), () =>
    fetchVideoUrl(id.value as string, type.value)
  );
};
