<template>
  <div class="lastest-music max-w-[1100px] w-full flex flex-wrap flex-row">
    <!-- tab -->
    <div class="tab-wrapper w-full">
      <div class="tab">
        <div
          class="text-[13px] h-8 leading-8 px-8 rounded-[16px] cursor-pointer hover:bg-gray-100"
          :class="[tabsState.currentTab === tab.value && 'active']"
          v-for="tab in tabsState.tabs"
          :key="tab.value"
          @click="toggleTab(tab.value)"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>
    <!-- tab content -->
    <div class="content-wrapper flex-1 w-full h-[calc(100%-64px)]">
      <latest-songs v-if="tabsState.currentTab === tabsState.tabs[0].value" />
      <latest-albums v-if="tabsState.currentTab === tabsState.tabs[1].value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { ITabsState } from "./interface/index";
import LatestSongs from "./components/latest-songs/index.vue";
import LatestAlbums from "./components/latest-albums/index.vue";

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
const toggleTab = (value: string) => {
  if (value !== tabsState.currentTab) {
    tabsState.currentTab = value;
  }
};
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
      box-sizing: content-box;
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
