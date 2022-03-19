<template>
  <div class="volume-adjuster">
    <el-popover
      placement="top"
      trigger="hover"
      :style="{ width: '30px' }"
      popper-class="volume-popover"
      @show="showPopover"
      @hide="hidePopover"
    >
      <template #reference>
        <slot name="content"></slot>
      </template>
      <div class="content">
        <VolumeProgress
          :visible="visible"
          :percentage="volume"
          @change-progress="onChangeProgress"
        />
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import VolumeProgress from "../progress/index.vue";

withDefaults(
  defineProps<{
    /** 初始音量 */
    volume?: number;
  }>(),
  {
    volume: 60,
  }
);

const emits = defineEmits<{
  (event: "change-volume", progress: number): void;
}>();

const visible = ref(false);

const onChangeProgress = (progress: number) => {
  emits("change-volume", progress / 100);
};

const showPopover = () => {
  visible.value = true;
};

const hidePopover = () => {
  visible.value = false;
};
</script>

<style lang="scss" scoped>
:deep() .popover {
  width: 20px;
  .content {
    width: 30px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
}
</style>
