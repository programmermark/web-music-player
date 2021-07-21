<template>
  <div class="left-opts">
    <mp-opt-icon
      class="icon"
      v-for="(opt, index) in opts"
      :key="index"
      :icon="opt.icon"
      :bgColor="opt.color"
      @click="handleIconClick(opt.type)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MPOptIcon from "../../../../../components/MPOptIcon.vue";

export default defineComponent({
  components: { "mp-opt-icon": MPOptIcon },
  name: "LeftOpts",
  setup() {
    /** 图标的类型 */
    const opts = [
      {
        color: "#ff5c5c",
        icon: "close",
        type: "close",
      },
      {
        color: "#ffbb38",
        icon: "minimize",
        type: "minimize",
      },
      {
        color: "#29ca38",
        icon: "maximize",
        type: "maximize",
      },
    ];

    /**
     * 点击图标触发的事件
     */
    const handleIconClick = (type: string) => {
      if (type === "close") {
        console.log(`click ${type}`);
      } else if (type === "minimize") {
        console.log(`click ${type}`);
      } else if (type === "maximize") {
        console.log(`click ${type}`);
      }
    };

    return {
      opts,
      handleIconClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.left-opts {
  width: 100%;
  position: absolute;
  left: 8px;
  top: 9px;
  .icon {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
