<template>
  <div class="brief-info">
    <!-- <el-image
      class="image"
      :src="artist.picUrl"
      alt="歌手头像"
      @click="gotoArtistDetail(artist.id)"
    >
      <template #placeholder>
        <img
          class="image"
          src="@/assets/image/no-img.png"
          alt="歌手头像"
          @click="gotoArtistDetail(artist.id)"
        />
      </template>
    </el-image> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BriefInfo",

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.brief-info {
}
</style>
