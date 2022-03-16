import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { ICatListState, IHotCat } from "./interface/catlist";

/* 分类列表 */
export const useCatlistStore = defineStore({
  id: "catlist",
  state: (): ICatListState => ({
    currentCat: "",
    hotCatList: [],
  }),
  getters: {},
  actions: {
    /** 获取热门歌单分类 */
    async setHotCatList() {
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
      this.hotCatList = catList;
    },
  },
  persist: true,
});
