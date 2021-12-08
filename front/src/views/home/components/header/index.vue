<template>
  <el-row class="header">
    <el-col class="header-left" :span="4">
      <!-- 左侧最小化、最大化和关闭操作按钮 -->
      <left-opts />
      <!-- 路由前进回退操作 -->
    </el-col>
    <el-col class="header-right" :span="20">
      <!-- 导航内容 -->
      <nav-bars v-show="showNavs && !isShowSongDetail" />
      <!-- 独立导航内容：只显示当前页面的单个标题 -->
      <div class="single-nav-wrapper" v-show="!showNavs && singleNavText">
        <div class="single-nav">
          {{ singleNavText }}
        </div>
      </div>
      <!-- 组合导航内容：显示多个页面标题，需要独立定制组件 -->
      <div class="flex-1 flex flex-row-reverse">
        <div class="items-center h-full pr-4">
          <!-- 搜索框 -->
          <Search class="pr-6" />
          <!-- 右侧操作 -->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { ref, watch, computed, defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import LeftOpts from "./left-opts/index.vue";
import NavBars from "./navbars/index.vue";
import Search from "./componnets/search/index.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: { LeftOpts, NavBars, Search },
  setup() {
    const route = useRoute();
    const store = useStore();

    /** 列表中的routerName会显示导航条 */
    const showNavRouteNames = reactive([
      "Personal",
      "Playlist",
      "RankList",
      "ArtistList",
      "LatestMusic",
      "SystemNotify",
    ]);

    /** 独立导航显示的名称 */
    const singleNavText = ref("");

    /** 支持独立导航的导航列表 */
    const singleNavs = [{ text: "独家放送", url: "/exclusive-broadcast" }];

    const currentRouteName = computed(() => {
      return route.name;
    });

    const showNavs = computed(() =>
      showNavRouteNames.includes(currentRouteName.value as string)
    );

    /** 是否展示歌曲详情 */
    const isShowSongDetail = computed(() => store.state.player.isShowSongDetail);

    watch(
      () => route.path,
      (path) => {
        const result = singleNavs.find((nav) => nav.url === path);
        if (result) {
          singleNavText.value = result.text;
        }
      }
    );

    return {
      isShowSongDetail,
      showNavs,
      singleNavText,
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
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border-top-right-radius: 8px;

    .single-nav-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      .single-nav {
        margin-left: 30px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>
