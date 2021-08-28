<template>
  <div class="recommend-mv-card" @click="gotoMvDetail(id)">
    <!-- MV封面 + MV播放量 -->
    <div
      class="image"
      :style="{ backgroundImage: `url(${imgUrl})` }"
      alt="MV封面"
      @mouseover="subTitleIsShow = true"
      @mouseleave="subTitleIsShow = false"
    ></div>
    <transition>
      <div v-show="!subTitleIsShow" class="play-count">
        <mp-icon icon="play-caret" color="#fff" bgColor="none" />
        <span>{{ translatePlayCount(playCount) }}</span>
      </div>
    </transition>
    <!-- 副标题（动画） -->
    <transition name="subTitle">
      <div v-show="subTitleIsShow" class="sub-title">
        <span>{{ subTitle }}</span>
      </div>
    </transition>
    <!-- MV名称 -->
    <div class="cover">{{ name }}</div>
    <!-- MV作者 -->
    <div class="singer-wrapper text-ellipsis">
      <div
        class="singer"
        v-for="(artist, index) in artists"
        :key="artist.id"
        @click="(e) => gotoSingerDetail(e, artist.id)"
      >
        {{ artist.name
        }}<mp-icon v-show="artists.length !== index + 1" icon="slash" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MPIcon from "@/components/MPIcon.vue";
import { defineComponent, PropType, ref } from "vue";
import { translatePlayCount } from "@/common/js/util";
import { IArtist } from "../../../artist-detail/interface";

/** 推荐MV卡片组件 */
export default defineComponent({
  components: { "mp-icon": MPIcon },
  name: "RecommendMvCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    /** 播放量 */
    playCount: {
      type: Number,
      default: 0,
    },
    /** MV 名称 */
    name: {
      type: String,
      default: "",
    },
    /** 副标题 */
    subTitle: {
      type: String,
      default: "",
    },
    /** MV封面URL */
    imgUrl: {
      type: String,
      default: "",
    },
    /** 作者数组 */
    artists: {
      type: Array as PropType<IArtist[]>,
      required: true,
    },
  },
  setup() {
    const subTitleIsShow = ref(true);

    /** 跳转至MV详情页面 */
    const gotoMvDetail = (id: number) => {
      console.log("跳转至MV详情页面，MV的id：" + id);
    };

    /** 跳转至歌手详情页面 */
    const gotoSingerDetail = (e: Event, id: number) => {
      e.stopPropagation();
      console.log("跳转至歌手详情页面，歌手id：" + id);
    };

    return {
      subTitleIsShow,
      translatePlayCount,
      gotoMvDetail,
      gotoSingerDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.recommend-mv-card {
  position: relative;
  width: calc(25% - 15px);
  margin-right: 20px;
  border-radius: 4px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }

  & > .image {
    width: 100%;
    height: 125px;
    border-radius: 4px;
    background-size: 100% auto;
    border: 1px solid #f2f2f2;
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

  .sub-title {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;

    & > span {
      position: absolute;
      z-index: 10;
      color: #fff;
      font-size: 13px;
      font-weight: bold;
      margin-left: 10px;
    }

    &::after {
      border-radius: 4px;
      background-color: #000;
      position: absolute;
      opacity: 0.1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      opacity: 0.5;
      z-index: 1;
    }
  }

  .cover {
    color: #333333;
    margin: 4px 0 2px;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singer-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    .singer {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #999;
      &:hover {
        color: #666;
      }
    }
  }

  /** 副标题动画 */
  .subTitle-enter-from,
  .subTitle-leave-to {
    opacity: 0;
    height: 0;
    transform: translateY(0px);
  }
  .subTitle-leave-from,
  .subTitle-enter-to {
    opacity: 1;
    height: 30px;
    transform: translateY(0px);
  }
  .subTitle-enter-active,
  .subTitle-leave-active {
    transition: all 1s ease;
  }
}
</style>
