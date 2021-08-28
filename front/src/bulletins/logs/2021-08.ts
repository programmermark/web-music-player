import { ILog } from "@/store/modules/interface/bulletin";

export const logs: ILog[] = [
  {
    date: "2021-08-28",
    title: "web-music-player更新公告(2021-08-28)",
    briefContent: `<p>1. 修复了一些交互bug</p><p>2. 根据volar修复了所有类型错误</p>`,
    content: `<p>1. 修复了一些交互bug</p><p>2. 根据volar修复了所有类型错误</p>`,
  },
  {
    date: "2021-08-23",
    title: "web-music-player更新公告(2021-08-23)",
    briefContent: `<p>1. 新增页面歌手排行榜</p><p>2. 修复最新音乐页面，点击无法播放的问题</p>`,
    content: `<p>1. 新增页面歌手排行榜</p><p>2. 修复最新音乐页面，点击无法播放的问题</p>`,
  },
  {
    date: "2021-08-19",
    title: "web-music-player更新公告(2021-08-19)",
    briefContent: `<p>1. 优化了所有请求的图片资源的大小，避免持续下载图片造成卡顿</p><p>2. 修复了歌单中没有歌曲、没有收藏者时没有提示的问题</p>`,
    content: `<p>1. 优化了所有请求的图片资源的大小，避免持续下载图片造成卡顿</p><p>2. 修复了歌单中没有歌曲、没有收藏者时没有提示的问题</p>`,
  },
  {
    date: "2021-08-17",
    title: "web-music-player更新公告(2021-08-16)",
    briefContent: `<p>1. 新增页面最新音乐-新碟上架；</p><p>2. 移除了部分重复定义的接口；</p><p>3. 最新音乐-新碟上架，添加自定义分页；</p>`,
    content: `<p>1. 新增页面最新音乐-新碟上架；</p><p>2. 移除了部分重复定义的接口；</p><p>3. 最新音乐-新碟上架，添加自定义分页；</p>`,
  },
  {
    date: "2021-08-16",
    title: "web-music-player更新公告(2021-08-16)",
    briefContent: `<p>1. 新增页面最新音乐-新歌速递；</p>`,
    content: `<p>1. 新增页面最新音乐-新歌速递；</p>`,
  },
  {
    date: "2021-08-13",
    title: "web-music-player更新公告(2021-08-13)",
    briefContent: `<p>1. 新增全局的更新公告弹窗组件，显示简略公告信息；</p>
    <p>2. 新增全局公告导航，显示公告列表和更详细信息；</p>`,
    content: `<p>1. 新增全局的更新公告弹窗组件，显示简略公告信息；</p>
    <p>2. 新增全局公告导航，显示公告列表和更详细信息；</p>`,
  },
];
