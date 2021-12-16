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
      id="playback-drag-btn"
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
  /** 调整进度 */
  (e: "change-percentage", innerPercentage: number, percentage?: number): void;
  /** 是否正在调整 */
  (e: "change-darging-state", isDraging: boolean): void;
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
  if (!isDisplay) {
    /** 鼠标移出之前正在拖拽则触发 */
    if (dragState.dragging) {
      emits("change-darging-state", false);
    }
    /** 停止拖拽时，把拖拽时的进度置空，使用外部传入的进度 */
    dragState.dragging = false;
    dragState.innerPercentage = null;
  }
};

const handleProgressChange = debounce(
  (endX = 0, isDraging = true, withPercentage = false) => {
    /** 获取进度条的长度 */
    const eleWidth = playbackRef.value?.getBoundingClientRect().width as number;
    const eleToLeft = playbackRef.value?.getBoundingClientRect().left as number;
    /** 计算鼠标距离进度条底部的百分比 */
    let percent = ((endX - eleToLeft) / eleWidth) * 100;
    if (percent > 100) {
      percent = 100;
    } else if (percent < 0) {
      percent = 0;
    }
    dragState.dragging = isDraging;
    if (isDraging) {
      dragState.innerPercentage = percent;
    } else {
      dragState.innerPercentage = null;
    }
    if (!withPercentage) {
      emits("change-percentage", percent / 100);
    } else {
      emits("change-percentage", percent / 100, percent / 100);
    }
  },
  10
);

const handleDragStart = (e: MouseEvent | TouchEvent) => {
  if (e instanceof TouchEvent) {
    dragState.startX = e.changedTouches[0].clientX;
  } else {
    dragState.startX = e.clientX;
  }
  handleProgressChange(dragState.startX);
  // 为元素添加鼠标移动和松开事件
  window.addEventListener("mousemove", handleOnDrag);
  window.addEventListener("touchmove", handleOnDrag);
  window.addEventListener("mouseup", handleDragEnd);
  window.addEventListener("touchend", handleDragEnd);
};

const handleOnDrag = (e: MouseEvent | TouchEvent) => {
  if (!dragState.dragging) {
    return false;
  }
  /** 获取进度条到浏览器的距离 */
  let endX = 0;
  if (e instanceof TouchEvent) {
    endX = e.changedTouches[0].clientX;
  } else {
    endX = e.clientX;
  }
  handleProgressChange(endX);
};

const handleDragEnd = (e: MouseEvent | TouchEvent) => {
  /** 获取进度条到浏览器的距离 */
  let endX = 0;
  if (e instanceof TouchEvent) {
    endX = e.changedTouches[0].clientX;
  } else {
    endX = e.clientX;
  }
  handleProgressChange(endX, false, true);
  /** 移除事件监听 */
  window.removeEventListener("mousemove", handleOnDrag);
  window.removeEventListener("touchmove", handleOnDrag);
  window.removeEventListener("mouseup", handleDragEnd);
  window.removeEventListener("touchend", handleDragEnd);
};

const moveHandler = (e: MouseEvent | TouchEvent) => {
  if (e.type === "mousedown" || e.type === "touchstart") {
    handleDragStart(e);
  } else if (e.type === "mousemove" || e.type === "touchmove") {
    handleOnDrag(e);
  } else if (e.type === "mouseup" || e.type === "touchend") {
    handleDragEnd(e);
  }
};

onMounted(() => {
  playbackRef.value?.addEventListener("mousedown", moveHandler);
});
</script>

<style lang="scss" scoped></style>
