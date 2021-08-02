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
      <div class="creator-info">
        <img
          class="avatar"
          :src="playlistInfo.creator.avatarUrl"
          alt="歌单创建者头像"
        />
        <span
          class="name"
          @click="gotoCreatorPage(playlistInfo.creator.userId)"
          >{{ playlistInfo.creator.nickname }}</span
        >
        <span class="create-time"
          >{{ formatTime(playlistInfo.createTime, "yyyy-MM-dd") }}创建</span
        >
      </div>
      <div class="operates">
        <div class="playlist-btn" @click="handlePlaylist(playlistInfo.id)">
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
      <div class="tags">
        <span class="title"><span>标</span>签：</span>
        <template v-if="tagsInfo && tagsInfo.length > 0">
          <div class="tag" v-for="(info, index) in tagsInfo" :key="index">
            <span class="tag-name" @click="gotoPlaylistPage(info.tag)">{{
              info.tag
            }}</span>
            <span class="parting-line" v-if="info.hasPartingLine">/</span>
          </div>
        </template>
        <div v-else>暂无标签</div>
      </div>
      <div class="counts-wrapper">
        <div class="count-item">
          <div class="title">歌曲数：</div>
          <div class="count">{{ playlistInfo.trackCount }}</div>
        </div>
        <div class="count-item">
          <div class="title">播放数：</div>
          <div class="count">{{ playlistInfo.playCount }}</div>
        </div>
      </div>
      <div class="intro">
        <span class="title"><span>简</span>介：</span>
        <div class="content-wrapper">
          <div class="content">
            {{ playlistInfo.description || "暂无简介" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { IPlaylistInfo } from "../../interface/playDetail";
import { formatTime } from "@/common/js/util/index";
import MPIcon from "@/components/MPIcon.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: { "mp-icon": MPIcon },
  name: "PlaylistInfo",
  props: {
    /** 歌单信息 */
    playlistInfo: {
      type: Object as PropType<IPlaylistInfo>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { playlistInfo } = toRefs(props);
    const tagsInfo = computed(() => {
      const tags = playlistInfo.value.tags;
      return tags.map((tag, index) => ({
        tag: tag,
        hasPartingLine: index !== tags.length - 1,
      }));
    });

    const gotoCreatorPage = (userId: number) => {
      console.log("歌单创建者id：" + userId);
    };

    const handlePlaylist = (id: number) => {
      console.log("歌单id：" + id);
      store.dispatch("player/setSongList", { id });
    };

    const gotoPlaylistPage = (tagName: string) => {
      console.log("歌单标签名：", tagName);
    };

    return {
      tagsInfo,
      gotoCreatorPage,
      formatTime,
      handlePlaylist,
      gotoPlaylistPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.playlist-info {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px 0px 40px 0px;

  .cover-info {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    margin-right: 30px;
  }

  .info-detail {
    min-height: 200px;
    flex: 1;
    .name-info {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .tag {
        margin-right: 10px;
        padding: 2px 4px;
        color: #d33a31;
        border: 1px solid #d33a31;
        border-radius: 4px;
      }
      .name {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
      }
    }
    .creator-info {
      display: flex;
      align-items: center;
      font-size: 13px;
      margin-bottom: 20px;

      .avatar {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
      .name {
        color: #507daf;
        margin-right: 10px;
        cursor: pointer;
      }
      .create-time {
        color: #666;
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

    .tags {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-size: #333;
      margin-bottom: 10px;
      .title {
        & > span {
          letter-spacing: 1em;
        }
      }
      .tag {
        display: flex;
        align-items: center;
        .tag-name {
          color: #507daf;
          cursor: pointer;
        }
        .parting-line {
          padding: 0 3px;
        }
      }
    }

    .counts-wrapper {
      display: flex;
      align-items: center;
      .count-item {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-bottom: 10px;
        margin-right: 12px;
        .title {
          color: #333333;
        }
        .count {
          color: #666666;
        }
      }
    }

    .intro {
      display: flex;
      align-items: flex-start;
      font-size: 12px;
      color: #333;
      margin-bottom: 10px;
      line-height: 1.5;
      .title {
        & > span {
          letter-spacing: 1em;
        }
      }
      .content-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        .content {
          flex: 1;
        }
      }
    }
  }
}
</style>
