export interface IPlaylistInfo {
  id: number /** 歌单id */;
  name: string /** 歌单名 */;
  coverImgUrl: string /** 歌单封面 */;
  description: string /** 描述 */;
  tags: string[] /** 歌单标签 */;
  trackCount: number /** 歌曲数量 */;
  playCount: number /** 歌曲播放数 */;
  subscribedCount: number /** 收藏数 */;
  createTime: number /** 创建时间（时间戳） */;
  creator: {
    userId: number /** 创建者id */;
    nickname: string /** 创建者名 */;
    avatarUrl: string /** 创建者头像 */;
  };
}
