<template>
  <div class="mb-3 flex">
    <div
      class="w-36 h-20 rounded mr-2 relative cursor-pointer"
      @click="gotoMVDetail(mv.vid)"
    >
      <img
        class="w-full h-full rounded"
        :src="`${mv.coverUrl}?param=280y160`"
        alt="mv封面"
      />
      <div class="absolute top-1 right-1 flex items-center font-bold">
        <MPIcon icon="play-caret" color="#fff" bgColor="none" />
        <span class="text-white text-xs">{{ translatePlayCount(mv.playTime) }}</span>
      </div>
      <div class="absolute bottom-1 right-1 text-xs font-semibold text-white">
        {{ transformSecondToMinute(mv.durationms / 1000) }}
      </div>
    </div>
    <div class="flex-1">
      <div
        class="h-10 text-sm mt-2 leading-5 text-gray-700 cursor-pointer text-ellipsis-2"
        @click="gotoMVDetail(mv.vid)"
      >
        {{ mv.title }}
      </div>
      <div
        class="text-sm mt-1 text-gray-400 cursor-pointer"
        @click="gotoVideoCreator(mv.creators[0].userId, mv.type)"
      >
        {{ mv.creators[0].userName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IRelatedVideoFormat } from "../../interface";
import { translatePlayCount, transformSecondToMinute } from "@/common/js/util";
import MPIcon from "@/components/MPIcon.vue";
import { gotoArtistDetail, gotoMVDetail } from "@/common/js/router";
import { ElMessage } from "element-plus";

defineProps<{
  mv: IRelatedVideoFormat;
}>();

const gotoVideoCreator = (userId: number, type: number) => {
  if (type === 1) {
    gotoArtistDetail(userId);
  } else {
    ElMessage.warning({
      message: "用户主页开发中，敬请期待！",
      type: "warning",
    });
  }
};
</script>

<style lang="scss" scoped></style>
