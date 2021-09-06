<template>
  <div class="progress-wrapper">
    <div
      ref="progressRef"
      class="progress-outer"
      :style="outerStyle"
      @mousedown="handleDragStart"
      @touchstart="handleDragStart"
      @mousemove="handleOnDrag"
      @touchmove="handleOnDrag"
      @mouseup="handleDragEnd"
      @touchend="handleDragEnd"
      @mouseleave="handleDragEnd"
    >
      <div class="progress-inner" :style="innerStyle"></div>
      <div class="change-percentage" :style="percentageStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { computed, defineComponent, toRefs, reactive, ref } from "vue";

export default defineComponent({
  name: "volumeProgress",
  props: {
    /** 进度条的宽度 */
    width: {
      type: Number,
      default: 6,
    },
    /** 外层进度条的背景颜色 */
    outColor: {
      type: String,
      default: "#e5e5e5",
    },
    /** 外层进度条的背景颜色 */
    color: {
      type: String,
      default: "#d33a30",
    },
    /** 进度条的百分比s */
    percentage: {
      type: Number,
      default: 60,
    },
  },
  emits: ["change-progress"],
  setup(props, { emit }) {
    const { width, outColor, color, percentage } = toRefs(props);

    const progressRef = ref<HTMLAudioElement>(); /** 进度条元素 */
    const dragState = reactive({
      innerPercentage: percentage.value,
      dragging: false /** 是否正在拖拽进度条 */,
      startY: 0 /** 记录最开始点击的Y轴坐标 */,
    });

    const outerStyle = computed(() => {
      return {
        width: `${width.value}px`,
        "background-color": outColor.value,
        "border-radius": `${width.value / 2}px`,
      };
    });

    const innerStyle = computed(() => {
      return {
        height: `${dragState.innerPercentage}%`,
        "background-color": color.value,
        "border-radius": `${width.value / 2}px`,
      };
    });

    const percentageStyle = computed(() => {
      return {
        "background-color": color.value,
        bottom: `calc(${dragState.innerPercentage}% - 5px)`,
      };
    });

    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      dragState.dragging = true;
      if (e instanceof TouchEvent) {
        dragState.startY = e.changedTouches[0].clientY;
      } else {
        dragState.startY = e.clientY;
      }
    };

    const handleOnDrag = _.debounce((e: MouseEvent | TouchEvent) => {
      if (!dragState.dragging) {
        return false;
      }
      /** 获取进度条到浏览器的距离 */
      const eleToTop =
        progressRef.value?.getBoundingClientRect().top || dragState.startY;
      let endY = 0;
      if (e instanceof TouchEvent) {
        endY = e.changedTouches[0].clientY;
      } else {
        endY = e.clientY;
      }
      /** 计算鼠标距离进度条底部的百分比 */
      let percent = ((80 - (endY - eleToTop)) / 80) * 100;
      if (percent > 100) {
        percent = 100;
      } else if (percent < 0) {
        percent = 0;
      }
      dragState.innerPercentage = percent;
      emit("change-progress", percent);
    }, 20);

    const handleDragEnd = () => {
      if (!dragState.dragging) {
        dragState.dragging = false;
      }
    };

    return {
      progressRef,
      outerStyle,
      innerStyle,
      percentageStyle,
      handleDragStart,
      handleOnDrag,
      handleDragEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
.progress-wrapper {
  width: 30px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .progress {
    width: 100%;
    height: 100%;
  }

  .progress-outer {
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
    position: relative;

    .progress-inner {
      width: 100%;
    }

    .change-percentage {
      width: 10px;
      height: 10px;
      position: absolute;
      border-radius: 50%;
      left: calc(50% - 5px);
    }
  }
}
</style>
