import { apis } from "@/api";
import { http } from "@/common/js/http";
import { highLightKeywords } from "@/common/js/util";
import { ComputedRef, onMounted, reactive, watch } from "vue";
import {
  ISearchContentAlbum,
  ISearchContentAlbumResponse,
  ISearchContentAlbumState,
  ISearchContentArtist,
  ISearchContentArtistResponse,
  ISearchContentArtistState,
  ISearchContentMV,
  ISearchContentMVResponse,
  ISearchContentMVState,
  ISearchContentPlaylist,
  ISearchContentPlaylistResponse,
  ISearchContentPlaylistState,
  ISearchContentSong,
  ISearchContentSongResponse,
  ISearchContentSongState,
  SearchTypeValue,
} from "../interface";

/**
 * 获取搜索内容（歌曲）
 */
const fetchSearchContentSong = async (
  keywords: string,
  type: SearchTypeValue = "1",
  limit = 100,
  offset = 0
) => {
  const { songCount, songs } = await http<ISearchContentSongResponse>(
    {
      url: `${apis.searchResult}?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`,
    },
    "result"
  );
  const formatSongs: ISearchContentSong[] = songs.map((song) => ({
    id: song.id,
    name: highLightKeywords(keywords, song.name, "text-blue-500"),
    mvid: song.mvid,
    album: {
      id: song.album.id,
      name: highLightKeywords(keywords, song.album.name, "text-blue-500"),
      alia: song.album.alia,
      artist: {
        id: song.album.artist.id,
        name: song.album.artist.name,
        img1v1Url: song.album.artist.img1v1Url,
      },
    },
    artists: song.artists.map((artist) => ({
      id: artist.id,
      name: highLightKeywords(keywords, artist.name, "text-blue-500"),
      img1v1Url: artist.img1v1Url,
    })),
    duration: song.duration,
    transNames: song.transNames,
  }));
  return {
    songCount,
    songs: formatSongs,
  };
};

/**
 * 获取搜索内容（歌手）
 */
const fetchSearchContentArtist = async (
  keywords: string,
  type: SearchTypeValue = "100",
  limit = 30,
  offset = 0
) => {
  const { artistCount, artists } = await http<ISearchContentArtistResponse>(
    {
      url: `${apis.searchResult}?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`,
    },
    "result"
  );
  const formatArtists: ISearchContentArtist[] = artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    img1v1Url: artist.img1v1Url,
  }));
  return {
    artistCount,
    artists: formatArtists,
  };
};

/**
 * 获取搜索内容（专辑）
 */
const fetchSearchContentAlbum = async (
  keywords: string,
  type: SearchTypeValue = "100",
  limit = 20,
  offset = 0
) => {
  const { albumCount, albums } = await http<ISearchContentAlbumResponse>(
    {
      url: `${apis.searchResult}?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`,
    },
    "result"
  );
  const formatAlbum: ISearchContentAlbum[] = albums.map((album) => ({
    id: album.id,
    name: album.name,
    alia: album.alia,
    artist: {
      id: album.artist.id,
      name: album.artist.name,
      img1v1Url: album.artist.img1v1Url,
    },
  }));
  return {
    albumCount,
    albums: formatAlbum,
  };
};

/**
 * 获取搜索内容（MV）
 */
const fetchSearchContentMV = async (
  keywords: string,
  type: SearchTypeValue = "1014",
  limit = 20,
  offset = 0
) => {
  const { videoCount, videos } = await http<ISearchContentMVResponse>(
    {
      url: `${apis.searchResult}?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`,
    },
    "result"
  );
  const formatMV: ISearchContentMV[] = videos.map((video) => ({
    id: video.id,
    name: video.name,
    coverUrl: video.coverUrl,
    duration: video.duration,
    playTime: video.playTime,
    creator: video.creator.map((item) => ({
      userId: item.userId,
      userName: item.userName,
    })),
  }));
  return {
    videoCount,
    videos: formatMV,
  };
};

/**
 * 获取搜索内容（歌单）
 */
