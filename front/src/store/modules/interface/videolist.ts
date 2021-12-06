/** 视频标签接口定义 */
export interface IVideoTag {
  id: number;
  name: string;
}

export interface IVideoListState {
  videoGroupList: IVideoTag[];
  videoCategoryList: IVideoTag[];
}
