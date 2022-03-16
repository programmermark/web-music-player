<template>
  <div id="music-progress" class="progress-wrapper">
    <div ref="progressRef" class="progress-outer" :style="outerStyle">
      <div class="progress-inner-wrapper" :style="innerWrapperStyle">
        <div :style="innerStyle"></div>
      </div>
      <div class="change-percentage" :style="percentageStyle"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import debounce from "lodash/debounce";
import { computed, toRefs, reactive, ref, onMounted, watch } from "vue";

const props = withDefaults(
  defineProps<{
    /** 进度条的宽度 */
    width?: number;
    /** 外层进度条的背景颜色 */
    outColor?: string;
    /** 外层进度条的背景颜色 */
    color?: string;
    /** 进度条的百分比 */
    percentage?: number;
    /** 进度条是否展示 */
    visible?: boolean;
  }>(),
  {
    width: 4,
    outColor: "#e5e5e5",
    color: "#d33a30",
    percentage: 60,
    visible: false,
  }
);

const emits = defineEmits<{
  (event: "change-progress", percent: number): void;
}>();

const { width, outColor, color, percentage, visible } = toRefs(props);

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

const innerWrapperStyle = computed(() => {
  return {
    height: `${dragState.innerPercentage}%`,
  };
});

const innerStyle = computed(() => {
  return {
    height: "100%",
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

const handleProgressChange = debounce((endY = 0) => {
  /** 获取进度条到浏览器的距离 */
  const eleToTop = progressRef.value?.getBoundingClientRect().top || dragState.startY;
  /** 计算鼠标距离进度条底部的百分比 */
  let percent = ((80 - (endY - eleToTop)) / 80) * 100;
  if (percent > 100) {
    percent = 100;
  } else if (percent < 0) {
    percent = 0;
  }
  dragState.innerPercentage = percent;
  emits("change-progress", percent);
}, 10);

const handleDragStart = (e: MouseEvent | TouchEvent) => {
  dragState.dragging = true;
  if (e instanceof TouchEvent) {
    dragState.startY = e.changedTouches[0].clientY;
  } else {
    dragState.startY = e.clientY;
  }
  handleProgressChange(dragState.startY);
  // 为元素添加鼠标移动和松开事件
  progressRef.value?.addEventListener("mousemove", moveHandler);
  progressRef.value?.addEventListener("mouseup", moveHandler);
};

const handleOnDrag = (e: MouseEvent | TouchEvent) => {
  if (!dragState.dragging) {
    return false;
  }
  /** 获取进度条到浏览器的距离 */
  let endY = 0;
  if (e instanceof TouchEvent) {
    endY = e.changedTouches[0].clientY;
  } else {
    endY = e.clientY;
  }
  handleProgressChange(endY);
};

const moveHandler = (e: MouseEvent | TouchEvent) => {
  if (e.type === "mousedown" || e.type === "touchstart") {
    handleDragStart(e);
  } else if (e.type === "mousemove" || e.type === "touchmove") {
    handleOnDrag(e);
  } else if (e.type === "mouseup" || e.type === "touchend") {
    dragState.dragging = false;
    progressRef.value?.removeEventListener("mousemove", moveHandler);
  }
};

watch(visible, (val) => {
  /** 组件不显示的时候，设置dragging为false */
  if (!val) {
    dragState.dragging = false;
  }
});

onMounted(() => {
  progressRef.value?.addEventListener("mousedown", moveHandler);
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
    cursor: pointer;

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
