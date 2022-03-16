import { defineStore } from "pinia";
import type { IVideoListState } from "./interface/videolist";

/* 视频列表状态管理 */
export const useVideoListStore = defineStore({
  id: "video-list",
  state: (): IVideoListState => ({
    currentCategory: null,
  }),
  getters: {},
  actions: {},
  persist: true,
});
