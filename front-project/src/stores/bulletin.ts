import { defineStore } from "pinia";
import type { IBulletinState } from "./interface/bulletin";

/* 日志 */
export const useBulletinStore = defineStore({
  id: "bulletin",
  state: (): IBulletinState => ({
    hasNotified: false,
    currentBulletin: undefined,
    bulletinList: [],
  }),
  getters: {},
  actions: {},
  persist: true,
});
