<template>
  <i
    :class="[icon, iconClass, 'mp-icon']"
    :style="iconStyle"
    @click="handleClick"
  ></i>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";

type Cursor =
  | "auto" /** 浏览器根据当前内容决定指针样式 例如当是内容是文字时使用text样式 */
  | "default" /** 默认指针，通常是箭头。 */
  | "none" /** 无指针被渲染 */
  | "pointer" /** 悬浮于连接上时，通常为手 */
  | "progress" /** 程序后台繁忙，用户仍可交互 (与wait相反). */
  | "cell" /** 指示单元格可被选中 */
  | "text" /** 指示文字可被选中 */
  | "copy" /** 指示可复制 */
  | "move" /** 被悬浮的物体可被移动 */;

export default defineComponent({
  props: {
    /** 图标名称 */
    icon: {
      type: String,
      reuqired: true,
    },
    /** 图标名称前缀 */
    iconPrefix: {
      type: String,
      default: "music",
    },
    /** 图标的来源网站, 默认iconfont */
    iconSource: {
      type: String,
      default: "iconfont",
    },
    /** 图标的颜色，默认为黑色 */
    color: {
      type: String,
      default: "#000000",
    },
    /** 图标的背景颜色，默认为白色 */
    bgColor: {
      type: String,
      default: "#fff",
    },
    /** 图标的尺寸，默认14px */
    size: {
      type: Number,
      default: 16,
    },
    /** cursor: pointrt  */
    cursor: {
      type: String as PropType<Cursor>,
      default: "pointer",
    },
    /** 缩放比例, 默认50% */
    scale: {
      type: Number,
      default: 0.5,
    },
  },
  emits: ["click"],
  name: "MusicPlayIcon",
  setup(props, { emit }) {
    const {
      icon,
      iconPrefix,
      iconSource,
      color,
      bgColor,
      size,
      cursor,
      scale,
    } = toRefs(props);

    /** 图标的class */
    const iconClass = computed(() => {
      return `${iconSource.value} ${iconPrefix.value}-${icon?.value}`;
    });

    /** 图标的style */
    const iconStyle = computed(() => {
      return {
        color: color.value,
        backgroundColor: bgColor.value,
        width: `${size.value}px`,
        height: `${size.value}px`,
        fontSize: `${size.value * scale.value}px`,
        cursor: cursor.value,
      };
    });

    /** 图标点击事件 */
    const handleClick = () => emit("click");

    return {
      iconClass,
      iconStyle,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.mp-icon {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
