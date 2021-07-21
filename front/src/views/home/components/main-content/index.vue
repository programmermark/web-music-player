<template>
  <div class="main-content-wrapper">
    <el-scrollbar class="main-content">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/** 右侧主要内容 */
export default defineComponent({
  name: "MainContent",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.main-content-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .main-content {
    height: 100%;
    overflow: auto;
    flex: 1;
    padding: 0 30px;
  }
  .main-content-scrollbar {
    height: 100%;
  }
}
</style>
