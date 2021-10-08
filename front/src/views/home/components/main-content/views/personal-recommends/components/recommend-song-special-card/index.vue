<template>
  <div
    class="recommend-song-card"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick"
  >
    <div class="card" :style="{ backgroundColor: bgColor }">
      <div v-show="showIcon" class="subTitle">
        {{ subTitle }}
      </div>
      <mp-opt-special-icon
        icon="calendar"
        color="#fff"
        bgColor="#000"
        :size="eleWidth"
        display="always"
      />
      <mp-opt-icon
        v-show="showIcon"
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

<script lang="ts">
import MPOptIcon from "@/components/MPOptIcon.vue";
import MpOptSpecialIcon from "@/components/MpOptSpecialIcon.vue";
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";

export default defineComponent({
  components: { "mp-opt-icon": MPOptIcon, MpOptSpecialIcon },
  name: "RecommendSongSpecialCard",
  props: {
    /** 卡片标题 */
    title: {
      type: String,
      default: "每日歌曲推荐",
    },
    /** 卡片副标题 */
    subTitle: {
      type: String,
      default: "根据您的音乐口味生成每日更新",
    },
    /** 卡片链接 */
    url: {
      type: String,
      required: true,
    },
    /** 背景颜色 */
    bgColor: {
      type: String,
      default: "#EDBFBC",
    },
  },
  setup() {
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
      console.log("点击card，打开播放列表详情");
    };
    const playSong = (e: Event) => {
      console.log("点击播放音乐");
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

    return {
      ...toRefs(state),
      handleMouseEnter,
      handleMouseLeave,
      handleCardClick,
      playSong,
    };
  },
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
