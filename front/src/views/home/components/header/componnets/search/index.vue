<template>
  <div>
    <MPSearch v-model="state.value" v-model:focus="state.focus" />
    <teleport to="#home" v-if="state.isMounted">
      <el-scrollbar
        class="
          bg-white
          absolute
          right-0
          top-[50px]
          z-50
          h-[calc(100%-110px)]
          shadow-md-left
        "
      >
        <RecommendSearch v-show="!state.value && state.focus" />
        <SearchResult
          v-show="state.value && state.focus"
          :keywords="state.value"
        />
      </el-scrollbar>
    </teleport>
  </div>
</template>

<!-- 搜索组件 -->
<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import MPSearch from "@/components/MPSearch.vue";
import RecommendSearch from "./components/recommend-search/index.vue";
import SearchResult from "./components/search-result/index.vue";

const state = reactive({
  isMounted: false,
  value: "",
  focus: false,
});

onMounted(() => {
  state.isMounted = true;
});
</script>

<style lang="scss" scoped></style>
