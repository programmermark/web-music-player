<template>
  <div class="artist-card">
    <el-image
      class="image"
      :src="imageUrl"
      alt="歌手头像"
      @click="gotoArtistDetail(artist.id)"
    >
      <template #placeholder>
        <img
          class="no-image"
          src="@/assets/image/no-img.png"
          alt="歌手头像"
          @click="gotoArtistDetail(artist.id)"
        />
      </template>
    </el-image>
    <div class="name" @click="gotoArtistDetail(artist.id)">
      {{ artist.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { gotoArtistDetail } from "@/common/js/router";
import { IArtist } from "../../../artist-detail/interface";

const props = defineProps<{
  artist: IArtist;
}>();

const imageUrl = computed(() => props.artist.cover + "?param=140y140");
</script>

<style lang="scss" scoped>
.artist-card {
  width: calc(16.6% - 13.3px);
  min-width: 100px;
  min-height: 100px;
  display: inline-block;
  margin-bottom: 40px;
  margin-right: 16px;

  &:nth-child(6n) {
    margin-right: 0;
  }
  .image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #ededed;
    border-radius: 4px;
    margin-bottom: 6px;
    cursor: pointer;

    .no-image {
      width: 100%;
      height: 100%;
      border-radius: 4px;
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

@media screen and (max-width: 1064px) {
  .artist-card {
    width: calc(20% - 12.8px);
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
