export interface ILog {
  date: string /** 公告时间 */;
  title: string /** 公告标题 */;
  briefContent: string /** 简略公告内容（纯文本） */;
  content: string /** 公告内容：使用v-html解析 */;
}

/** 公告状态 */
export interface IBulletinState {
  hasNotified: boolean /** 是否已通知过 */;
  currentBulletin: undefined | ILog /** 最新公告 */;
  bulletinList: ILog[] /** 公告列表 */;
}
