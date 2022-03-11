<template>
  <div class="hot-cat-list">
    <div
      class="hot-cat-item"
      :class="[currentCat === cat.name && 'active']"
      v-for="cat in catList"
      :key="cat.id"
      @click="handleCatClick(cat.name)"
    >
      <span :class="[currentCat === cat.name && 'active']">{{ cat.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCatlistStore } from "@/stores/catlist";
import { computed, onMounted } from "vue";

const catListStore = useCatlistStore();

const currentCat = computed(() => catListStore.currentCat);
const catList = computed(() => catListStore.hotCatList);

/** 获取热门歌单分类 */
const fetchHotCatList = () => {
  catListStore.setHotCatList();
};

/** 切换当前选中的歌单分类 */
const handleCatClick = (name: string) => {
  catListStore.currentCat = name;
};

onMounted(() => {
  fetchHotCatList();
});
</script>

<style lang="scss" scoped>
.hot-cat-list {
  display: flex;
  align-items: center;
  .hot-cat-item {
    color: #666;
    font-size: 12px;
    padding: 0 4px;
    border-left: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
    cursor: pointer;

    &:first-child {
      border-left: none;
    }
    &:last-child {
      border-right: none;
      padding-right: 10px;
    }

    & > span {
      padding: 4px 12px;
      border-radius: 11px;
    }

    .active {
      color: #b82710;
      background-color: #fdf6f5;
    }
  }
}
</style>
