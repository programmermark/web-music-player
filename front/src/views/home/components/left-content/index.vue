<template>
  <div class="left-content">left-content</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/** 左侧主要内容 */
export default defineComponent({
  name: "LeftContent",
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
