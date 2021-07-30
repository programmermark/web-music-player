export interface ILogin {
  phone: string /** 手机号 */;
  password: string /** 密码 */;
}

export interface IUser {
  id: number /** 用户id */;
  nickname: string /** 昵称 */;
  token: string /** 用户token */;
  cookie: string /** 用户cookie */;
  avatarUrl: string /** 用户头像url */;
  eventCount: number /** 用户动态统计数量 */;
  followeds: number /** 粉丝数 */;
  follows: number /** 用户关注数量 */;
}

export interface ILoginState {
  hasLogged: boolean /** 是否已登录 */;
  userInfo?: IUser;
}

/** 用户信息 */
export interface IUserInfo {
  token: string /** 用户token */;
  cookie: string /** 用户cookie */;
  account: {
    id: number;
  };
  profile: {
    nickname: string /** 昵称 */;
    avatarUrl: string /** 用户头像url */;
    eventCount: number /** 用户动态统计数量 */;
    followeds: number /** 粉丝数 */;
    follows: number /** 用户关注数量 */;
  };
}
