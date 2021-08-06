<template>
  <div class="cat-list-wrapper">
    <el-popover placement="bottom" trigger="click">
      <template #reference>
        <div class="all-cat-list">
          <span class="text">全部歌单</span>
          <i class="el-icon-arrow-right icon-reset"></i>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { http } from "@/common/js/http";
import { apis } from "@/api";
import {
  ICatList,
  ICatListState,
  IStateCatList,
} from "../../interface/catList";
import { keysOf } from "@/common/js/util";

export default defineComponent({
  name: "CatList",
  setup() {
    const state = reactive<ICatListState>({
      currentCat: {
        level: 0,
        name: "全部分类",
      },
      allCat: "全部分类",
      catList: [],
      subCatList: [],
    });

    /** 获取歌单分类 */
    const fetchPlaylistCarList = async () => {
      const { all, categories, sub } = await http<ICatList>(
        { url: apis.playlistCatList },
        ""
      );
      state.allCat = all.name;
      const catList: IStateCatList[] = [];
      const categoryKeys = keysOf(categories);
      categoryKeys.forEach((key) => {
        catList.push({ category: key, name: categories[key] });
      });
      state.catList = catList;
      state.subCatList = sub;
    };

    onMounted(() => {
      fetchPlaylistCarList();
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.cat-list-wrapper {
  .all-cat-list {
    display: inline-flex;
    align-items: center;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 14px;
    cursor: pointer;

    .text {
      color: #333;
      margin-right: 6px;
    }
    .icon-reset {
      color: #666;
      font-size: 18px;
    }
  }
}
</style>
