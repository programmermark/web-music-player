import { defineStore } from "pinia";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { ILogin, ILoginState, IUser, IUserInfo } from "./interface/login";

/* 登录状态管理 */
export const useLoginStore = defineStore({
  id: "login",
  state: (): ILoginState => ({
    hasLogged: false /** 是否已登录 */,
    userInfo: undefined /** 用户信息（登录获取） */,
  }),
  getters: {},
  actions: {
    /** 用户登录 */
    async setUserInfo(loginInfo: ILogin) {
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
      this.hasLogged = true;
      this.userInfo = userInfo;
    },
    /** 用户退出登录 */
    async setLogOut() {
      await http({ url: apis.logout });
      this.hasLogged = false;
      this.userInfo = undefined;
    },
  },
  persist: true,
});
