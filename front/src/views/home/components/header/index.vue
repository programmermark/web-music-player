<template>
  <el-row class="header">
    <el-col class="header-left" :span="4">
      <!-- 左侧最小化、最大化和关闭操作按钮 -->
      <left-opts />
      <!-- 路由前进回退操作 -->
    </el-col>
    <el-col class="header-right" :span="20">
      <!-- 导航内容 -->
      <nav-bars v-show="showNavs" />
      <!-- 搜索框 -->
      <!-- 右侧操作 -->
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import LeftOpts from "./left-opts/index.vue";
import NavBars from "./navbars/index.vue";

export default defineComponent({
  components: { LeftOpts, NavBars },
  setup() {
    const route = useRoute();

    const currentRouteName = computed(() => {
      return route.name;
    });

    /** 列表中的routerName会显示导航条 */
    const showNavRouteNames = reactive([
      "Personal",
      "Playlist",
      "RankList",
      "ArtistList",
      "LatestMusic",
    ]);

    const showNavs = computed(() =>
      showNavRouteNames.includes(currentRouteName.value as string)
    );

    return {
      showNavs,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  z-index: 100;
  .header-left {
    position: relative;
    background-color: #f6f6f6;
    border-top-left-radius: 8px;
  }
  .header-right {
    background-color: #f9f9f9;
    border-top-right-radius: 8px;
  }
}
</style>
