<template>
  <div
    class="list-card"
    @click="gotoArtistDetail(artist.id)"
    title="点击查看歌手详情"
  >
    <!-- 排名和排名变化 -->
    <div class="rank-wrapper">
      <div class="rank">{{ rank + 1 }}</div>
      <div class="rank-change">
        <i
          :class="[
            rankChange.unchanged
              ? 'el-icon-minus'
              : rankChange.rising
              ? 'el-icon-top color-top'
              : 'el-icon-bottom color-bottom',

            'icon-reset',
          ]"
        />
        <span>{{ rankChange.value }}</span>
      </div>
    </div>
    <!-- 歌手头像 -->
    <div class="portrait-wrapper" title="歌手头像">
      <el-image
        class="portrait"
        :src="`${artist.picUrl}?param=120y120`"
        alt="歌手头像"
      >
        <template #placeholder>
          <img
            class="no-image"
            src="@/assets/image/no-img.png"
            alt="歌手头像"
          />
        </template>
      </el-image>
    </div>
    <!-- 歌手名和团体 -->
    <div class="name-wrapper">
      <span class="name">{{ artist.name }}</span>
      <span class="trans" v-if="artist.trans">（{{ artist.trans }}）</span>
    </div>
    <!-- 热度 -->
    <div class="score">热度：{{ artist.score }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { useRouter } from "vue-router";
import { IArtistCard } from "@/store/modules/interface/artist-rank-list";

export default defineComponent({
  name: "ListCard",
  props: {
    /** 歌手排名 */
    rank: {
      type: Number,
      required: true,
    },
    /** 歌手信息 */
    artist: {
      type: Object as PropType<IArtistCard>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const { rank, artist } = toRefs(props);

    const rankChange = computed(() => {
      const lastRank = artist.value.lastRank;
      const currentRank = rank.value;
      return {
        unchanged: currentRank === lastRank,
        rising: currentRank < lastRank,
        value: Math.abs(currentRank - lastRank),
      };
    });

    const gotoArtistDetail = (id: number) => {
      console.log(`跳转到歌手详情，歌手id：${id}`);
      router.push(`/artist/${id}`);
    };

    return {
      rankChange,
      gotoArtistDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-card {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 40px 0 30px;
  background-color: #fafafa;
  cursor: pointer;

  .rank-wrapper {
    text-align: center;
    position: relative;
    top: 8px;
    margin-right: 24px;

    .rank {
      color: #999;
      font-size: 16px;
      font-weight: 500;
    }
    .rank-change {
      font-size: 16px;
      transform: scale(0.5);
      color: #999;

      .color-bottom {
        color: #2c77ca;
      }

      .color-top {
        color: #cc2829;
      }

      .icon-reset {
        font-weight: bold;
      }

      & > span {
        margin-right: 2px;
      }
    }
  }

  .portrait-wrapper {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .portrait {
      width: auto;
      height: 100%;

      .no-image {
        width: 100%;
        height: 100%;
        border: 1px solid #ededed;
      }

      :deep(.el-image__inner) {
        border: 1px solid #ededed;
        border-radius: 4px;
      }
    }

    :deep(.el-image__inner) {
      border: 1px solid #ededed;
      border-radius: 4px;
    }
  }

  .name-wrapper {
    flex: 1;
    font-size: 14px;
    .name {
      color: #333;
    }
    .trans {
      color: #999;
    }
  }

  .score {
    color: #999;
    font-size: 13px;
  }
}

.list-card:nth-child(2n) {
  background-color: #fff;
}

.list-card:hover {
  background-color: #f2f2f2;
}
</style>
