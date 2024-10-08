<template>
  <div class="cat-list-wrapper">
    <el-popover
      popper-class="cat-list"
      placement="bottom-start"
      width="750px"
      trigger="click"
    >
      <template #reference>
        <div class="current-cat-list">
          <span class="text">{{ currentCat }}</span>
          <el-icon class="text-base text-[#666666]">
            <arrow-right />
          </el-icon>
        </div>
      </template>
      <el-scrollbar>
        <div class="all-cat-list-wrapper">
          <div
            class="all-cat-list"
            :class="[currentCat === allCat && 'active']"
            @click="handleAllCat"
          >
            {{ allCat }}
          </div>
        </div>
        <div class="cat-list-wrapper">
          <div class="cat-item-wrapper" v-for="cat in catList" :key="cat.category">
            <div class="cat-item">
              <MPOptIcon
                :icon="cat.icon"
                :size="22"
                scale="1"
                bgColor="none"
                color="#999"
                display="always"
              />
              <span class="text">{{ cat.name }}</span>
            </div>
            <div class="sub-cat-item-wrapper">
              <div
                class="sub-cat-item"
                v-for="subCat in subCatList.filter(
                  (item) => item.category === cat.category
                )"
                :key="subCat.name"
              >
                <span
                  class="text-content"
                  :class="[currentCat === subCat.name && 'active']"
                  @click="handleSubCat(subCat.name)"
                >
                  {{ subCat.name }}
                  <MPOptIcon
                    v-if="subCat.hot"
                    class="text-base text-[#666666]"
                    icon="hot-text"
                    scale="0.6"
                    color="#dd625a"
                    bgColor="none"
                    :size="12"
                    display="always"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { http } from "@/common/js/http";
import { apis } from "@/api";
import type { ICatList, IStateCatList, ISubCategory } from "../../interface/catList";
import { keysOf } from "@/common/js/util";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { useCatlistStore } from "@/stores/catlist";

const catListStore = useCatlistStore();

const allCat = ref("全部歌单");
const catList = ref<IStateCatList[]>([]);
const subCatList = ref<ISubCategory[]>([]);

const catIconList = ["tellurion", "style", "cafe", "emoji", "theme"];

const currentCat = computed(() => catListStore.currentCat || "全部歌单");

/** 获取歌单分类 */
const fetchPlaylistCatList = async () => {
  const { all, categories, sub } = await http<ICatList>(
    { url: apis.playlistCatList },
    ""
  );
  allCat.value = all.name;
  const categoryList: IStateCatList[] = [];
  const categoryKeys = keysOf(categories);
  categoryKeys.forEach((key, index) => {
    categoryList.push({
      category: Number(key),
      name: categories[key],
      icon: catIconList[index],
    });
  });
  catList.value = categoryList;
  subCatList.value = sub.map((item) => ({
    category: item.category,
    hot: item.hot,
    name: item.name,
  }));
  /** 往module里设置默认的当前选中歌单分类 */
  if (!catListStore.currentCat) {
    catListStore.currentCat = all.name;
  }
};

const handleAllCat = () => {
  catListStore.currentCat = allCat.value;
};

const handleSubCat = (name: string) => {
  catListStore.currentCat = name;
};

onMounted(() => {
  fetchPlaylistCatList();
});
</script>

<style lang="scss" scoped>
.cat-list-wrapper {
  .current-cat-list {
    display: inline-flex;
    align-items: center;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 14px;
    cursor: pointer;

    .text {
      color: #333;
    }
  }
}
</style>
