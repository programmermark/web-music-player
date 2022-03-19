<template>
  <div class="inline-flex items-center w-44 h-6 bg-gray-100 rounded-xl">
    <MPOptIcon
      class="ml-2"
      icon="search"
      :size="13"
      scale="1"
      color="#555555"
      bgColor="none"
      display="always"
    />
    <input
      id="search-input"
      class="flex-1 w-28 h-4 bg-gray-100 ml-1 mr-2 outline-none text-xs text-gray-600"
      :value="modelValue"
      @input="handleInputChange"
      @compositionstart="handleCompositionstart"
      @compositionend="handleCompositionend"
      @focus="handleFocus"
      type="text"
      placeholder="搜索"
    />
    <MPOptIcon
      v-show="clearable && modelValue"
      class="mr-2"
      icon="close-thin"
      :size="13"
      scale="1"
      color="#555555"
      bgColor="none"
      display="always"
      @click="handleClear"
    />
  </div>
</template>

<!-- 基础的搜索组件 -->
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MPOptIcon from "./MPOptIcon.vue";

withDefaults(
  defineProps<{
    modelValue?: string /** 搜索框的输入值 */;
    clearable?: boolean /** 是否开启清空功能 */;
    focus?: boolean /** 输入框是否获取焦点 */;
  }>(),
  {
    modelValue: "",
    clearable: true,
    focus: false,
  }
);

const isComposing = ref(false);

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "update:focus", focus: boolean): void;
}>();

const handleInputChange = (e: Event) => {
  if (!isComposing.value) {
    emits("update:modelValue", (e.target as HTMLInputElement).value);
  }
};

/** 清空输入框 */
const handleClear = () => {
  emits("update:modelValue", "");
};

const handleCompositionstart = () => {
  isComposing.value = true;
};

const handleCompositionend = (e: Event) => {
  isComposing.value = false;
  emits("update:modelValue", (e.target as HTMLInputElement).value);
};

const handleFocus = () => {
  emits("update:focus", true);
};

onMounted(() => {
  const searchInputEle = document.querySelector("#search-input");
  document.addEventListener("click", function (e) {
    /** 被点击的元素不是searchInputEle，就隐藏searchInputEle */
    if (e.target !== searchInputEle) {
      emits("update:focus", false);
    }
  });
});
</script>

<style lang="scss" scoped></style>
