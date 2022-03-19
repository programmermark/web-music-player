<template>
  <div class="filters">
    <!-- 语种 -->
    <div class="cat-wrapper">
      <div class="title">语种：</div>
      <div class="list">
        <div
          class="cat-item"
          v-for="(cat, index) in languageCat"
          :key="index"
          @click="changeLanguageCat(cat.value)"
        >
          <div class="text-wrapper">
            <div
              class="text"
              :class="[state.currentLanguageCat === cat.value && 'active']"
            >
              {{ cat.label }}
            </div>
          </div>
          <div class="border"></div>
        </div>
      </div>
    </div>
    <!-- 分类 -->
    <div class="cat-wrapper">
      <div class="title">分类：</div>
      <div class="list">
        <div
          class="cat-item"
          v-for="(cat, index) in typeCat"
          :key="index"
          @click="changeTypeCat(cat.value)"
        >
          <div class="text-wrapper">
            <div class="text" :class="[state.currentTypeCat === cat.value && 'active']">
              {{ cat.label }}
            </div>
          </div>
          <div class="border"></div>
        </div>
      </div>
    </div>
    <!-- 首字母筛选 -->
    <div class="cat-wrapper">
      <div class="title">筛选：</div>
      <div class="list">
        <div
          class="cat-item"
          v-for="(cat, index) in wordCat"
          :key="index"
          @click="changeWordCat(cat.value)"
        >
          <div class="text-wrapper">
            <div class="text" :class="[state.currentWordCat === cat.value && 'active']">
              {{ cat.label }}
            </div>
          </div>
          <div class="border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { IFiltersState } from "../interface/filters";

const emits = defineEmits<{
  (e: "change-cat", state: IFiltersState): void;
}>();

const languageCat = [
  { label: "全部", value: "-1" },
  { label: "华语", value: "7" },
  { label: "欧美", value: "96" },
  { label: "日本", value: "8" },
  { label: "韩国", value: "16" },
  { label: "其他", value: "0" },
];
const typeCat = [
  { label: "全部", value: "-1" },
  { label: "男歌手", value: "1" },
  { label: "女歌手", value: "2" },
  { label: "乐队组合", value: "3" },
];
const wordCat = [
  { label: "热门", value: "-1" },
  { label: "A", value: "a" },
  { label: "B", value: "b" },
  { label: "C", value: "c" },
  { label: "D", value: "d" },
  { label: "E", value: "e" },
  { label: "F", value: "f" },
  { label: "G", value: "g" },
  { label: "H", value: "h" },
  { label: "I", value: "i" },
  { label: "J", value: "j" },
  { label: "K", value: "k" },
  { label: "L", value: "l" },
  { label: "M", value: "m" },
  { label: "N", value: "n" },
  { label: "O", value: "o" },
  { label: "P", value: "p" },
  { label: "Q", value: "q" },
  { label: "R", value: "r" },
  { label: "S", value: "s" },
  { label: "T", value: "t" },
  { label: "U", value: "u" },
  { label: "V", value: "v" },
  { label: "W", value: "w" },
  { label: "X", value: "x" },
  { label: "Y", value: "y" },
  { label: "Z", value: "z" },
  { label: "#", value: "0" },
];

const state = reactive<IFiltersState>({
  currentLanguageCat: languageCat[0].value,
  currentTypeCat: typeCat[0].value,
  currentWordCat: wordCat[0].value,
});

const changeLanguageCat = (cat: string) => {
  state.currentLanguageCat = cat;
  emitCatChange();
};

const changeTypeCat = (cat: string) => {
  state.currentTypeCat = cat;
  emitCatChange();
};

const changeWordCat = (cat: string) => {
  state.currentWordCat = cat;
  emitCatChange();
};

const emitCatChange = () => {
  emits("change-cat", state);
};
</script>

<style lang="scss" scoped>
.filters {
  width: 100%;
  margin-top: 16px;
  font-size: 13px;
  .cat-wrapper {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    .title {
      height: 20px;
      line-height: 20px;
      margin-right: 14px;
    }
    .list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .cat-item {
        display: flex;
        align-items: center;
        width: 75px;
        text-align: center;
        color: #666666;
        margin-bottom: 10px;
        cursor: pointer;

        &:last-child {
          .border {
            display: none;
          }
        }

        .text-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          .text {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            padding: 0px 10px;
          }
          .active {
            color: #d33a31;
            background-color: #fdf6f5;
            border-radius: 10px;
          }
        }

        .border {
          width: 1px;
          height: 14px;
          background-color: #f2f2f2;
        }
      }
    }
  }
}
</style>
