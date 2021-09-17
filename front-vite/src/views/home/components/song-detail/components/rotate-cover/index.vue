<template>
  <div class="relative w-80 h-80 rounded-full border-8 border-gray-200">
    <img class="w-full absolute top-0 left-0" src="../../image/singlecover.svg" />
    <img
      class="absolute top-[51px] left-[52px] w-[200px] rounded-full"
      :class="{ 'animate-spin-30': isPause }"
      :src="img"
    />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";

defineProps<{
  img: string /** 歌曲封面 */;
}>();

const store = useStore();

/** 歌曲是否已暂停 */
const isPause = computed(() => store.state.player.isPause);
</script>

<style lang="scss" scoped></style>