const fetchSearchContentPlaylist = async (
  keywords: string,
  type: SearchTypeValue = "1000",
  limit = 20,
  offset = 0
) => {
  const { playlistCount, playlists } =
    await http<ISearchContentPlaylistResponse>(
      {
        url: `${apis.searchResult}?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`,
      },
      "result"
    );
  const formatMV: ISearchContentPlaylist[] = playlists.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    coverImgUrl: playlist.coverImgUrl,
    trackCount: playlist.trackCount,
    creator: {
      userId: playlist.creator.userId,
      nickname: playlist.creator.nickname,
      avatarUrl: playlist.creator.avatarUrl,
    },
  }));
  return {
    playlistCount,
    playlists: formatMV,
  };
};

export const useContentResult = (
  keywords: ComputedRef<string>,
  type: ComputedRef<SearchTypeValue>,
  limit: ComputedRef<number>,
  offset: ComputedRef<number>
) => {
  /** 单曲 */
  const songState = reactive<ISearchContentSongState>({
    songCount: 0 /** 搜索到的歌曲总数量 */,
    songs: [] /** 歌曲列表 */,
    limit: 100,
    offset: 0,
    loading: true,
  });

  /** 歌手 */
  const artistState = reactive<ISearchContentArtistState>({
    artistCount: 0 /** 搜索到的歌手总数量 */,
    artists: [] /** 歌手列表 */,
    limit: 30,
    offset: 0,
    loading: true,
  });

  /** 专辑 */
  const albumState = reactive<ISearchContentAlbumState>({
    albumCount: 0 /** 搜索到的专辑总数量 */,
    albums: [] /** 专辑列表 */,
    limit: 20,
    offset: 0,
    loading: true,
  });

  /** 视频 */
  const mvState = reactive<ISearchContentMVState>({
    videoCount: 0 /** 搜索到的MV总数量 */,
    videos: [] /** MV列表 */,
    limit: 20,
    offset: 0,
    loading: true,
  });

  /** 歌单 */
  const playlistState = reactive<ISearchContentPlaylistState>({
    playlistCount: 0 /** 搜索到的歌单总数量 */,
    playlists: [] /** 歌单列表 */,
    limit: 20,
    offset: 0,
    loading: true,
  });

  /**
   * 获取搜索结果
   */
  const fetchSearchResult = async (
    keywords: string,
    type: SearchTypeValue,
    limit: number,
    offset: number
  ) => {
    switch (type) {
      case "1":
        songState.loading = true;
        const { songCount, songs } = await fetchSearchContentSong(
          keywords,
          type,
          limit,
          offset
        );
        songState.songCount = songCount;
        songState.songs = songs;
        songState.loading = false;
        break;
      case "10":
        const { albumCount, albums } = await fetchSearchContentAlbum(
          keywords,
          type,
          limit,
          offset
        );
        albumState.albumCount = albumCount;
        albumState.albums = albums;
        break;
      case "100":
        const { artistCount, artists } = await fetchSearchContentArtist(
          keywords,
          type,
          limit,
          offset
        );
        artistState.artistCount = artistCount;
        artistState.artists = artists;
        break;
      case "1014":
        const { videoCount, videos } = await fetchSearchContentMV(
          keywords,
          type,
          limit,
          offset
        );
        mvState.videoCount = videoCount;
        mvState.videos = videos;
        break;
      case "1000":
        const { playlistCount, playlists } = await fetchSearchContentPlaylist(
          keywords,
          type,
          limit,
          offset
        );
        playlistState.playlistCount = playlistCount;
        playlistState.playlists = playlists;
        break;
      default:
        const result = await fetchSearchContentSong(
          keywords,
          type,
          limit,
          offset
        );
        songState.songCount = result.songCount;
        songState.songs = result.songs;
        break;
    }
  };

  watch(
    [keywords, type, limit, offset],
    (
      [newKeywords, newType, newLimit, newOffset],
      [oldKeywords, oldType, oldLimit, oldOffset]
    ) => {
      if (
        newKeywords !== oldKeywords ||
        newType !== oldType ||
        newLimit !== oldLimit ||
        newOffset !== oldOffset
      ) {
        fetchSearchResult(newKeywords, newType, newLimit, newOffset);
      }
    }
  );

  onMounted(() => {
    fetchSearchResult(keywords.value, type.value, limit.value, offset.value);
  });

  return {
    songState,
    artistState,
    albumState,
    mvState,
    playlistState,
  };
};
