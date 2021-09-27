<template>
  <div class="w-[356px]">
    <!-- 热搜榜 -->
    <div>
      <div class="text-gray-500 text-sm font-medium px-5 py-4">热搜榜</div>
      <div
        class="flex py-[10px] px-5 cursor-pointer hover:bg-gray-100"
        v-for="(item, index) in state.hotSearchList"
        :key="item.searchWord"
        @click="handleHotWordClick(item.searchWord)"
      >
        <div
          class="flex items-center text-base text-gray-400 mr-5"
          :class="{ 'text-red-500 font-medium': index < 3 }"
        >
          {{ index + 1 }}
        </div>
        <div>
          <div class="flex items-center mb-1">
            <span
              class="text-sm text-gray-900 mr-1"
              :class="{ ' font-medium': index < 3 }"
              >{{ item.searchWord }}</span
            >
            <img v-if="item.iconUrl" class="h-3 self-end mb-1" :src="item.iconUrl" />
            <span class="text-xs text-gray-400 ml-3">{{ item.score }}</span>
          </div>
          <div class="text-xs text-gray-500">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 没有输入值时，搜索组件展示的内容 -->
<script lang="ts" setup>
import { onMounted } from "vue";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { reactive } from "@vue/reactivity";
import { IHotSearch, IState } from "../../interface/recommend-search";

/** 热搜榜 */
const state = reactive<IState>({
  hotSearchList: [],
});

/**
 * 获取热搜榜
 */
const fetchHotSearchRankList = async () => {
  const list = await http<IHotSearch[]>({ url: apis.hotSearchRankList }, "data");
  const formatList: IHotSearch[] = list.map((item) => ({
    searchWord: item.searchWord,
    score: item.score,
    content: item.content,
    iconUrl: item.iconUrl,
  }));
  state.hotSearchList = formatList;
};

/**
 * 点击热搜榜
 */
const handleHotWordClick = (keyword: string) => {
  /** 1. 填充关键词到搜索框 */
  /** 2. 隐藏弹出层 */
  /** 3. 跳转到对应页面 */
};

onMounted(() => {
  fetchHotSearchRankList();
});
</script>

<style lang="scss" scoped></style>
