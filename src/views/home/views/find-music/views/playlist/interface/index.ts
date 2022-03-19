export interface IPlayListItem {
  id: number /** 歌单id */;
  name: string /** 歌单名称 */;
  coverImgUrl: string /** 歌单封面url */;
  playCount: number /** 歌单播放量 */;
  creator: {
    id: number /** 歌单创建者id */;
    nickname: string /** 歌单创建者名称 */;
  };
}

export interface IPlaylistState {
  loading: boolean /** 是否显示loading */;
  limit: number /** 分页条数 */;
  page: number /** 当前分页数 */;
  total: number /** 总歌单数量 */;
  playlists: IPlayListItem[];
}

export interface IPlaylistResponse {
  total: number /** 总歌单数量 */;
  playlists: IPlayListItem[];
}
