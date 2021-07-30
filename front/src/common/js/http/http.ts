import axios from "axios";
import { ElMessage as message } from "element-plus";
import { HttpParams } from "./interface";

/**
 * ajax请求通用方法，基于axios
 * @param {String} method  异步请求的方式，如：post、get等
 * @param {String} url     异步请求的地址
 * @param {Object} data    发送的数据
 * @param {Boolean} withCredentials
 * @param {String} keyName 返回结果的键名
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function http<T>(params: HttpParams, keyName?: string) {
  const { method = "get", url, data, withCredentials = true } = params;
  return new Promise<T>((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data,
      withCredentials: withCredentials,
    })
      .then((res) => {
        const result: any = res.data;
        if (result.code == 200) {
          result.message && message.success(result.message);
          if (keyName) {
            resolve(result[keyName]);
          }
          resolve(result);
        } else {
          result.message && message.warning(result.message);
          if (keyName) {
            resolve(result[keyName]);
          }
          resolve(result);
          /** 调用接口没有注册，回到登录页面 */
          if (result.unlogin) {
            if (window.location.pathname !== "/login") {
              window.location.href = window.location.origin + "/login";
            }
          }
        }
      })
      .catch((error) => {
        message({
          type: "error",
          message: "服务器异常，请联系网站工作人员处理！",
          duration: 2000,
        });
        reject(error);
      });
  });
}

export default http;
