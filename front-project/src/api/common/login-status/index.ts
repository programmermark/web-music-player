import { baseUrl } from "@/api/common";

export default {
  /** 获取登录状态 */
  loginStatus: baseUrl + "/login/status",
  /** 刷新登录状态 */
  loginRefresh: baseUrl + "/login/refresh",
};
