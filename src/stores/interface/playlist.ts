export interface IPlaylistState {
  currentPlaylist?: IPlaylist /** 当前歌单 */;
  allPlayList: IPlaylist[] /** 所有歌单 */;
}

export interface IPlaylist {
  id: number /** 歌单id */;
  name: string /** 歌单名称 */;
  coverImgUrl: string /** 歌单封面地址 */;
  isSelfCreated: boolean /** 是否用户自己创建 */;
}

export interface IUserPlaylist {
  id: number /** 歌单id */;
  name: string /** 歌单名称 */;
  coverImgUrl: string /** 歌单封面地址 */;
  userId: number /** 是否用户自己创建 */;
}
