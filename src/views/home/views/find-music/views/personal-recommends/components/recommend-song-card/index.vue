<template>
  <div
    class="recommend-song-card"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick(id)"
  >
    <div class="card">
      <el-image class="image" :src="`${imgUrl}?param=200y200`" alt="歌单封面">
        <template #placeholder>
          <img class="no-image" src="@/assets/image/no-img.png" alt="歌单封面" />
        </template>
      </el-image>
      <div class="play-count" v-if="playCount">
        <MPIcon icon="play-caret" color="#fff" bgColor="none" />
        <span>{{ translatePlayCount(playCount) }}</span>
      </div>
      <MPOptIcon
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

<script lang="ts" setup>
import MPIcon from "@/components/MPIcon.vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { ref, toRefs } from "vue";
import { translatePlayCount } from "@/common/js/util";
import { useRouter } from "vue-router";
import { usePlayerStore } from "@/stores/player";

const props = defineProps<{
  /** 歌单id */
  id: number;
  /** 卡片标题 */
  title: string;
  /** 卡片链接 */
  url: string;
  /** 卡片图片 */
  imgUrl: string;
  /** 播放量 */
  playCount: number;
}>();

const router = useRouter();
const playerStore = usePlayerStore();

const { id } = toRefs(props);

const showIcon = ref(false);

const handleMouseEnter = () => {
  showIcon.value = true;
};
const handleMouseLeave = () => {
  showIcon.value = false;
};

/** 查看歌单详情 */
const handleCardClick = (id: number) => {
  router.push(`/playlistDetail/${id}`);
};

/** 播放歌曲 */
const playSong = (e: Event) => {
  e.stopPropagation();
  playerStore.setSongList({ id: id.value });
};
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
