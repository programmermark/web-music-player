<template>
  <div class="created-playlist">
    <div class="collapse">
      <i
        :class="hasCollapsed ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"
        class="icon-reset"
      />
      <span>创建的歌单</span>
    </div>
    <!-- 歌单列表 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CreatedPlayList",
  setup() {
    const hasCollapsed = ref(false);

    return {
      hasCollapsed,
    };
  },
});
</script>

<style lang="scss" scoped>
.created-playlist {
  .collapse {
  }
}
</style>
