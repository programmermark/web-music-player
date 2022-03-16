<template>
  <div
    class="w-full flex border-b border-gray-200 pt-5 cursor-pointer last:border-0 hover:bg-gray-50"
  >
    <MPOptIcon
      icon="find-music"
      color="#fff"
      bg-color="#DC2626"
      scale="0.6"
      :size="40"
      display="always"
    />
    <div class="flex-1 ml-3 mb-5">
      <div class="text-sm text-gray-800 flex items-center">
        <div class="text-blue-500 mr-3 cursor-pointer" @click="gotoUserLink(admin.url)">
          {{ admin.name }}
        </div>
        <div>{{ log.title }}</div>
      </div>
      <div class="mb-2 text-[13px] text-gray-400">
        {{ formatTime(log.date, "yyyy年MM月dd日 hh:mm") }}
      </div>
      <div class="text-gray-700 text-sm" v-html="log.content"></div>
    </div>
  </div>
</template>

<!-- 系统通知卡片 -->
<script lang="ts" setup>
import MPOptIcon from "@/components/MPOptIcon.vue";
import type { ILog } from "@/stores/interface/bulletin";
import { formatTime } from "@/common/js/util";

defineProps<{
  log: ILog;
}>();

const admin = {
  name: "系统管理员",
  url: "https://github.com/programmermark/web-music-player",
};

/** 打开新窗口，跳转到指定链接 */
const gotoUserLink = (url: string) => {
  window.open(url, "__blank");
};
</script>

<style lang="scss" scoped></style>
