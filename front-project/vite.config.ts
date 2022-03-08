import { fileURLToPath, URL } from "url";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

function resolve(dir: string) {
  return `${path.resolve(__dirname, dir)}/`;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/common/css/element.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@/": resolve("src/"),
      "~/": resolve("src/"),
    },
  },
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
