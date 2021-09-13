<template>
  <div class="left-opts">
    <div class="icon-opts">
      <mp-opt-icon
        class="icon"
        v-for="(opt, index) in opts"
        :key="index"
        :icon="opt.icon"
        :bgColor="opt.color"
        @click="handleIconClick(opt.type)"
      />
    </div>
    <div class="navigator-wrapper">
      <div class="flex-wrapper">
        <div class="flex-reverse-wrapper">
          <div class="navigator-go" @click="navigatorBack">
            <mp-opt-icon
              class="icon-reset"
              icon="arrow-left"
              :size="16"
              scale="1"
              color="#666666"
              bgColor="none"
              display="always"
            />
          </div>
          <div class="navigator-back" @click="navigatorGo">
            <mp-opt-icon
              class="icon-reset"
              icon="arrow-right"
              :size="16"
              scale="1"
              color="#666666"
              bgColor="none"
              display="always"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import MPOptIcon from "../../../../../components/MPOptIcon.vue";

export default defineComponent({
  components: { "mp-opt-icon": MPOptIcon },
  name: "LeftOpts",
  setup() {
    const router = useRouter();

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

    const navigatorGo = () => {
      router.go(1);
    };
    const navigatorBack = () => {
      router.back();
    };

    return {
      opts,
      handleIconClick,
      navigatorGo,
      navigatorBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.left-opts {
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  .icon-opts {
    position: absolute;
    left: 8px;
    top: 9px;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .navigator-wrapper {
    flex: 1;
    display: flex;
    .flex-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      .flex-reverse-wrapper {
        display: flex;
        flex-direction: row;

        .navigator-go .icon-reset {
          margin: 0 8px;
        }
        .navigator-back .icon-reset {
          margin: 0 8px;
        }
        .navigator-go {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
