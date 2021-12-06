<template>
  <div class="artist-card">
    <el-image
      class="image"
      :src="`${imgUrl}?param=140y140`"
      alt="排行榜头像"
      @click="gotoArtistRankList"
    >
      <template #placeholder>
        <img
          class="no-image"
          src="@/assets/image/no-img.png"
          alt="排行榜头像"
          @click="gotoArtistRankList(typeValue)"
        />
      </template>
    </el-image>
    <div class="name" @click="gotoArtistRankList(typeValue)">
      歌手排行榜 <i class="el-icon-arrow-right icon-reset" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { ArtistAreaLabel } from "../interface/artist-rank-card";
import { gotoArtistRankList } from "@/common/js/router";

const props = defineProps<{
  imgUrl: string;
  /** 排行榜分类 */
  type?: ArtistAreaLabel;
}>();

const { type } = toRefs(props);

const typeValue = computed(() => {
  if (type === undefined) {
    return 0;
  } else if (type.value === "华语") {
    return 1;
  } else if (type.value === "欧美") {
    return 2;
  } else if (type.value === "韩国") {
    return 3;
  } else if (type.value === "日本") {
    return 4;
  }
  return 0;
});
</script>

<style lang="scss" scoped>
.artist-card {
  width: calc(16.6% - 13.3px);
  display: inline-block;
  margin-bottom: 40px;
  margin-right: 16px;

  &:nth-child(6n) {
    margin-right: 0;
  }
  .image {
    width: 100%;
    height: 100%;
    margin-bottom: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #ededed;
    border-radius: 4px;

    .no-image {
      width: 100%;
      height: 100%;
    }

    :deep(.el-image__inner) {
      border-radius: 4px;
    }
  }
  .name {
    font-size: 14px;
    color: #333;
    cursor: pointer;
  }
}
</style>
