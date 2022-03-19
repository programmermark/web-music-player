export interface IExclusiveBroadcastState {
  hasMore: boolean /** 是否还有数据 */;
  limit: number;
  offset: number;
  list: IExclusiveBroadcast[] /** 独家放送MV列表 */;
}

/** 独家放送MV */
export interface IExclusiveBroadcast {
  id: number /** MV id */;
  name: string /** MV名称 */;
  picUrl: string /** MV封面（扁平） */;
  sPicUrl: string /** MV封面 */;
}

/** 获取独家放送MV的参数 */
export interface ISetListPayload {
  limit: number;
  offset: number;
}

export interface ISetListResponse {
  more: boolean /** 是否还有更多数据 */;
  result: IExclusiveBroadcast[] /** 独家放送MV列表 */;
}
