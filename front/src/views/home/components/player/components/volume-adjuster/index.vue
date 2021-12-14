<template>
  <div class="volume-adjuster">
    <el-popover
      placement="top"
      trigger="hover"
      :style="{ width: '20px' }"
      popper-class="volume-popover"
      @show="showPopover"
      @hide="hidePopover"
    >
      <template #reference>
        <slot name="content"></slot>
      </template>
      <div class="content">
        <volume-progress
          :visible="visible"
          :percentage="volume"
          @change-progress="onChangeProgress"
        />
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VolumeProgress from "../progress/index.vue";

export default defineComponent({
  name: "VolumeAdjuster",
  components: {
    "volume-progress": VolumeProgress,
  },
  props: {
    /** 初始音量 */
    volume: {
      type: Number,
      default: 60,
    },
  },
  emits: ["change-volume"],
  setup(prop, { emit }) {
    const visible = ref(false);

    const onChangeProgress = (progress: number) => {
      emit("change-volume", progress / 100);
    };

    const showPopover = () => {
      visible.value = true;
    };

    const hidePopover = () => {
      visible.value = false;
    };

    return {
      visible,
      onChangeProgress,
      showPopover,
      hidePopover,
    };
  },
});
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
// .popover {
//   width: 20px;
// }
</style>
