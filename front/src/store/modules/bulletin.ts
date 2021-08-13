/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module } from "vuex";
import { IRootStateTypes } from "./interface";
import { IBulletinState, ILog } from "./interface/bulletin";

const ModuleBulletin: Module<IBulletinState, IRootStateTypes> = {
  namespaced: true,
  state: (): IBulletinState => ({
    hasNotified: false,
    currentBulletin: undefined,
    bulletinList: [],
  }),
  mutations: {
    setHasNotified(state: IBulletinState, hasNotified: boolean) {
      state.hasNotified = hasNotified;
    },
    /** 设置当前公告 */
    setCurrentBulletin(state: IBulletinState, currentBulletin: ILog) {
      state.currentBulletin = currentBulletin;
    },
    /** 设置公告列表 */
    setBulletinList(state: IBulletinState, bulletinList: ILog[]) {
      state.bulletinList = bulletinList;
    },
  },
  actions: {},
  getters: {},
};

export default ModuleBulletin;
