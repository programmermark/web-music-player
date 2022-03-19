<template>
  <div class="artist-desc">
    <div class="desc" v-for="(desc, index) in descList" :key="index">
      <div class="title">{{ desc.ti }}</div>
      <div class="desc-content" v-html="transformTxt(desc.txt)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IArtistDescIntroduction } from "@/stores/interface/artist-detail";

defineProps<{
  descList: IArtistDescIntroduction[];
}>();

const transformTxt = (txt: string) => {
  return txt.replaceAll("\n", "<div style='margin-bottom: 30px'></div>");
};
</script>

<style lang="scss" scoped>
.artist-desc {
  padding-bottom: 40px;
  .desc {
    margin-top: 20px;

    .title {
      color: #333;
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .desc-content {
      font-size: 13px;
      color: #999;
      line-height: 2;
    }
  }
}
</style>
