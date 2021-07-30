/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, Store, useStore as baseUseStore } from "vuex";
import ModulePlayer from "./modules/player";
import ModuleLogin from "./modules/login";
import { IAllStateTypes, IRootStateTypes } from "./modules/interface";
import { InjectionKey } from "vue";

export default createStore<IRootStateTypes>({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    player: ModulePlayer,
    login: ModuleLogin,
  },
});

// 定义注入类型
export const key: InjectionKey<Store<IRootStateTypes>> = Symbol("vue-store");

export function useStore<T = IAllStateTypes>() {
  return baseUseStore<T>(key);
}
