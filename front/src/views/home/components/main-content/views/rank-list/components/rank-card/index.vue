<template>
  <div class="rank-card" @click="viewAll">
    <div
      class="img-wrapper"
      title="点击前往歌单详情"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <img :src="rankList.coverImgUrl" alt="歌单封面" />
      <div class="play-count">
        <mp-icon icon="play-caret" color="#fff" bgColor="none" />
        <span>{{ translatePlayCount(rankList.playCount) }}</span>
      </div>
      <mp-opt-icon
        v-show="showIcon"
        class="play-button"
        title="点击播放歌曲"
        :size="40"
        icon="play-caret-solid"
        color="#d33a33"
        bgColor="#dddddd"
        display="always"
        @click="playSong"
      />
    </div>
    <div class="title text-ellipsis-2">{{ rankList.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from "vue";
import { ISongRank } from "@/store/modules/interface/ranklist";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { translatePlayCount } from "@/common/js/util";
import MPOptIcon from "@/components/MPOptIcon.vue";
import MPIcon from "@/components/MPIcon.vue";

export default defineComponent({
  name: "RankCard",
  components: {
    "mp-icon": MPIcon,
    "mp-opt-icon": MPOptIcon,
  },
  props: {
    rankList: {
      type: Object as PropType<ISongRank>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const { rankList } = toRefs(props);

    const showIcon = ref(false);
    const handleMouseEnter = () => {
      showIcon.value = true;
    };

    const handleMouseLeave = () => {
      showIcon.value = false;
    };

    /** 查看全部 */
    const viewAll = () => {
      const id = rankList.value.id;
      router.push(`/playlistDetail/${id}`);
    };

    /** 播放歌单歌曲，从第一首歌曲开始播放 */
    const playSong = (e: Event) => {
      e.stopPropagation();
      const id = rankList.value.id;
      store.dispatch("player/setSongList", {
        id,
      });
    };

    return {
      showIcon,
      handleMouseEnter,
      handleMouseLeave,
      viewAll,
      playSong,
      translatePlayCount,
    };
  },
});
</script>

<style lang="scss" scoped>
.rank-card {
  width: 140px;
  margin-right: calc(20% - 168px);
  display: inline-flex;
  flex-wrap: wrap;
  cursor: pointer;

  &:nth-child(6n) {
    margin-right: 0;
  }

  .img-wrapper {
    width: 140px;
    height: 140px;
    border-radius: 8px;
    position: relative;
    & > img {
      width: 100%;
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

    .play-button {
      position: absolute;
      left: calc(50% - 20px);
      top: calc(50% - 20px);
    }
  }

  .title {
    width: 100%;
    height: 70px;
    color: #333;
    font-size: 14px;
    margin-top: 8px;
  }

  .text-ellipsis-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
