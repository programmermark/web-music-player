<template>
  <div class="artist-rank-list">
    <tabs />
    <div class="top-card-wrapper">
      <top-card
        v-for="(artist, index) in topCardList"
        :key="artist.id"
        :no="index + 1"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import Tabs from "./components/tabs/index.vue";
import TopCard from "./components/top-card/index.vue";

export default defineComponent({
  name: "ArtistRankList",
  components: {
    tabs: Tabs,
    "top-card": TopCard,
  },
  setup() {
    const store = useStore();

    /** 排行前三的歌手列表 */
    const topCardList = computed(() =>
      store.state.artistRankList.artistList.filter((item, index) => index < 3)
    );

    /** 排行前三之外的歌手列表 */
    const otherCardList = computed(() =>
      store.state.artistRankList.artistList.filter((item, index) => index >= 3)
    );

    return {
      topCardList,
      otherCardList,
    };
  },
});
</script>

<style lang="scss" scoped>
.artist-rank-list {
  .top-card-wrapper {
    width: calc(100 - 70px);
    padding: 20px 40px 20px 30px;
  }
}
</style>
