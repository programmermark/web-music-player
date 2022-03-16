<template>
  <div>
    <div
      class="inline-flex items-center"
      v-for="(category, index) in categoryList"
      :key="category.id"
    >
      <div
        class="text-xs text-gray-500 px-3 py-1 mx-[2px] cursor-pointer hover:text-gray-700"
        :class="{
          'bg-red-50 rounded-xl text-red-500 hover:text-red-500':
            currentCategory && currentCategory.id === category?.id,
        }"
        @click="handleCategoryClick(category)"
      >
        {{ category.name }}
      </div>
      <span
        v-if="categoryList && index + 1 < categoryList?.length"
        class="w-[1px] h-4 bg-gray-200"
      ></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useQuery } from "vue-query";
import { IVideoCategory } from "../../interface";

const props = defineProps<{
  category: IVideoCategory | null;
}>();

const { category: currentCategory } = toRefs(props);

const emits = defineEmits<{
  (e: "category-change", category: IVideoCategory): void;
}>();

const fetchVideoCategory = async () => {
  const { data } = await http<{ data: IVideoCategory[] }>(
    {
      url: apis.videoCategoryList,
    },
    ""
  );
  return data;
};

const { data: categoryList } = useQuery("video-category", fetchVideoCategory, {
  select: (data) => {
    return data.map((item) => {
      return {
        id: item.id,
        name: item.name,
      } as IVideoCategory;
    });
  },
  staleTime: 1000 * 60 * 60 * 24,
});

const handleCategoryClick = (category: IVideoCategory) => {
  if (currentCategory && currentCategory.value?.id !== category.id) {
    emits("category-change", category);
  }
};
</script>

<style lang="scss" scoped></style>
