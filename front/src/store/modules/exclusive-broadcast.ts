/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ActionContext, Module } from "vuex";
import { IRootStateTypes } from "./interface";
import {
  IExclusiveBroadcast,
  IExclusiveBroadcastState,
  ISetListPayload,
  ISetListResponse,
} from "./interface/exclusive-broadcast";

const ModuleExclusiveBroadcast: Module<
  IExclusiveBroadcastState,
  IRootStateTypes
> = {
  namespaced: true,
  state: (): IExclusiveBroadcastState => ({
    hasMore: true,
    limit: 30,
    offset: 0,
    list: [],
  }),
  mutations: {
    setHasMore(state: IExclusiveBroadcastState, hasMore: boolean) {
      state.hasMore = hasMore;
    },
    setLimit(state: IExclusiveBroadcastState, limit: number) {
      state.limit = limit;
    },
    setOffset(state: IExclusiveBroadcastState, offset: number) {
      state.offset = offset;
    },
    setList(state: IExclusiveBroadcastState, list: IExclusiveBroadcast[]) {
      state.list = list;
    },
    setListConcat(
      state: IExclusiveBroadcastState,
      list: IExclusiveBroadcast[]
    ) {
      state.list = state.list.concat(list);
    },
  },
  actions: {
    /** 独家放送 */
    async setList(
      context: ActionContext<IExclusiveBroadcastState, IRootStateTypes>,
      payload: ISetListPayload
    ) {
      const { limit, offset } = payload;
      context.commit("setOffset", offset);
      /** 根据独家放送MV列表 */
      const { more, result } = await http<ISetListResponse>(
        {
          url: `${apis.exclusiveBroadcastList}?limit=${limit}&offset=${offset}`,
        },
        ""
      );
      context.commit("setHasMore", more);
      const list = result.map((item) => ({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        sPicUrl: item.sPicUrl,
      }));
      if (offset > 0) {
        context.commit("setListConcat", list);
      } else {
        context.commit("setList", list);
      }
    },
  },
  getters: {},
};

export default ModuleExclusiveBroadcast;
