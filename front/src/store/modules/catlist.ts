/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import { ICatListState, IHotCat } from "./interface/catlist";

const ModuleCatList: Module<ICatListState, IRootStateTypes> = {
  namespaced: true,
  state: (): ICatListState => ({
    currentCat: "",
    hotCatList: [],
  }),
  mutations: {
    setCurrentCat(state: ICatListState, catName: string) {
      state.currentCat = catName;
    },
    setHotCatList(state: ICatListState, catList: IHotCat[]) {
      state.hotCatList = catList;
    },
  },
  actions: {
    /** 获取热门歌单分类 */
    async setHotCatList(
      context: ActionContext<ICatListState, IRootStateTypes>
    ) {
      /** 获取热门歌单分类 */
      const tags = await http<IHotCat[]>(
        { url: apis.playlistHotCatList },
        "tags"
      );
      const catList = tags.map((cat) => ({
        id: cat.id,
        name: cat.name,
        category: cat.category,
        hot: cat.hot,
      }));
      context.commit("setHotCatList", catList);
    },
  },
  getters: {},
};

export default ModuleCatList;
