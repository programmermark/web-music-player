<template>
  <ul class="navbars">
    <li
      v-for="(nav, index) in navs"
      :class="['nav', nav.active && 'active']"
      :key="index"
      @click="handleClickNav(nav.url, index)"
    >
      <span>{{ nav.text }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

/** 顶部导航条 */
export default defineComponent({
  name: "NavBar",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      navs: [
        { text: "个性推荐1", url: "/", active: true },
        { text: "歌单", url: "/playlist", active: false },
        { text: "主播电台", url: "", active: false },
        { text: "排行榜", url: "/rankList", active: false },
        { text: "歌手", url: "/artistList", active: false },
        { text: "最新音乐", url: "/latestMusic", active: false },
      ],
    });

    watch(
      () => route.path,
      (path) => {
        state.navs = state.navs.map((item) => ({
          ...item,
          active: item.url === path,
        }));
      }
    );

    /**
     * 点击nav高亮当前nav并跳转到指定的路由
     */
    const handleClickNav = (url: string, index: number) => {
      state.navs = state.navs.map((nav, idx) => ({
        ...nav,
        active: idx === index,
      }));
      router.push(url);
    };

    onMounted(() => {
      state.navs = state.navs.map((item) => ({
        ...item,
        active: item.url === route.path,
      }));
    });

    return {
      ...toRefs(state),
      handleClickNav,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbars {
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
  line-height: 100%;
  margin: 0;
  margin-left: 30px;

  .nav {
    display: inline-flex;
    align-items: center;
    margin-right: 28px;
    color: #666;
    font-size: 14px;
    height: 100%;
    line-height: 100%;
    cursor: pointer;
    &:hover {
      color: #000;
      font-weight: bolder;
    }
  }
  .active {
    color: #000;
    font-weight: bolder;
  }
}
</style>
