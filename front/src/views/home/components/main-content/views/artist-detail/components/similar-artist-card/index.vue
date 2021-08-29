<template>
  <div
    class="similar-artist-card"
    title="点击查看歌手详情"
    @click="gotoArtistDetail(artist.id)"
  >
    <el-image
      class="image"
      :src="`${artist.img1v1Url}?param=400y400`"
      alt="歌手头像"
    >
      <template #placeholder>
        <img class="no-image" src="@/assets/image/no-img.png" alt="歌手头像" />
      </template>
    </el-image>
    <div class="name">{{ artist.name }}</div>
  </div>
</template>

<script lang="ts">
import { ISimilarArtist } from "@/store/modules/interface/artist-detail";
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SimilarArtistCard",
  props: {
    artist: {
      type: Object as PropType<ISimilarArtist>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const gotoArtistDetail = (id: number) => {
      router.push(`/artist/${id}`);
    };

    return {
      gotoArtistDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.similar-artist-card {
  width: calc(20% - 16px);
  margin-right: 20px;
  margin-bottom: 30px;

  .image {
    width: 100%;
    margin-right: 30px;
    border-radius: 8px;
    cursor: pointer;

    .no-image {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  .name {
    font-size: 14px;
    color: #333;
    margin-top: 8px;
    cursor: pointer;
  }
}

:nth-child(5n) {
  margin-right: 0px;
}

@media screen and (min-width: 1300px) {
  .similar-artist-card {
    width: calc(16.6% - 16.6px);
    &:nth-child(5n) {
      margin-right: 20px;
    }
    &:nth-child(6n) {
      margin-right: 0;
    }
  }
}
</style>
