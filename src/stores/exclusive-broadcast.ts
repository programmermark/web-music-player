import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type {
  IExclusiveBroadcastState,
  ISetListPayload,
  ISetListResponse,
} from "./interface/exclusive-broadcast";

/* 独家放送 */
export const useExclusiveBroadcastStore = defineStore({
  id: "exclusive-broadcast",
  state: (): IExclusiveBroadcastState => ({
    hasMore: true,
    limit: 30,
    offset: 0,
    list: [],
  }),
  getters: {},
  actions: {
    /** 独家放送 */
    async setList(payload: ISetListPayload) {
      const { limit, offset } = payload;
      this.offset = offset;
      /** 根据独家放送MV列表 */
      const { more, result } = await http<ISetListResponse>(
        {
          url: `${apis.exclusiveBroadcastList}?limit=${limit}&offset=${offset}`,
        },
        ""
      );
      this.hasMore = more;
      const list = result.map((item) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        sPicUrl: item.sPicUrl,
      }));
      if (offset > 0) {
        this.list = this.list.concat(list);
      } else {
        this.list = list;
      }
    },
  },
  persist: true,
});
