<template>
  <div class="icon-wrapper" :style="iconBgStyle" @click="handleClick">
    <i :class="['icon', iconClass, 'mp-opt-icon']" :style="iconStyle"></i>
  </div>
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
      default: "#484344",
    },
    /** 图标的背景颜色，默认为白色 */
    bgColor: {
      type: String,
      default: "#fff",
    },
    /** 图标的尺寸，默认14px */
    size: {
      type: Number,
      default: 12,
    },
    /** cursor: pointrt  */
    cursor: {
      type: String as PropType<Cursor>,
      default: "pointer",
    },
    /** 图标相对背景颜色的缩放比例，默认50% */
    scale: {
      type: String,
      default: "60%",
    },
    /** 图标的现实状态： 'hover': 鼠标移入时才显示图标， 'always': 一直显示图标 */
    display: {
      type: String,
      default: "hover",
      validator: (val: string) => ["always", "hover"].includes(val),
    },
  },
  emits: ["click"],
  name: "MusicPlayOptIcon",
  setup(props, { emit }) {
    const {
      icon,
      iconPrefix,
      iconSource,
      color,
      bgColor,
      size,
      scale,
      cursor,
      display,
    } = toRefs(props);

    /** 图标的class */
    const iconClass = computed(() => {
      return `${iconSource.value} ${iconPrefix.value}-${icon?.value}`;
    });

    /** 背景颜色的style */
    const iconBgStyle = computed(() => {
      return {
        backgroundColor: bgColor.value,
        width: `${size.value}px`,
        height: `${size.value}px`,
        cursor: `${cursor.value}`,
      };
    });

    /** 图标的style */
    const iconStyle = computed(() => {
      const opacity = display.value === "hover" ? 0 : 1;
      return {
        color: color.value,
        fontSize: `${size.value}px`,
        transform: `scale(${scale.value}, ${scale.value})`,
        opacity: opacity,
      };
    });

    /** 图标点击事件 */
    const handleClick = (e: Event) => emit("click", e);

    return {
      iconClass,
      iconStyle,
      iconBgStyle,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  .mp-opt-icon {
    display: block;
    opacity: 0;
    font-weight: bolder;
    &:hover {
      opacity: 1 !important;
    }
  }
}
</style>
