import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useQuery } from "vue-query";
import { IRelatedVideo, IRelatedVideoFormat, ISimilarMV } from "../interface";

/**
 * 获取相似MV
 * @param id MV id
 */
const fetchSimilarMV = async (id: number, type = 1) => {
  const mvs = await http<ISimilarMV[]>(
    { url: `${apis.similarMvList}?mvid=${id}` },
    "mvs"
  );
  const formatMvList: IRelatedVideoFormat[] = mvs.map((mv) => ({
    vid: mv.id,
    type,
    title: mv.name,
    coverUrl: mv.cover,
    durationms: mv.duration,
    playTime: mv.playCount,
    creators: mv.artists.map((artist) => ({
      userId: artist.id,
      userName: artist.name,
    })),
  }));
  return formatMvList;
};

/**
 * 获取相关视频
 * @param id 视频id
 */
const fetchRelatedVideo = async (id: string, type = 2) => {
  const mvs = await http<IRelatedVideo[]>(
    { url: `${apis.similarVideoList}?id=${id}` },
    "data"
  );
  const formatVideoList: IRelatedVideoFormat[] = mvs.map((mv) => ({
    vid: mv.vid,
    type,
    title: mv.title,
    coverUrl: mv.coverUrl,
    durationms: mv.durationms,
    playTime: mv.playTime,
    creators: mv.creator,
  }));
  return formatVideoList;
};

/**
 * 获取相关视频列表
 * @param id 视频id
 * @param type 视频类型：1-MV，2-视频
 * @returns
 */
export const useRelatedVideo = (id: number | string, type: number) => {
  if (type === 1) {
    return useQuery(["fetchSimilarVideo", { id, type }], () =>
      fetchSimilarMV(id as number, type)
    );
  } else {
    return useQuery(["fetchSimilarVideo", { id, type }], () =>
      fetchRelatedVideo(id as string, type)
    );
  }
};
