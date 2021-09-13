<template>
  <div class="artist-rank-list">
    <tabs />
    <div class="content-wrapper" v-show="!loading">
      <div class="top-card-wrapper">
        <top-card
          v-for="(artist, index) in topCardList"
          :key="artist.id"
          :id="artist.id"
          :no="index + 1"
          :name="artist.name"
          :trans="artist.trans"
          :portrait="artist.picUrl"
          :score="artist.score"
        />
      </div>
      <div class="card-list-wrapper">
        <list-card
          v-for="(artist, index) in otherCardList"
          :key="index + 1"
          :rank="index + 3"
          :artist="artist"
        />
      </div>
    </div>
    <div
      class="card-wrapper-loading"
      v-show="loading"
      v-loading="loading"
      element-loading-text="载入中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255)"
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import Tabs from "./components/tabs/index.vue";
import TopCard from "./components/top-card/index.vue";
import ListCard from "./components/list-card/index.vue";

export default defineComponent({
  name: "ArtistRankList",
  components: {
    tabs: Tabs,
    "top-card": TopCard,
    "list-card": ListCard,
  },
  setup() {
    const store = useStore();

    const loading = computed(() => store.state.artistRankList.loading);

    /** 排行前三的歌手列表 */
    const topCardList = computed(() =>
      store.state.artistRankList.artistList.filter((item, index) => index < 3)
    );

    /** 排行前三之外的歌手列表 */
    const otherCardList = computed(() =>
      store.state.artistRankList.artistList.filter((item, index) => index >= 3)
    );

    return {
      loading,
      topCardList,
      otherCardList,
    };
  },
});
</script>

<style lang="scss" scoped>
.artist-rank-list {
  height: 100%;
  .content-wrapper {
    .top-card-wrapper {
      width: calc(100% - 70px);
      padding: 70px 40px 20px 30px;
      display: flex;
      align-items: center;
    }

    .card-list-wrapper {
      padding-top: 20px;
      padding-bottom: 50px;
    }
  }

  .card-wrapper-loading {
    top: 52px;
    height: calc(100% - 102px);
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
