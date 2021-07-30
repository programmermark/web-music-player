<template>
  <div class="left-content">
    <!-- 用户头像和个人信息 -->
    <user-info />
    <!-- 发现音乐、私人FM、视频、朋友 -->
    <!-- 我的音乐 -->
    <!-- 创建的歌单 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserInfo from "./components/userinfo/index.vue";

/** 左侧主要内容 */
export default defineComponent({
  name: "LeftContent",
  components: {
    "user-info": UserInfo,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.left-content {
  width: 100%;
}
</style>
