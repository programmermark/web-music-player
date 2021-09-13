/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ActionContext, Module } from "vuex";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { ILogin, ILoginState, IUser, IUserInfo } from "./interface/login";
import { IRootStateTypes } from "./interface";

const ModuleLogin: Module<ILoginState, IRootStateTypes> = {
  namespaced: true,
  state: (): ILoginState => ({
    hasLogged: false /** 是否已登录 */,
    userInfo: undefined /** 用户信息（登录获取） */,
  }),
  mutations: {
    setHasLogged(state: ILoginState, hasLogged: boolean) {
      state.hasLogged = hasLogged;
    },
    setUserInfo(state: ILoginState, userInfo: IUser) {
      state.userInfo = userInfo;
    },
    setLogOut(state: ILoginState) {
      state.hasLogged = false;
      state.userInfo = undefined;
    },
  },
  actions: {
    /** 用户登录 */
    async setUserInfo(
      context: ActionContext<ILoginState, IRootStateTypes>,
      loginInfo: ILogin
    ) {
      const { phone, password } = loginInfo;
      const loginUrl = `${apis.login}?phone=${phone}&password=${password}`;
      const result = await http<IUserInfo>({ url: loginUrl });
      const userInfo: IUser = {
        id: result.account.id,
        nickname: result.profile.nickname,
        token: result.token,
        cookie: result.cookie,
        avatarUrl: result.profile.avatarUrl,
        eventCount: result.profile.eventCount,
        followeds: result.profile.followeds,
        follows: result.profile.follows,
      };
      context.commit("setHasLogged", true);
      context.commit("setUserInfo", userInfo);
    },
    /** 用户退出登录 */
    async setLogOut(context: ActionContext<ILoginState, IRootStateTypes>) {
      await http({ url: apis.logout });
      context.commit("setLogOut");
    },
  },
  getters: {},
};
export default ModuleLogin;
