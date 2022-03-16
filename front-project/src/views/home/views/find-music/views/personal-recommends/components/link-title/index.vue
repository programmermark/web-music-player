<template>
  <div class="link-title">
    <router-link class="link" :to="url">
      <span>{{ title }}</span>
      <el-icon>
        <arrow-right />
      </el-icon>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /** 标题文字 */
  title: string;
  /** 标题链接 */
  url: string;
}>();
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
