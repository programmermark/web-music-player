<template>
  <div class="album-info">
    <!-- 歌单封面 -->
    <el-image class="image" :src="`${albumInfo.picUrl}?param=400y400`" alt="歌手头像">
      <template #placeholder>
        <img class="no-image" src="@/assets/image/no-img.png" alt="歌单封面" />
      </template>
    </el-image>
    <!-- 歌单详情 -->
    <div class="info-detail">
      <div class="name-info">
        <span class="tag">专辑</span>
        <span class="name">{{ albumInfo.name }}</span>
      </div>
      <div class="operates">
        <div class="playlist-btn" @click="handlePlaylist(albumInfo.id)">
          <mp-icon
            class="icon"
            icon="play-button-solid"
            :size="20"
            :scale="1"
            color="#fff"
            bgColor="none"
          />
          <span class="text">播放全部</span>
        </div>
      </div>
      <div class="artist-list" v-if="albumInfo.artists">
        歌手：
        <div
          class="artist-item"
          v-for="(artist, index) in albumInfo.artists"
          :key="artist.id"
        >
          <router-link class="link-reset" to="/">{{ artist.name }}</router-link>
          <span class="parting-line" v-if="index + 1 !== albumInfo.artists.length"
            >/</span
          >
        </div>
      </div>
      <div class="create-time">
        时间：
        <span class="time">{{ formatTime(albumInfo.publishTime, "yyyy-MM-dd") }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { formatTime } from "@/common/js/util/index";
import MPIcon from "@/components/MPIcon.vue";
import { useStore } from "@/store";
import { IAlbum } from "../../../artist-detail/interface";
import { ISong } from "@/store/modules/interface/latest-music";

export default defineComponent({
  components: { "mp-icon": MPIcon },
  name: "AlbumInfo",
  props: {
    /** 专辑信息 */
    albumInfo: {
      type: Object as PropType<IAlbum>,
      required: true,
    },
    /** 歌曲列表 */
    songList: {
      type: Array as PropType<ISong[]>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { songList } = toRefs(props);

    const handlePlaylist = (id: number) => {
      console.log("歌单id：" + id);
      const songIds = songList.value.map((song) => song.id);
      store.dispatch("player/setSongListByIds", {
        ids: songIds,
        currentId: songIds[0],
      });
    };

    return {
      formatTime,
      handlePlaylist,
    };
  },
});
</script>

<style lang="scss" scoped>
.album-info {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px 0px 40px 0px;

  .image {
    width: 200px;
    height: 200px;
    margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #ededed;
    border-radius: 4px;

    .no-image {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    :deep(.el-image__inner) {
      border-radius: 4px;
    }
  }

  .info-detail {
    min-height: 200px;
    flex: 1;
    .name-info {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      margin-top: 4px;
      .tag {
        font-size: 14px;
        margin-right: 10px;
        padding: 3px 3px;
        color: #d33a31;
        border: 1px solid #d33a31;
        border-radius: 4px;
      }
      .name {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
      }
    }

    .operates {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .playlist-btn {
        display: flex;
        align-items: center;
        height: 30px;
        border-radius: 15px;
        cursor: pointer;
        background-image: linear-gradient(90deg, #fc5145, #d53a31);
        &:hover {
          background-color: #a93529;
        }

        .icon {
          margin: 0 4px 0 14px;
        }
        .text {
          color: #fff;
          font-size: 14px;
          margin-right: 16px;
        }
      }
    }

    .artist-list {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 10px;
      color: #333;
      .artist-item {
        .link-reset {
          color: #4d7eb5;
          text-decoration: none;
        }
        .parting-line {
          color: #666666;
          font-size: 13px;
          padding: 0 4px;
        }
      }
    }

    .create-time {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #333;
      .time {
        color: #666;
      }
    }
  }
}
</style>
