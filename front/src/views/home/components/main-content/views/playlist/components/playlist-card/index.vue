<template>
  <div
    class="playlist-card"
    @click="gotoPlayListDetail(playlist.id)"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- card图片 -->
    <div class="content">
      <el-image
        class="image"
        :src="`${playlist.coverImgUrl}?param=200y200`"
        alt="歌单封面"
      >
        <template #placeholder>
          <img class="no-image" src="@/assets/image/no-img.png" alt="歌单封面" />
        </template>
      </el-image>
      <div class="play-count">
        <MPIcon icon="play-caret" color="#fff" bgColor="none" />
        <span>{{ translatePlayCount(playlist.playCount) }}</span>
      </div>
      <div class="creator">
        <MPIcon icon="user-avatar" color="#fff" bgColor="none" />
        <span class="name text-ellipsis">{{ playlist.creator.nickname }}</span>
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
    <!-- card名称 -->
    <div class="title text-ellipsis-2">{{ playlist.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { translatePlayCount } from "@/common/js/util";
import { IPlayListItem } from "../../interface";
import MPIcon from "@/components/MPIcon.vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { useStore } from "@/store";
import { gotoPlayListDetail } from "@/common/js/router";

const props = defineProps<{
  playlist: IPlayListItem;
}>();

const store = useStore();

const { playlist } = toRefs(props);

const showIcon = ref(false);

const handleMouseEnter = () => {
  showIcon.value = true;
};
const handleMouseLeave = () => {
  showIcon.value = false;
};

const playSong = (e: Event) => {
  e.stopPropagation();
  store.dispatch("player/setSongList", { id: playlist.value.id });
};
</script>

<style lang="scss" scoped>
.playlist-card {
  width: calc(20% - 16px);
  border-radius: 8px;
  margin-right: 20px;
  margin-bottom: 30px;

  &:nth-child(5n) {
    margin-right: 0;
  }

  .content {
    width: 100%;
    cursor: pointer;
    position: relative;
    & .image {
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
    .creator {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 10px;
      left: 8px;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
    .play-button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }

  .title {
    margin-top: 6px;
    font-size: 14px;
    color: #333;
    line-height: 1.5;
  }
}
</style>
