import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { Ref } from "vue";
import { useQuery } from "vue-query";
import type {
  ISongComments,
  ISubmitSongCommentParams,
  SubmitType,
} from "../interface/song-comments";

/**
 * 获取歌曲评论
 * @param songId 歌曲id
 * @param offset 分页偏移量
 * @param limit 每页条数
 */
const fetchSongCommentsById = async (
  songId: number,
  offset = 1,
  limit = 20
) => {
  return http<ISongComments>(
    {
      url:
        apis.fetchSongComment +
        `id=${songId}&offset=${(offset - 1) * limit}&limit=${limit}`,
    },
    ""
  );
};

/**
 * 获取歌曲评论hooks
 * @param songId 歌曲id
 * @param offset 分页偏移量
 * @param limit 每页条数
 */
export const useSongComments = (
  songId: Ref<number>,
  offset: Ref<number>,
  limit: Ref<number>
) => {
  return useQuery<ISongComments>(
    ["songComment", { songId, offset, limit }],
    () => fetchSongCommentsById(songId.value, offset.value, limit.value)
  );
};

export const submitSongComment = (
  type: SubmitType,
  id: number,
  content: string,
  commentId?: number
) => {
  let params: ISubmitSongCommentParams = {
    t: type,
    type: 0,
    id,
    content,
  };
  if (type === 2) {
    params.commentId = commentId;
  }
  let url =
    apis.submitComment +
    `?t=${params.t}&type=${params.type}&id=${params.id}&content=${params.content}`;
  if (params.commentId) {
    url += `&commentId=${params.commentId}`;
  }

  return http(
    {
      url,
    },
    ""
  );
};
