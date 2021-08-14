<template>
  <div class="lastest-music">
    <!-- tab -->
    <div class="tab-wrapper">
      <div class="tab">
        <div
          class="tab-item"
          :class="[currentTab === tab.value && 'active']"
          v-for="tab in tabs"
          :key="tab.value"
          @click="toggleTab(tab.value)"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>
    <!-- tab content -->
    <div class="content-wrapper">
      <latest-songs v-show="currentTab === tabs[0].value" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { ITabsState } from "./interface/index";
import LatestSongs from "./components/latest-songs/index.vue";

export default defineComponent({
  name: "LatestMusic",
  components: {
    "latest-songs": LatestSongs,
  },
  setup() {
    /** tabs state */
    const tabsState = reactive<ITabsState>({
      currentTab: "latestSongs",
      tabs: [
        { label: "新歌速递", value: "latestSongs" },
        { label: "新碟上架", value: "latestAlbums" },
      ],
    });

    /**
     * 切换tab
     */
    const toggleTab = (value: string | number) => {
      if (value !== tabsState.currentTab) {
        tabsState.currentTab = value;
      }
    };

    return {
      ...toRefs(tabsState),
      toggleTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.lastest-music {
  width: 100%;
  height: 100%;
  .tab-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    .tab {
      display: inline-flex;
      align-items: center;
      border: 1px solid #bbb;
      height: 32px;
      border-radius: 16px;
      box-sizing: border-box;
      .tab-item {
        font-size: 13px;
        color: #333;
        padding: 8px 32px;
        border-radius: 16px;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }
      }
      .active {
        color: #fff;
        font-weight: bold;
        background-color: #bbb;
        &:hover {
          background-color: #bbb;
        }
      }
    }
  }
}
</style>
