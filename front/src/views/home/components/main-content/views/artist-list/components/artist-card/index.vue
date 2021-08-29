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
import { computed, defineComponent, PropType, toRefs } from "vue";
import { useRouter } from "vue-router";
import { IArtist } from "../../../artist-detail/interface";

export default defineComponent({
  name: "ArtistCard",
  props: {
    artist: {
      type: Object as PropType<IArtist>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const { artist } = toRefs(props);

    const imageUrl = computed(() => artist.value.cover + "?param=140y140");

    /** 跳转到歌手详情 */
    const gotoArtistDetail = (id: number) => {
      console.log("跳转到歌手详情，歌手id", id);
      router.push(`/artist/${id}`);
    };
    return {
      imageUrl,
      gotoArtistDetail,
    };
  },
});
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

@media screen and (max-width: 1064px) {
  .artist-card {
    width: calc(20% - 12.8px);
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
