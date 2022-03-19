import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { Ref } from "vue";
import { useInfiniteQuery } from "vue-query";
import type { IAlbum } from "../../artist-detail/interface";

/** 新歌速递: 根据类型获取最新专辑 */
const fetchAlbums = async (
  area: string,
  type: string,
  limit: number,
  offset: number
) => {
  /** 根据id获取歌单详情 */
  const allAlbums = await http<IAlbum[]>(
    {
      url:
        apis.latestSongsTopAlbum +
        `?limit=${limit}&offset=${offset}&area=${area}&type=${type}`,
    },
    "albums"
  );
  const albumList: IAlbum[] = allAlbums.map((album) => ({
    id: album.id,
    name: album.name,
    alias: album.alias,
    picUrl: album.picUrl,
    publishTime: album.publishTime,
    artists: (album.artists || []).map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
  }));
  return albumList;
};

export const useNewAlbum = (
  area: Ref<string>,
  type: Ref<string>,
  limit: number
) => {
  return useInfiniteQuery(
    reactive(["new-album", { area, type, limit }]),
    ({ pageParam = 1 }) =>
      fetchAlbums(area.value, type.value, limit, (pageParam - 1) * limit),
    {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length + 1;
      },
    }
  );
};
