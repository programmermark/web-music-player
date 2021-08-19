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
          <img class="image" src="@/assets/image/no-img.png" alt="歌单封面" />
        </template>
      </el-image>
      <div class="play-count">
        <mp-icon icon="play-caret" color="#fff" bgColor="none" />
        <span>{{ translatePlayCount(playlist.playCount) }}</span>
      </div>
      <div class="creator">
        <mp-icon icon="user-avatar" color="#fff" bgColor="none" />
        <span class="name text-ellipsis">{{ playlist.creator.nickname }}</span>
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
    <!-- card名称 -->
    <div class="title text-ellipsis-2">{{ playlist.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from "vue";
import { translatePlayCount } from "@/common/js/util";
import { IPlayListItem } from "../../interface";
import MPIcon from "@/components/MPIcon.vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    "mp-icon": MPIcon,
    "mp-opt-icon": MPOptIcon,
  },
  props: {
    playlist: {
      type: Object as PropType<IPlayListItem>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
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

    /** 跳转到歌单详情 */
    const gotoPlayListDetail = (id: number) => {
      router.push(`/playlistDetail/${id}`);
    };

    return {
      showIcon,
      handleMouseEnter,
      handleMouseLeave,
      playSong,
      translatePlayCount,
      gotoPlayListDetail,
    };
  },
});
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
      border-radius: 8px;
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
