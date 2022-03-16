<template>
  <div class="left-opts">
    <div class="icon-opts">
      <MPOptIcon
        class="icon"
        v-for="(opt, index) in opts"
        :key="index"
        :icon="opt.icon"
        :bgColor="opt.color"
        @click="handleIconClick(opt.type)"
      />
    </div>
    <div v-if="isShowSongDetail">
      <MPOptIcon
        class="absolute left-20 top-2"
        icon="arrow-bottom"
        :size="16"
        scale="1"
        color="#666666"
        bgColor="none"
        display="always"
        @click="toogleSongDetail"
      />
    </div>
    <div v-else class="navigator-wrapper">
      <div class="flex-wrapper">
        <div class="flex-reverse-wrapper">
          <div class="navigator-go" @click="navigatorBack">
            <MPOptIcon
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
            <MPOptIcon
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

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
import { computed } from "vue";
import { useRouter } from "vue-router";
import MPOptIcon from "@/components/MPOptIcon.vue";

const router = useRouter();
const storePlayer = usePlayerStore();

/** 是否展示歌曲详情 */
const isShowSongDetail = computed(() => storePlayer.isShowSongDetail);

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
 * 切换歌曲详情显示状态
 */
const toogleSongDetail = () => {
  storePlayer.isShowSongDetail = !isShowSongDetail.value;
};

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
