<template>
  <div class="w-[356px]">
    <div>
      搜“<span>{{ keywords }}</span
      >”相关的结果<MPOptIcon
        icon="arrow-right"
        :size="14"
        color="#666666"
        display="always"
      />
    </div>
  </div>
</template>

<!-- 关键词搜索结果 -->
<script lang="ts" setup>
import MPOptIcon from "@/components/MPOptIcon.vue";

defineProps<{
  keywords: string;
}>();
</script>

<style lang="scss" scoped></style>
