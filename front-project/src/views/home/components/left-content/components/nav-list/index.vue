<template>
  <div class="nav-list">
    <div
      v-for="nav in navList"
      :key="nav.name"
      class="nav-item"
      :class="{ active: currentPath === nav.url }"
      :title="nav.name"
      @click="gotoPage(nav.url)"
    >
      <MPIcon
        class="icon-reset"
        :icon="nav.icon"
        :size="18"
        :scale="1"
        :color="currentPath === nav.url ? '#d33a31' : '#444'"
        bg-color="none"
      ></MPIcon>
      <span class="text">{{ nav.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import MPIcon from "@/components/MPIcon.vue";

const router = useRouter();

const navList = [
  {
    name: "发现音乐",
    icon: "find-music",
    url: "/",
  },
  {
    name: "视频",
    icon: "mv",
    url: "/videolist",
  },
];

/** 当前路径 */
const currentPath = computed(() => {
  return router.currentRoute.value.path;
});

const gotoPage = (url: string) => {
  router.push(url);
};
</script>

<style lang="scss" scoped>
.nav-list {
  .nav-item {
    display: flex;
    align-items: center;
    padding: 9px 20px;
    cursor: pointer;
    .text {
      color: #444;
      font-size: 14px;
      margin-left: 8px;
    }
  }

  .active {
    background-color: #e0e0e0;
    .icon-reset {
      color: #d33a31;
    }
    .text {
      color: #d33a31;
    }
  }
}
</style>
