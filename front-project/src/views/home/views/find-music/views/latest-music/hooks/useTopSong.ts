import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { ISong } from "@/stores/interface/latest-music";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

const fetchTopSong = async (type: number) => {
  /** 根据id获取歌单详情 */
  const allSongs = await http<ISong[]>(
    { url: apis.latestSongsTopSong + `?type=${type}` },
    "data"
  );
  const songList: ISong[] = allSongs.map((songs) => ({
    id: songs.id,
    name: songs.name,
    alias: songs.alias,
    duration: songs.duration,
    mp3Url: songs.mp3Url,
    album: {
      id: songs.album.id,
      name: songs.album.name,
      picUrl: songs.album.picUrl,
      publishTime: songs.album.publishTime,
    },
    artists: songs.artists.map((item) => ({
      id: item.id,
      name: item.name,
      cover: item.cover,
    })),
  }));
  return songList;
};

export const useTopSong = (type: Ref<number>) => {
  return useQuery(reactive(["fetchTopSong", { type }]), () =>
    fetchTopSong(type.value)
  );
};
