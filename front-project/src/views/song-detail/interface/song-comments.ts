/**
 * 1: 发表评论
 * 2: 回复评论
 */
export type SubmitType = 1 | 2;

/**
 * 单条歌曲评论接口定义
 */
export interface ISongComment {
  beReplied: number[] /** 被回复的评论id */;
  commentId: number /** 评论id */;
  content: string /** 评论内容 */;
  liked: boolean /** 是否已经点赞 */;
  likedCount: number /** 点赞数 */;
  parentCommentId: number /** 父评论id */;
  time: number /** 评论时间（时间戳，精确到毫秒） */;
  timeStr: string /** 评论时间（字符串） */;
  user: ISongCommentUser /** 评论者信息 */;
}

export interface ISongCommentUser {
  avatarUrl: string /** 用户头像 */;
  nickname: string /** 用户昵称 */;
  userId: number /** 用户id */;
  userType: number /** 用户类型 */;
}

/**
 * 歌曲评论接口定义
 */
export interface ISongComments {
  comments: ISongComment[] /** 评论列表 */;
  hotComments?: ISongComment[] /** 热门评论 */;
  topComments: ISongComment[] /** 置顶评论 */;
  total: number /** 评论总数 */;
}

/**
 * 发表评论接口参数
 */
export interface ISubmitSongCommentParams {
  t: SubmitType /** 发送｜回复 */;
  type: number /** 资源类型 */;
  id: number /** 资源id */;
  content: string /** 评论内容 */;
  commentId?: number /** 回复评论id */;
}
