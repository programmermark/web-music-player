<template>
  <div class="mb-3 flex">
    <div
      class="w-36 h-20 rounded mr-2 relative cursor-pointer"
      @click="gotoMVDetail(mv.id)"
    >
      <img
        class="w-full h-full rounded"
        :src="`${mv.cover}?param=280y160`"
        alt="mv封面"
      />
      <div class="absolute top-1 right-1 flex items-center font-bold">
        <MPIcon icon="play-caret" color="#fff" bgColor="none" />
        <span class="text-white text-xs">{{
          translatePlayCount(mv.playCount)
        }}</span>
      </div>
      <div class="absolute bottom-1 right-1 text-xs font-semibold text-white">
        {{ transformSecondToMinute(mv.duration / 1000) }}
      </div>
    </div>
    <div class="flex-1">
      <div
        class="h-10 text-sm mt-2 leading-5 text-gray-700 cursor-pointer"
        @click="gotoMVDetail(mv.id)"
      >
        {{ mv.name }}
      </div>
      <div
        class="text-sm mt-1 text-gray-400 cursor-pointer"
        @click="gotoArtistDetail(mv.artistId)"
      >
        {{ mv.artistName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISimilarMV } from "../../interface";
import { translatePlayCount, transformSecondToMinute } from "@/common/js/util";
import MPIcon from "@/components/MPIcon.vue";
import { useRouter } from "vue-router";

defineProps<{
  mv: ISimilarMV;
}>();

const router = useRouter();

/** 前往歌手详情页面 */
const gotoArtistDetail = (id: number) => router.push(`/artist/${id}`);

/** 前往MV详情页面 */
const gotoMVDetail = (id: number) => router.push(`/mv/${id}`);
</script>

<style lang="scss" scoped></style>
