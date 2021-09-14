/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "music-player",
  productionSourceMap: false, // 关闭生产环境sourcemap
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("store", resolve("src/store"));
    config.plugin("html").tap((args) => {
      args[0].title = "仿网易云音乐播放器";
      return args;
    });
  },
  devServer: {
    proxy: {
      "/": {
        target: "http://127.0.0.1:4000",
      },
    },
  },
};
