import { IVideoCategory } from "@/views/home/components/main-content/views/video-list/interface";

export interface IVideoListState {
  /** 当前视频分类 */
  currentCategory: IVideoCategory | null;
}
