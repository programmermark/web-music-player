<template>
  <div class="album-card">
    <div
      class="image-wrapper"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="gotoAlbumDetail(album.id)"
    >
      <el-image class="image" :src="imageUrl" alt="专辑封面">
        <template #placeholder>
          <img class="no-image" src="@/assets/image/no-img.png" alt="专辑封面" />
        </template>
      </el-image>
      <MPOptIcon
        v-show="showIcon"
        class="play-button"
        title="点击播放歌曲"
        :size="40"
        icon="play-caret-solid"
        color="#d33a33"
        bgColor="#dddddd"
        display="always"
        @click="(e) => playAlbumSong(e, album.id)"
      />
    </div>
    <div class="name text-ellipsis-2" @click="gotoAlbumDetail(album.id)">
      {{ album.name }}
    </div>
    <div class="artist text-ellipsis" v-if="album.artists">
      <div class="artist-item" v-for="(artist, index) in album.artists" :key="artist.id">
        <span class="link-reset" @click="gotoArtistDetail(artist.id)">
          {{ artist.name }}
        </span>
        <span class="parting-line" v-if="index + 1 !== album.artists.length">/</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from "vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { gotoAlbumDetail, gotoArtistDetail } from "@/common/js/router";
import type { IAlbum } from "../../../artist-detail/interface";
import { usePlayerStore } from "@/stores/player";

// 最新音乐 - 新碟上架 - 专辑卡片组件
const props = defineProps<{
  /** 专辑对象 */
  album: IAlbum;
}>();

const playerStore = usePlayerStore();

const { album } = toRefs(props);

const showIcon = ref(false);

const imageUrl = computed(() => album.value.picUrl + `?param=140y140`);

const handleMouseEnter = () => {
  showIcon.value = true;
};
const handleMouseLeave = () => {
  showIcon.value = false;
};

/** 播放专辑歌曲 */
const playAlbumSong = (e: Event, id: number) => {
  e.stopPropagation();
  playerStore.setSongListByAlbumId(id);
};
</script>

<style lang="scss" scoped>
.album-card {
  width: 140px;
  margin-right: calc(25% - 175px);
  box-sizing: border-box;
  margin-bottom: 36px;
  &:nth-child(5n) {
    margin-right: 0;
  }
  .image-wrapper {
    position: relative;

    .image {
      width: 140px;
      height: 140px;
      cursor: pointer;

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
      top: calc(50% - 20px);
      left: calc(50% - 20px);
    }
  }

  .name {
    color: #333;
    font-size: 14px;
    line-height: 1.6;
    margin-top: 10px;
    cursor: pointer;
  }
  .artist {
    display: flex;
    align-items: center;
    color: #aaa;
    font-size: 13px;
    margin-top: 4px;
    cursor: pointer;
    .artist-item {
      .link-reset {
        color: #aaa;
        text-decoration: none;
      }
      .parting-line {
        color: #666666;
        font-size: 13px;
        padding: 0 4px;
      }
    }
  }
}
</style>
