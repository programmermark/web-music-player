<template>
  <el-row class="header">
    <el-col class="header-left" :span="4">
      <!-- 左侧最小化、最大化和关闭操作按钮 -->
      <left-opts />
      <!-- 路由前进回退操作 -->
    </el-col>
    <el-col class="header-right" :span="20">
      <!-- 导航内容 -->
      <nav-bars />
      <!-- 搜索框 -->
      <!-- 右侧操作 -->
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import LeftOpts from "./left-opts/index.vue";
import NavBars from "./navbars/index.vue";

export default defineComponent({
  components: { LeftOpts, NavBars },
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  z-index: 100;
  .header-left {
    position: relative;
    background-color: #f6f6f6;
    border-top-left-radius: 8px;
  }
  .header-right {
    background-color: #f9f9f9;
    border-top-right-radius: 8px;
  }
}
</style>
