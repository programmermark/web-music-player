<template>
  <div class="inline-flex">
    <el-popover
      popper-class="cat-list"
      placement="bottom-start"
      width="720px"
      trigger="click"
    >
      <template #reference>
        <div
          class="flex items-center border border-gray-300 rounded-2xl py-1 px-4 cursor-pointer"
        >
          <span class="text-[13px] text-gray-700">{{ currentCategory.name }}</span>
          <el-icon>
            <arrow-right />
          </el-icon>
        </div>
      </template>
      <el-scrollbar>
        <div class="bg-white">
          <div class="pb-3 mt-2 border-b border-gray-200">
            <span
              class="text-sm text-gray-700 mx-5 px-3 py-2 cursor-pointer"
              :class="{
                'bg-red-50 rounded-2xl text-red-500 hover:text-red-500':
                  currentCategory.id === 0,
              }"
              @click="
                handleCategoryClick({
                  id: 0,
                  name: '全部视频',
                })
              "
              >全部视频</span
            >
          </div>
          <div class="mx-5 py-2">
            <div
              class="inline-block w-1/6"
              v-for="category in categoryList"
              :key="category.id"
              @click="handleCategoryClick(category)"
            >
              <div
                class="inline-block px-3 py-1 my-2 text-[13px] text-gray-700 cursor-pointer"
                :class="{
                  'bg-red-50 rounded-xl text-red-500 hover:text-red-500':
                    currentCategory.id === category.id,
                }"
              >
                {{ category.name }}
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useQuery } from "vue-query";
import type { IVideoCategory } from "../../interface";

const props = defineProps<{
  category: IVideoCategory | null;
}>();

const emits = defineEmits<{
  (e: "category-change", category?: IVideoCategory): void;
}>();

const { category } = toRefs(props);

const currentCategory = computed(() => {
  return (
    category.value || {
      id: 0,
      name: "全部视频",
    }
  );
});

const fetchVideoCategory = async () => {
  const { data } = await http<{ data: IVideoCategory[] }>(
    { url: apis.videoGroupList },
    ""
  );
  return data;
};

const { data: categoryList } = useQuery("video-group", fetchVideoCategory);

const handleCategoryClick = (category: IVideoCategory) => {
  if (category.id !== currentCategory.value.id) {
    if (category.id === 0) {
      emits("category-change");
    } else {
      console.log("trigger");
      emits("category-change", category);
    }
  }
};
</script>

<style lang="scss" scoped></style>
