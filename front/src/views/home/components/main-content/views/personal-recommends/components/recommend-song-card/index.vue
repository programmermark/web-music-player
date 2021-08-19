<template>
  <div
    class="recommend-song-card"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick"
  >
    <div class="card">
      <el-image class="image" :src="`${imgUrl}?param=200y200`" alt="歌单封面">
        <template #placeholder>
          <img class="image" src="@/assets/image/no-img.png" alt="歌单封面" />
        </template>
      </el-image>
      <div class="play-count" v-if="playCount">
        <mp-icon icon="play-caret" color="#fff" bgColor="none" />
        <span>{{ translatePlayCount(playCount) }}</span>
      </div>
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
import MPIcon from "@/components/MPIcon.vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { defineComponent, ref, toRefs } from "vue";
import { useStore } from "@/store";
import { translatePlayCount } from "@/common/js/util";

export default defineComponent({
  components: { "mp-icon": MPIcon, "mp-opt-icon": MPOptIcon },
  name: "RecommendSongCard",
  props: {
    /** 歌单id */
    id: {
      type: Number,
      required: true,
    },
    /** 卡片标题 */
    title: {
      type: String,
      required: true,
    },
    /** 卡片链接 */
    url: {
      type: String,
      required: true,
    },
    /** 卡片图片 */
    imgUrl: {
      type: String,
      required: true,
    },
    /** 播放量 */
    playCount: {
      type: Number,
      required: true,
    },
  },
  setup(prop) {
    const { id } = toRefs(prop);
    const store = useStore();

    const showIcon = ref(false);

    const handleMouseEnter = () => {
      showIcon.value = true;
    };
    const handleMouseLeave = () => {
      showIcon.value = false;
    };
    const handleCardClick = () => {
      console.log("点击card，打开播放列表详情");
    };
    const playSong = (e: Event) => {
      e.stopPropagation();
      store.dispatch("player/setSongList", { id: id.value });
    };

    return {
      showIcon,
      translatePlayCount,
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

  .card {
    display: flex;
    width: 100%;
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    .image {
      width: 100%;
      border-radius: 4px;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
    }
    .play-count {
      display: flex;
      align-items: center;
      position: absolute;
      top: 4px;
      right: 6px;
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
