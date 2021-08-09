<template>
  <div class="rank-list">
    <div class="content-wrapper" v-if="!loading">
      <!-- 官方榜：前4个歌曲榜单 + 歌手榜单 -->
      <div class="official-wrapper">
        <div class="title">官方榜</div>
        <template
          v-if="songRankListOfficial && songRankListOfficial.length > 0"
        >
          <official-rank-list
            v-for="rankList in songRankListOfficial"
            :key="rankList.id"
            :rankList="rankList"
          />
        </template>
        <template v-if="artistRank">
          <official-rank-list :rankList="artistRank" type="artist" />
        </template>
      </div>
      <!-- 全球榜：除去前4个之外的歌曲榜单 -->
      <div class="gloabl-wrapper">
        <div class="title">全球榜</div>
        <div class="card-wrapper">
          <rank-card
            v-for="rankList in songRankListGlobal"
            :key="rankList.id"
            :rankList="rankList"
          />
        </div>
      </div>
    </div>
    <div
      class="rank-list-loading"
      v-show="loading"
      v-loading="loading"
      element-loading-text="载入中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255)"
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import OfficialRankList from "./components/official-rank-list/index.vue";
import RankCard from "./components/rank-card/index.vue";

export default defineComponent({
  name: "RankList",
  components: {
    "official-rank-list": OfficialRankList,
    "rank-card": RankCard,
  },
  setup() {
    const store = useStore();

    /** 是否显示loading */
    const loading = computed(() => store.state.rankList.loading);

    /** 歌单官方排行榜 */
    const songRankListOfficial = computed(
      () => store.state.rankList.songRankListOfficial
    );

    /**  歌手排行榜 */
    const artistRank = computed(() => store.state.rankList.artistRank);
    /** 全球歌单排行榜 */
    const songRankListGlobal = computed(
      () => store.state.rankList.songRankListGlobal
    );

    /** 获取所有排行榜数据 */
    const fetchAllRankList = () => {
      store.dispatch("rankList/setAllRankList");
    };

    onMounted(() => {
      fetchAllRankList();
    });

    return {
      loading,
      songRankListOfficial,
      artistRank,
      songRankListGlobal,
    };
  },
});
</script>

<style lang="scss" scoped>
.rank-list {
  height: 100%;

  .content-wrapper {
    padding-top: 30px;
    .official-wrapper {
      margin-bottom: 40px;
      .title {
        color: #333;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 12px;
      }
    }
    .gloabl-wrapper {
      .title {
        color: #333;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 12px;
      }
      .card-wrapper {
        padding-bottom: 60px;
      }
    }
  }

  .rank-list-loading {
    height: calc(100% - 50px);
    :deep(.el-loading-spinner) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.el-icon-loading) {
      color: #666;
    }

    :deep(.el-loading-text) {
      margin-left: 2px;
      color: #666;
    }
  }
}
</style>
