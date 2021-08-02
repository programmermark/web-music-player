<template>
  <div class="playlist-info">
    <!-- 歌单封面 -->
    <img class="cover-info" :src="playlistInfo.coverImgUrl" alt="歌单封面" />
    <!-- 歌单详情 -->
    <div class="info-detail">
      <div class="name-info">
        <span class="tag">歌单</span>
        <span class="name">{{ playlistInfo.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IPlaylistInfo } from "../../interface/playDetail";

export default defineComponent({
  name: "PlaylistInfo",
  props: {
    /** 歌单信息 */
    playlistInfo: {
      type: Object as PropType<IPlaylistInfo>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.playlist-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 40px 40px 30px;

  .cover-info {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    margin-right: 30px;
  }

  .info-detail {
    height: 200px;
    flex: 1;
    .name-info {
      display: flex;
      align-items: center;
      .tag {
        margin-right: 10px;
        padding: 2px 4px;
        color: #d33a31;
        border: 1px solid #d33a31;
        border-radius: 4px;
      }
      .name {
        font-size: 30px;
        font-weight: bold;
        color: #333333;
      }
    }
  }
}
</style>
