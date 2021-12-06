/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useQuery } from "vue-query";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";

import { IVideoListState, IVideoTag } from "./interface/videolist";

const ModuleVideolist: Module<IVideoListState, IRootStateTypes> = {
  namespaced: true,
  state: (): IVideoListState => ({
    videoGroupList: [],
    videoCategoryList: [],
  }),
  mutations: {
    setVideoGroupList(state: IVideoListState, tagList: IVideoTag[]) {
      state.videoGroupList = tagList;
    },
    setVideoCategoryList(state: IVideoListState, tagList: IVideoTag[]) {
      state.videoCategoryList = tagList;
    },
  },
  actions: {
    /** 获取视频标签列表 */
    async setVideoGroupList(
      context: ActionContext<IVideoListState, IRootStateTypes>
    ) {
      const { isLoading, data } = useQuery<IVideoTag[]>(
        ["videoGroupList"],
        async () => {
          const tagList = await http<IVideoTag[]>(
            { url: apis.videoGroupList },
            "data"
          );
          return tagList.map((tag) => ({
            id: tag.id,
            name: tag.name,
          }));
        }
      );
      // const tagList = await http<IVideoTag[]>(
      //   { url: apis.videoGroupList },
      //   "playlist"
      // );
      // const allPlaylist = allUserPlaylist.map((userPlaylist) => ({
      //   id: userPlaylist.id,
      //   name: userPlaylist.name,
      //   coverImgUrl: userPlaylist.coverImgUrl,
      //   isSelfCreated: userPlaylist.userId === userId,
      // }));
      // context.commit("setAllPlaylist", allPlaylist);
    },
  },
  getters: {},
};

export default ModuleVideolist;
