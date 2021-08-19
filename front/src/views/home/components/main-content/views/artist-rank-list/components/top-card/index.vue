<template>
  <div class="top-card">
    <div class="no">{{ no }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/** 歌手排行榜 - 排行前三的card */
export default defineComponent({
  name: "TopCard",
  props: {
    /** 排行顺序 */
    no: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.top-card {
  .no {
  }
}
</style>
