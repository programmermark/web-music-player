<template>
  <div>
    <MPSearch v-model="state.value" />
    <teleport to="#home" v-if="state.isMounted">
      <el-scrollbar
        class="bg-white absolute right-0 top-[50px] z-50 h-[calc(100%-110px)] shadow-md-left"
        height="calc(100% - 110px)"
      >
        <RecommendSearch v-show="state.showRecommend" />
      </el-scrollbar>
    </teleport>
  </div>
</template>

<!-- 搜索组件 -->
<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import MPSearch from "@/components/MPSearch.vue";
import RecommendSearch from "./components/recommend-search/index.vue";

const state = reactive({
  isMounted: false,
  value: "",
  showRecommend: true /** 是否显示推荐内容 */,
});

onMounted(() => {
  state.isMounted = true;
});
</script>

<style lang="scss" scoped></style>
