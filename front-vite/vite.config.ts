import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

function resolve(dir: string) {
  return `${path.resolve(__dirname, dir)}/`;
}

export default defineConfig({
  resolve: {
    alias: {
      "@/": resolve("src/"),
      common: resolve("src/common"),
      components: resolve("src/components"),
      store: resolve("src/store"),
    },
  },
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        // 以/api开头的接口都代理到target指定的域名下
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "music-player",
  },
});
