<template>
  <div class="w-[356px]">
    <div class="mt-4 flex items-center">
      <div class="pl-5 flex-1">
        <span class="text-gray-500 text-sm font-medium mr-2">搜索历史</span>
        <MPOptIcon
          icon="delete"
          :size="16"
          color="#999"
          bg-color="none"
          scale="1"
          display="always"
          @click="handleKeywordsDelete"
        />
      </div>
      <div
        class="text-gray-500 text-sm font-medium self-end cursor-pointer pr-5"
        @click="viewAllSearchKeywords"
      >
        查看全部
      </div>
    </div>
  </div>
</template>

<!-- 没有输入值时，搜索组件展示的内容 -->
<script lang="ts" setup>
import MPOptIcon from "@/components/MPOptIcon.vue";
import { Callback, ElMessage, ElMessageBox } from "element-plus";

/** 确认删除所有关键词 */
const handleKeywordsDelete = () => {
  ElMessageBox.alert("确定删除历史记录？", "", {
    confirmButtonText: "确定",
    center: true,
    callback: (action: "confirm" | "cancel" | "close") => {
      if (action === "confirm") {
        ElMessage({
          type: "warning",
          message: `调用清空搜索历史的接口`,
        });
      }
    },
  });
};

/**
 * 展开全部搜索关键词
 */
const viewAllSearchKeywords = () => {
  ElMessage.warning({
    message: "展开并查看全部搜索关键词",
    type: "warning",
  });
};
</script>

<style lang="scss" scoped></style>
