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

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "RankListTabs",
  setup() {
    const store = useStore();
    const route = useRoute();

    const tabs = computed(() => store.state.artistRankList.tabs);

    const currentTab = computed(() => store.state.artistRankList.currentTab);

    /**
     * 切换tab
     */
    const switchTab = (tabValue: number) => {
      store.dispatch("artistRankList/setArtistList", tabValue);
    };

    onMounted(() => {
      const type = route.query.type;
      if (type) {
        switchTab(Number(type));
      } else {
        switchTab(1);
      }
    });

    return {
      tabs,
      currentTab,
      switchTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1000;
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
