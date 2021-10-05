<template>
  <ul class="navbars">
    <li
      v-for="(nav, index) in navs"
      :class="['nav', nav.active && 'active']"
      :key="index"
      @click="handleClickNav(nav.url, index)"
    >
      <span class="relative"
        >{{ nav.text }}
        <div
          v-show="showNotifyNewTag && nav.url === '/system-notify'"
          class="
            absolute
            right-[-28px]
            top-[-12px]
            text-xs
            font-semibold
            text-red-700
          "
        >
          NEW
        </div>
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { logs } from "@/bulletins/logs/2021-08";
import MPOptIcon from "@/components/MPOptIcon.vue";

/** 顶部导航条 */
export default defineComponent({
  name: "NavBar",
  components: {
    MPOptIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      navs: [
        { text: "个性推荐", url: "/", active: true },
        { text: "歌单", url: "/playlist", active: false },
        { text: "主播电台", url: "", active: false },
        { text: "排行榜", url: "/rankList", active: false },
        { text: "歌手", url: "/artistList", active: false },
        { text: "最新音乐", url: "/latestMusic", active: false },
        { text: "系统通知", url: "/system-notify", active: false },
      ],
    });

    /** 公告是否已通知过 */
    const hasNotified = computed(() => store.state.bulletin.hasNotified);

    /** store中的最新公告 */
    const currentBulletin = computed(
      () => store.state.bulletin.currentBulletin
    );

    /**
     * 是否展示导航条的new
     */
    const showNotifyNewTag = computed(() => {
      let isShow = false;
      const log = logs[0];
      /**
       * 更新条件：
       * 1. 未接收过通知；
       * 2. store中的最新通知不是最新的；
       */
      isShow =
        !hasNotified.value ||
        !currentBulletin.value ||
        (currentBulletin.value.briefContent !== log.briefContent &&
          currentBulletin.value.content !== log.content);

      return isShow;
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
      showNotifyNewTag,
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
