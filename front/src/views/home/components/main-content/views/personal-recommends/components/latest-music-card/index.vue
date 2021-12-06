<template>
  <div class="latest-music-card" @dblclick="playSong" title="双击播放歌曲">
    <div class="wrapper">
      <!-- 歌曲封面（单击播放） -->
      <div class="cover" @click="playSong" title="点击播放歌曲">
        <el-image class="image" :src="`${coverImg}?param=100y100`" alt="歌曲封面图片">
          <template #placeholder>
            <img class="no-image" src="@/assets/image/no-img.png" alt="歌曲封面图片" />
          </template>
        </el-image>
        <MPOptIcon
          class="play-button"
          :size="24"
          icon="play-caret-solid"
          color="#d33a33"
          bgColor="rgba(255,255,255,0.5)"
          display="always"
          @click="playSong"
        />
      </div>
      <!-- 排序｜播放时会显示播放图标 -->
      <div class="order">
        <div class="order-num">{{ order }}</div>
      </div>
      <!-- 歌曲名称、歌手名称 -->
      <div class="name">
        <div class="song-name">
          {{ songName }}
          <span v-show="aliasName">（{{ aliasName }}）</span>
        </div>
        <div class="author-name-wrapper text-ellipsis">
          <div class="author-name" v-for="(artist, index) in artists" :key="artist.id">
            <span class="text" @click="gotoArtistDetail(artist.id)">{{
              artist.name
            }}</span>
            <span v-if="index + 1 < artists.length" class="parting-line">/</span>
          </div>
        </div>
      </div>
      <!-- MV图标（有mvId才显示） -->
      <div class="mv-wrapper" v-show="mvId > 0">
        <MPIcon
          icon="mv"
          :size="32"
          color="#d33333"
          bgColor="none"
          @click="gotoMVDetail(mvId)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MPIcon from "@/components/MPIcon.vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { computed, toRefs } from "vue";
import { useStore } from "@/store";
import { IArtist } from "../../../artist-detail/interface";
import { gotoArtistDetail, gotoMVDetail } from "@/common/js/router";

const props = withDefaults(
  defineProps<{
    /** 记录id或者歌曲id */
    id: number;
    /** 歌曲MV的id，可能为空 */
    mvId: number;
    /** 排序数字 */
    orderNumber: number;
    /** 封面图片URL */
    coverImg: string;
    /** 歌曲名称 */
    songName: string;
    /** 歌曲别名 */
    aliasName?: string;
    /** 作者数组 */
    artists: IArtist[];
  }>(),
  {
    aliasName: "",
  }
);

const { id, orderNumber } = toRefs(props);
const store = useStore();

/** 格式化排序数字 */
const order = computed(() => {
  if (orderNumber.value < 10) {
    return `0${orderNumber.value}`;
  }
  return orderNumber.value;
});

const playSong = () => {
  store.dispatch("player/setCurrentSong", id.value);
};
</script>

<style lang="scss" scoped>
.latest-music-card {
  width: calc(50% - 10px);
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 10px;
  border-radius: 4px;
  margin-right: 20px;
  box-sizing: border-box;
  cursor: pointer;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &:hover {
    background-color: #f5f5f5;
  }
  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;

    .cover {
      width: 60px;
      height: 60px;
      position: relative;

      & > .image {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: 1px solid #ededed;
        border-radius: 4px;

        .no-image {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }

        :deep(.el-image__inner) {
          border-radius: 4px;
        }
      }
      .play-button {
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 12px);
      }
    }

    .order {
      width: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      .order-num {
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #b7b7b7;
      }
      .play-icon {
        color: #d33933;
      }
    }

    .name {
      max-width: calc(100% - 150px);
      .song-name {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;

        & > span {
          color: #979797;
        }
      }

      .author-name-wrapper {
        .author-name {
          display: inline-block;
          font-size: 13px;
          color: #666666;
          .text {
            cursor: pointer;
          }
          .parting-line {
            padding: 0 2px;
          }
        }
      }
    }

    .mv-wrapper {
      margin-right: 20px;
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
