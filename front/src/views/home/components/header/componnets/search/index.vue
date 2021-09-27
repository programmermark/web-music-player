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
        <div @click="handleContentClick">
          <RecommendSearch
            v-show="!state.value && state.focus"
            @clickHotKeyword="handleHotKeywordClick"
          />
          <SearchResult
            v-show="state.value && state.focus"
            :keywords="state.value"
          />
        </div>
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
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
  isMounted: false,
  value: "",
  focus: false,
});

const handleContentClick = (e: Event) => {
  e.stopPropagation();
};

const handleHotKeywordClick = (keyword: string, focus: boolean) => {
  state.value = keyword;
  state.focus = focus;
  router.push(`/search-content/${keyword}`);
};

onMounted(() => {
  state.isMounted = true;
});
</script>

<style lang="scss" scoped></style>
