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
          <i class="el-icon-arrow-right icon-reset"></i>
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
              <mp-opt-icon
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
                  <mp-opt-icon
                    v-if="subCat.hot"
                    class="icon-reset"
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

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import { http } from "@/common/js/http";
import { useStore } from "@/store";
import { apis } from "@/api";
import { ICatList, ICatListState, IStateCatList } from "../../interface/catList";
import { keysOf } from "@/common/js/util";
import MPOptIcon from "@/components/MPOptIcon.vue";

export default defineComponent({
  components: { "mp-opt-icon": MPOptIcon },
  name: "CatList",
  setup() {
    const store = useStore();

    const state = reactive<ICatListState>({
      allCat: "全部歌单",
      catList: [],
      subCatList: [],
    });
    const catIconList = ["tellurion", "style", "cafe", "emoji", "theme"];

    const currentCat = computed(() => store.state.catList.currentCat || "全部歌单");

    /** 获取歌单分类 */
    const fetchPlaylistCatList = async () => {
      const { all, categories, sub } = await http<ICatList>(
        { url: apis.playlistCatList },
        ""
      );
      state.allCat = all.name;
      const catList: IStateCatList[] = [];
      const categoryKeys = keysOf(categories);
      categoryKeys.forEach((key, index) => {
        catList.push({
          category: Number(key),
          name: categories[key],
          icon: catIconList[index],
        });
      });
      state.catList = catList;
      state.subCatList = sub.map((item) => ({
        category: item.category,
        hot: item.hot,
        name: item.name,
      }));
      /** 往module里设置默认的当前选中歌单分类 */
      if (!store.state.catList.currentCat) {
        store.commit("catList/setCurrentCat", all.name);
      }
    };

    const handleAllCat = () => {
      store.commit("catList/setCurrentCat", state.allCat);
    };

    const handleSubCat = (name: string) => {
      store.commit("catList/setCurrentCat", name);
    };

    onMounted(() => {
      fetchPlaylistCatList();
    });

    return {
      ...toRefs(state),
      currentCat,
      handleAllCat,
      handleSubCat,
    };
  },
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
    .icon-reset {
      color: #666;
      font-size: 16px;
    }
  }
}
</style>
