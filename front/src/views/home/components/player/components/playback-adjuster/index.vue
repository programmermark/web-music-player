<template>
  <div
    ref="playbackRef"
    class="w-full h-3 flex flex-row items-center cursor-pointer"
    @mouseenter="toggleDragBtnDisplay(true)"
    @mouseleave="toggleDragBtnDisplay(false)"
  >
    <!-- 进度条 -->
    <div
      class="h-[2px]"
      :style="{ width: `${currentPercentage}%`, backgroundColor: bgColor }"
    ></div>
    <!-- 进度条拖拽按钮 -->
    <div
      class="w-3 h-3 rounded-md"
      :style="{
        backgroundColor: bgColor,
        display: !dragBtnDisplay ? 'none' : 'initial',
      }"
    ></div>
  </div>
</template>

<!-- 播放进度调整器 -->
<script lang="ts" setup>
import { ref, computed, onMounted, reactive, toRefs } from "vue";
import debounce from "lodash/debounce";

const props = withDefaults(
  defineProps<{
    bgColor?: string;
    percentage: number;
  }>(),
  {
    bgColor: "#d33a30",
  }
);

const emits = defineEmits<{
  (e: "change-progress", innerPercentage: number, percentage?: number): void;
}>();

const { percentage } = toRefs(props);

const playbackRef = ref<HTMLAudioElement>(); /** 进度条元素 */
const dragBtnDisplay = ref(false); /** 进度条拖拽按钮是否显示 */
const dragState = reactive<{
  innerPercentage: number | null;
  dragging: boolean;
  startX: number;
}>({
  innerPercentage: null,
  dragging: false /** 是否正在拖拽进度条 */,
  startX: 0 /** 记录最开始点击的X轴坐标 */,
});

const currentPercentage = computed(() => {
  if (dragState.innerPercentage === null) {
    return percentage.value;
  }
  return dragState.innerPercentage;
});

/** 切换拖拽按钮是否展示 */
const toggleDragBtnDisplay = (isDisplay: boolean) => {
  dragBtnDisplay.value = isDisplay;
};

const handleProgressChange = debounce((endY = 0, withPercentage = false) => {
  /** 获取进度条到浏览器的距离 */
  const eleWidth = playbackRef.value?.getBoundingClientRect().width;
  console.log("eleWidth", eleWidth);
  console.log(playbackRef.value?.getBoundingClientRect().left);
  const eleToLeft = playbackRef.value?.getBoundingClientRect().left || dragState.startX;
  /** 计算鼠标距离进度条底部的百分比 */
  let percent = ((80 - (endY - eleToLeft)) / 80) * 100;
  if (percent > 100) {
    percent = 100;
  } else if (percent < 0) {
    percent = 0;
  }
  dragState.innerPercentage = percent;
  if (!withPercentage) {
    emits("change-progress", percent);
  } else {
    emits("change-progress", percent, percent);
  }
}, 10);

const handleDragStart = (e: MouseEvent | TouchEvent) => {
  dragState.dragging = true;
  if (e instanceof TouchEvent) {
    dragState.startX = e.changedTouches[0].clientY;
  } else {
    dragState.startX = e.clientY;
  }
  handleProgressChange(dragState.startX);
  // 为元素添加鼠标移动和松开事件
  playbackRef.value?.addEventListener("mousemove", moveHandler);
  playbackRef.value?.addEventListener("mouseup", moveHandler);
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
  handleProgressChange(endY, true);
};

const moveHandler = (e: MouseEvent | TouchEvent) => {
  if (e.type === "mousedown" || e.type === "touchstart") {
    handleDragStart(e);
  } else if (e.type === "mousemove" || e.type === "touchmove") {
    handleOnDrag(e);
  } else if (e.type === "mouseup" || e.type === "touchend") {
    dragState.dragging = false;
    playbackRef.value?.removeEventListener("mousemove", moveHandler);
  }
};

onMounted(() => {
  playbackRef.value?.addEventListener("mousedown", moveHandler);
});
</script>

<style lang="scss" scoped></style>
