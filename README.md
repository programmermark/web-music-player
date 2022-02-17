<h1 align="center">Welcome to web-music-player 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/callmehui/web-music-player#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/callmehui/web-music-player/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/callmehui/web-music-player/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/callmehui/web-music-player" />
  </a>
</p>

> 仿网易云音乐（mac 客户端）web 版，使用 Vue3 + Typescript + 网易云音乐 api([NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)) 开发。

### 🏠 [Homepage](https://github.com/callmehui/web-music-player#readme)

## 免责声明

本项目的图片、音频文件均来自第三方平台，本项目只做展示用，不会修改任何资源。

音频版权来自各网站，本站只提供数据查询服务，不提供任何音频存储和贩卖服务，亦不提供第三方图片、音频文件的下载功能。

本项目仅用于学习和交流，请勿用作商业用途，请勿通过本项目下载盗版歌曲资源，否则后果自负！

## 在线访问地址

地址 1(部署在**国内**，**定期更新**)：[music-player.immortalboy.cn](https://music-player.immortalboy.cn/)

地址 1(**netlify 外网**部署，**实时同步**)：[music-player2.immortalboy.cn](https://music-player2.immortalboy.cn/)

说明：地址 1 部署在国内，由我定期部署；地址 2 通过 netlify 拉去 github 的 hooks 自动部署，但是网页部署在国外，首页加载很慢。

## 每周周报

上周已完成功能和已修复的问题：

[周报统计](./update-plan/WEEKCOMPLETE.md)

所有已完成功能和已修复的问题：

[历史周报统计](./update-plan/ALLCOMPLETE.md)

## 安装和使用

### 环境要求

```sh
# 查看 node 版本，确保 node 版本高于 12 版本
node -v
```

### 安装

```sh
# 根目录安装项目依赖
yarn install or npm install
```

### 使用

```sh
# 本地运行
yarn run start or npm run start
```

部署到线上环境与本地运行不同，因为项目中的前端部分是 SPA，所以需要部署到服务器软件（nginx 等）的静态目录下，所以前端需要单独打包，而后端本身就是一个 node 服务，只需要启动即可运行。但是，后端服务需要服务器转发才可以生效。

```sh
# 获取打包后的SPA
yarn build
# 进入到后端服务目录单独启动后端服务
cd wangyiyun-server & yarn start
or
cd wangyiyun-server & npm start

# 为前端网站配置好相应的域名，为后端服务做好反向代理
# 把打包好的静态文件迁移到对应的服务器软件目录中
```

## 待办清单

### 近期将要开发的功能（按照顺序完成）

- [x] 系统通知
- [x] 播放顺序功能（随机播放、单曲播放等等）
- [x] 独家放送
- [x] 歌词功能（不开发评论功能）
- [x] 顶部搜索功能
- [x] 歌手详情-歌手 MV
- [x] MV 详情（不开发评论功能）
- [ ] 歌单-精品歌单

### 页面

- [x] 个性推荐
- [x] 歌单
- [ ] 主播电台
- [x] 排行榜
- [x] 歌手
- [x] 最新音乐
- [x] 最新音乐
- [x] 系统通知
- [ ] 吐槽专区

- [x] 歌手详情
- [ ] 电台详情
- [x] 排行榜详情
- [x] 歌手排行榜
- [x] 专辑详情
- [x] 独家放送
- [ ] 歌单-精品歌单
- [x] MV 详情（不开发评论功能）
- [x] 视频-视频
- [ ] 视频-MV
- [x] 搜索结果

### 功能

- [x] 个性推荐页面优化
- [x] 更新公告功能（自定义）
- [x] 播放顺序功能（随机播放、单曲播放等等）
- [x] 歌词功能
- [x] 歌曲评论
- [x] 顶部搜索功能
- [ ] 更换背景图片功能（自定义）

### 杂项

- [ ] 添加单元测试
- [x] 完善 README 文件
- [x] 引入 vite
- [x] 探索实现项目的自动化部署

## Author

👤 **钟辉**

- Website: https://immortalboy.cn
- Github: [@callmehui](https://github.com/callmehui)
- WeChat: a13720141463

## 🤝 Contributing

欢迎贡献代码与我一起共建这个开源项目，欢迎 issues!<br />请随时查看 [问题页](https://github.com/callmehui/web-music-player/issues).

## 支持与赞助

如果这个项目对您有任何帮助，欢迎 ⭐️，欢迎 fork！

## 📝 License

Copyright © 2021 [钟辉](https://github.com/callmehui).<br />
This project is [MIT](https://github.com/callmehui/web-music-player/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
