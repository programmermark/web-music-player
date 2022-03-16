<template>
  <div class="tabs">
    <div
      class="tab-item"
      :class="[currentTab === tab.value && 'active']"
      v-for="tab in tabs"
      :key="tab.value"
      @click="switchTab(tab.value)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useArtistRankListStore } from "@/stores/artist-rank-list";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const artistRankListStore = useArtistRankListStore();

const route = useRoute();

const tabs = computed(() => artistRankListStore.tabs);

const currentTab = computed(() => artistRankListStore.currentTab);

/**
 * 切换tab
 */
const switchTab = (tabValue: number) => {
  artistRankListStore.setArtistList(tabValue);
};

onMounted(() => {
  const type = route.query.type;
  if (type) {
    switchTab(Number(type));
  } else {
    switchTab(1);
  }
});
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  display: flex;
  padding-top: 25px;
  padding-bottom: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;

  .tab-item {
    margin-left: 30px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
  }
  .active {
    color: #000;
    font-weight: bold;
  }
}
</style>
