<template>
  <div
    class="recommend-song-card"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick"
  >
    <div class="card" :style="{ backgroundColor: bgColor }">
      <div v-show="state.showIcon" class="subTitle">
        {{ subTitle }}
      </div>
      <MpOptSpecialIcon
        icon="calendar"
        color="#fff"
        bgColor="#000"
        :size="state.eleWidth"
        display="always"
        :innerNumberStyle="{
          fontSize: '36px',
          top: '85px',
        }"
      />
      <MPOptIcon
        v-show="state.showIcon"
        class="play-button"
        :size="24"
        icon="play-caret-solid"
        color="#d33a33"
        bgColor="#dddddd"
        display="always"
        @click="playSong"
      />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
import MPOptIcon from "@/components/MPOptIcon.vue";
import MpOptSpecialIcon from "@/components/MpOptSpecialIcon.vue";
import router from "@/router";
import { onMounted, onUnmounted, reactive, toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    /** 卡片标题 */
    title?: string;
    /** 卡片副标题 */
    subTitle?: string;
    /** 卡片链接 */
    url: string;
    /** 背景颜色 */
    bgColor?: string;
  }>(),
  {
    title: "每日歌曲推荐",
    subTitle: "根据您的音乐口味生成每日更新",
    bgColor: "#EDBFBC",
  }
);

const state = reactive({
  showIcon: false,
  eleWidth: 0,
});

const handleMouseEnter = () => {
  state.showIcon = true;
};
const handleMouseLeave = () => {
  state.showIcon = false;
};
const handleCardClick = () => {
  router.push(props.url);
};
const playSong = (e: Event) => {
  e.stopPropagation();
};

onMounted(() => {
  setTimeout(() => {
    const ele = document.querySelector(".recommend-song-card");
    state.eleWidth = ele?.clientWidth || 0;
  }, 100);

  window.addEventListener("resize", () => {
    const ele = document.querySelector(".recommend-song-card");
    state.eleWidth = ele?.clientWidth || 0;
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", () => console.log("清除对resize事件的监听"));
});
</script>

<style lang="scss" scoped>
.recommend-song-card {
  width: calc(20% - 16px);
  margin-right: 20px;
  margin-bottom: 40px;
  border-radius: 4px;

  .card {
    display: flex;
    width: 100%;
    position: relative;
    cursor: pointer;
    border-radius: 4px;

    .subTitle {
      position: absolute;
      color: #fff;
      font-size: 13px;
      font-weight: bold;
      padding: 10px;
      line-height: 1.5;
      z-index: 10;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background-color: #000;
        opacity: 0.5;
        z-index: -1;
      }
    }

    .play-count {
      position: absolute;
      top: 2px;
      right: 4px;
      color: white;
      font-size: 12px;
      font-weight: bold;
      & > span {
        margin-left: 2px;
      }
    }
    .play-button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
  .title {
    width: 100%;
    font-size: 13px;
    line-height: 1.5;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &:nth-child(5n) {
    margin-right: 0;
  }
}
</style>
