<template>
  <div class="card">
    <img class="image" :src="imgUrl" alt="歌单封面" />
    <div class="icon">
      <mp-icon icon="play-caret" color="#fff" bgColor="none" />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import MPIcon from "@/components/MPIcon.vue";
import { defineComponent } from "vue";

/** 独家放送卡片 */
export default defineComponent({
  components: { "mp-icon": MPIcon },
  name: "ExclusiveBroadcastCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    /** 图片链接地址 */
    imgUrl: {
      type: String,
      required: true,
    },
    /** 卡片标题 */
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: calc(25% - 15px);
  margin-right: 20px;
  border-radius: 4px;
  margin-bottom: 40px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }

  & > .image {
    width: 100%;
    border-radius: 4px;
  }

  .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 4px;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      border-radius: 50%;
      background-color: #000;
      border: 1px solid #efefef;
      opacity: 0.5;
      z-index: -1;
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
}
</style>
