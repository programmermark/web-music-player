/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IVideoCategory } from "@/views/home/components/main-content/views/video-list/interface";
import { Module } from "vuex";
import { IRootStateTypes } from "./interface";
import { IVideoListState } from "./interface/videolist";

const ModuleVideoList: Module<IVideoListState, IRootStateTypes> = {
  namespaced: true,
  state: (): IVideoListState => ({
    currentCategory: null,
  }),
  mutations: {
    setCurrentCategory(
      state: IVideoListState,
      category: IVideoCategory | null
    ) {
      state.currentCategory = category;
    },
  },
  actions: {},
  getters: {},
};

export default ModuleVideoList;
