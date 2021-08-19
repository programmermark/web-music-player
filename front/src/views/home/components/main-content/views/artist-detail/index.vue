<template>
  <div class="artist-detail pdl-30 pdr-30">
    <!-- 歌手头像 + 名字 -->
    <div class="brief-info"></div>
    <!-- 专辑 + MV + 详情 + 相似歌手 -->
  </div>
</template>

<script lang="ts">
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { defineComponent, onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { IArtistBriefInfo, IArtistDetailState } from "./interface/index";

export default defineComponent({
  name: "ArtistDetail",
  setup() {
    const route = useRoute();

    const state = reactive<IArtistDetailState>({
      briefInfo: undefined,
    });

    /** 获取歌手详情 */
    const getArtistDetail = async (id: number) => {
      const { artist } = await http<IArtistBriefInfo>(
        { url: `${apis.artistDetail}?id=${id}` },
        "data"
      );
      // state.briefInfo = {
      //   id: artist.id,
      //   cover: artist.cover,
      //   name: artist.name,
      //   musicSize: artist.musicSize,
      //   mvSize: artist.mvSize,
      //   videoCount: artist.videoCount,
      // };
    };

    /** 获取歌手详情 + 歌手专辑 */
    const getAlbumDetail = async (
      id: number,
      offset: number,
      limit: number
    ) => {
      const { artist } = await http<IArtistBriefInfo>({
        url: `${apis.artistAlbum}?id=${id}&limit=${limit}&offset=${offset}`,
      });
      // state.briefInfo = {
      //   id: artist.id,
      //   cover: artist.cover,
      //   name: artist.name,
      //   musicSize: artist.musicSize,
      //   mvSize: artist.mvSize,
      //   videoCount: artist.videoCount,
      // };
    };

    watch(
      () => route.params,
      (params) => {
        if (params.id) {
          // getArtistDetail(Number(params.id));
        }
      }
    );

    onMounted(() => {
      if (route.params) {
        getArtistDetail(Number(route.params.id));
      }
    });

    return {};
  },
});
</script>

<style scoped></style>
