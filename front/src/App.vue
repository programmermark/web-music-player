<template>
  <VueQueryDevTools />
  <div id="app-content">
    <!-- 壁纸切换组件 -->
    <div id="home">
      <!-- Header -->
      <Header />
      <!-- 路由 -->
      <router-view />
    </div>
    <!--  vue-query 开发者工具 -->
    <VueQueryDevTools />
  </div>
</template>

<script lang="ts" setup>
import { VueQueryDevTools } from "vue-query/devtools";
import { QueryClient, useQueryProvider } from "vue-query";
import Header from "./views/home/components/header/index.vue";

/** 初始化queryClient缓存实例，后续页面可以通过useQueryClient()获取该缓存实例 */
useQueryProvider(new QueryClient());
</script>

<style lang="scss">
#app-content {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
}

#home {
  position: relative;
  overflow: hidden;
  min-width: 1200px;
  width: calc(100vw - 120px);
  min-height: 600px;
  height: calc(100vh - 60px);
  margin: 30px;
  box-sizing: border-box;
  border: 1px solid rgba($color: #c9c9c9, $alpha: 0.6);
  border-radius: 8px;
  box-shadow: 20px 0 20px 2px #e6e6e6, -20px 0 20px 2px #e6e6e6, 0 20px 20px 2px #e6e6e6;
}
</style>
