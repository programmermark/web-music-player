<template>
  <div class="album-card">
    <div class="image-wrapper">
      <el-image
        class="image"
        :src="imageUrl"
        alt="专辑封面"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @click="gotoAlbumDetail(album.id)"
      >
        <template #placeholder>
          <img
            class="image"
            src="@/assets/image/no-img.png"
            alt="专辑封面"
            @click="gotoAlbumDetail(album.id)"
          />
        </template>
      </el-image>
      <mp-opt-icon
        v-show="showIcon"
        class="play-button"
        title="点击播放歌曲"
        :size="40"
        icon="play-caret-solid"
        color="#d33a33"
        bgColor="#dddddd"
        display="always"
        @click="playAlbum"
      />
    </div>
    <div class="name text-ellipsis-2" @click="gotoAlbumDetail(album.id)">
      {{ album.name }}
    </div>
    <div class="artist text-ellipsis">
      <div
        class="artist-item"
        v-for="(artist, index) in album.artists"
        :key="artist.id"
      >
        <router-link class="link-reset" to="/">{{ artist.name }}</router-link>
        <span class="parting-line" v-if="index + 1 !== album.artists.length"
          >/</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from "vue";
import MpOpeIcon from "@/components/MPOptIcon.vue";
import { formatMonth } from "@/common/js/util";
import { IAlbum } from "../../../artist-detail/interface";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AlbumCard",
  components: {
    "mp-opt-icon": MpOpeIcon,
  },
  props: {
    /** 专辑对象 */
    album: {
      type: Object as PropType<IAlbum>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const { album } = toRefs(props);

    const showIcon = ref(false);

    const imageUrl = computed(() => album.value.picUrl + `?param=140y140`);

    const handleMouseEnter = () => {
      showIcon.value = true;
    };
    const handleMouseLeave = () => {
      showIcon.value = false;
    };

    /** 播放歌曲 */
    const playAlbum = (id: number) => {
      console.log("播放专辑歌曲，专辑id：", id);
    };

    /** 前往专辑详情 */
    const gotoAlbumDetail = (id: number) => {
      console.log("专辑id", id);
      router.push(`/albumDetail/${id}`);
    };

    /** 前往歌手详情 */
    const gotoArtistDetail = (id: number) => {
      console.log("歌手id", id);
    };

    return {
      showIcon,
      imageUrl,
      formatMonth,
      handleMouseEnter,
      handleMouseLeave,
      playAlbum,
      gotoAlbumDetail,
      gotoArtistDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.album-card {
  width: 140px;
  margin-right: calc(25% - 175px);
  box-sizing: border-box;
  margin-bottom: 36px;
  &:nth-child(5n) {
    margin-right: 0;
  }
  .image-wrapper {
    position: relative;

    .image {
      width: 140px;
      height: 140px;
      border-radius: 8px;
      border: 1px solid #efefef;
      box-sizing: border-box;
      cursor: pointer;
    }
    .play-button {
      position: absolute;
      top: calc(50% - 20px);
      left: calc(50% - 20px);
    }
  }

  .name {
    color: #333;
    font-size: 14px;
    line-height: 1.6;
    margin-top: 10px;
    cursor: pointer;
  }
  .artist {
    display: flex;
    align-items: center;
    color: #aaa;
    font-size: 13px;
    margin-top: 4px;
    cursor: pointer;
    .artist-item {
      .link-reset {
        color: #aaa;
        text-decoration: none;
      }
      .parting-line {
        color: #666666;
        font-size: 13px;
        padding: 0 4px;
      }
    }
  }
}
</style>
