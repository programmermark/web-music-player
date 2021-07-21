export interface HttpParams {
  method?:
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST" /** 异步请求的方式，如：post、get等 */;
  url: string /** 异步请求的地址 */;
  data?: any /** 发送的数据 */;
  withCredentials?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface HttpResponse<T> {
  code: number /** 后端返回的状态码 */;
  data: T /** 后端返回的数据 */;
  message?: string /** 后端请求返回的提示信息 */;
  unlogin?: boolean /** 发送当前请求的时候是否已经登录 */;
}
