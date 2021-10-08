import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

function resolve(dir: string) {
  return new URL(`./${dir}`, import.meta.url).pathname;
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
    port: 8080,
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
