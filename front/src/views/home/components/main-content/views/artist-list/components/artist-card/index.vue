<template>
  <div class="artist-card">
    <el-image
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
    </el-image>
    <div class="name" @click="gotoArtistDetail(artist.id)">
      {{ artist.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IArtist } from "@/store/modules/interface/artistlist";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ArtistCard",
  props: {
    artist: {
      type: Object as PropType<IArtist>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    /** 跳转到歌手详情 */
    const gotoArtistDetail = (id: number) => {
      console.log("跳转到歌手详情，歌手id", id);
      // router.push();
    };
    return {
      gotoArtistDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.artist-card {
  display: inline-block;
  margin-bottom: 40px;
  margin-right: calc(20% - 168px);

  &:nth-child(6n) {
    margin-right: 0;
  }
  .image {
    width: 140px;
    height: 140px;
    box-sizing: border-box;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
    margin-bottom: 6px;
    cursor: pointer;
  }
  .name {
    font-size: 14px;
    color: #333;
    cursor: pointer;
  }
}
</style>
