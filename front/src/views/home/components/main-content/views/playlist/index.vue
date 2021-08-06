<template>
  <div class="playlist-wrapper">
    <!-- 精品歌单 -->
    <!-- 歌单分类 -->
    <cat-list />
    <!-- 歌单列表（10 * 10） -->
    <!-- 分页 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CatList from "./components/cat-list/index.vue";

export default defineComponent({
  name: "PlayList",
  components: {
    "cat-list": CatList,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
