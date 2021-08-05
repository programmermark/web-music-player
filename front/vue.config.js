/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "webMusicPlayer",
  productionSourceMap: false, // 关闭生产环境sourcemap
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("store", resolve("src/store"));
  },
  devServer: {
    proxy: {
      "/": {
        // 以/api开头的接口都代理到target指定的域名下
        // target: 'https://immortalboy.cn'
        target: "http://127.0.0.1:4000",
      },
    },
  },
};
