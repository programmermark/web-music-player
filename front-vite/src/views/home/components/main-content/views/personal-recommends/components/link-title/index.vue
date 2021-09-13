<template>
  <div class="link-title">
    <router-link class="link" :to="url">
      <span>{{ title }}</span>
      <i class="el-icon-arrow-right"></i>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinkTitle",
  props: {
    /** 标题文字 */
    title: {
      type: String,
      required: true,
    },
    /** 标题链接 */
    url: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.link-title {
  margin-bottom: 12px;
  .link {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    text-decoration: none;
  }
}
</style>
