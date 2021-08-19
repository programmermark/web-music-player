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
          class="image"
          src="@/assets/image/no-img.png"
          alt="排行榜头像"
          @click="gotoArtistRankList"
        />
      </template>
    </el-image>
    <div class="name" @click="gotoArtistRankList">
      歌手排行榜 <i class="el-icon-arrow-right icon-reset" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ArtistAreaLabel } from "../interface/artist-rank-card";

export default defineComponent({
  name: "ArtistCard",
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    /** 排行榜分类 */
    type: {
      type: String as PropType<ArtistAreaLabel | undefined>,
      default: undefined,
    },
  },
  setup(props) {
    const router = useRouter();

    const { type } = toRefs(props);

    const typeValue = computed(() => {
      if (type.value === "华语") {
        return 1;
      } else if (type.value === "欧美") {
        return 2;
      } else if (type.value === "日本") {
        return 3;
      } else if (type.value === "韩国") {
        return 4;
      }
      return 0;
    });

    /** 跳转到歌手详情 */
    const gotoArtistRankList = () => {
      let url = "/artistRankList";
      if (typeValue.value) {
        url = "/artistRankList?type=" + typeValue.value;
      }
      console.log("跳转到歌手排行榜, url", url);
      // router.push();
    };
    return {
      gotoArtistRankList,
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
