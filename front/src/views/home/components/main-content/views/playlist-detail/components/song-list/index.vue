<template>
  <div class="song-list">
    <div class="tabs">
      <div
        class="tab"
        :class="[currentTab.value === tab.value && 'active']"
        v-for="tab in tabs"
        :key="tab.value"
        @click="changeTab(tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content">
      <!-- 歌曲列表 -->
      <div class="all-song-list" v-show="currentTab.value === tabs[0].value">
        <div class="list-title">
          <div class="title song-name">音乐标题</div>
          <div class="title singer">歌手</div>
          <div class="title album">专辑</div>
          <div class="title duration">时长</div>
        </div>
        <div class="list">
          <div
            class="list-item"
            v-for="(song, index) in songList"
            :key="song.id"
            @dblclick="playSong(song.id, playlistId)"
          >
            <div class="no">{{ formatNo(index + 1) }}</div>
            <div class="song-name text-ellipsis">{{ song.name }}</div>
            <div class="singer text-ellipsis">
              {{ formatArtist(song.ar) }}
            </div>
            <div class="album text-ellipsis">{{ song.al.name }}</div>
            <div class="duration">
              {{ transformSecondToMinute(Math.floor((song.dt || 0) / 1000)) }}
            </div>
          </div>
        </div>
      </div>
      <!-- 收藏者 -->
      <div
        class="subscriber-list-wrapper"
        v-show="currentTab.value === tabs[1].value"
      >
        <div
          class="subscriber"
          v-for="subscriber in subscribers"
          :key="subscriber.id"
        >
          <el-image class="image" :src="subscriber.avatarUrl" alt="用户头像">
            <template #placeholder>
              <img
                class="image"
                src="@/assets/image/no-img.png"
                alt="用户头像"
              />
            </template>
          </el-image>
          <span class="name">{{ subscriber.nickname }}</span>
          <mp-icon
            v-if="subscriber.gender === 1"
            icon="male"
            :size="16"
            :scale="0.6"
            color="#339cd0"
            bgColor="#caf3ff"
          />
          <mp-icon
            v-else-if="subscriber.gender === 2"
            icon="female"
            :size="16"
            :scale="0.6"
            color="#e33579"
            bgColor="#ffcde8"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  IArtist,
  IPlayListSubscriber,
  ISongDetail,
} from "@/store/modules/interface/player";
import { defineComponent, PropType, ref } from "vue";
import { ITabOption } from "../../interface/songList";
import { formatNo, transformSecondToMinute } from "@/common/js/util";
import { useStore } from "@/store";
import MPIcon from "@/components/MPIcon.vue";

export default defineComponent({
  components: { "mp-icon": MPIcon },
  name: "SongList",
  props: {
    /** 歌单id */
    playlistId: {
      type: Number,
      required: true,
    },
    /** 歌曲列表 */
    songList: {
      type: Array as PropType<ISongDetail[]>,
      required: true,
    },
    /** 歌曲订阅用户列表 */
    subscribers: {
      type: Array as PropType<IPlayListSubscriber[]>,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    const tabs: ITabOption[] = [
      { label: "歌曲列表", value: "songlist" },
      { label: "收藏者", value: "collectors" },
    ];
    const currentTab = ref<ITabOption>(tabs[0]);

    const changeTab = (value: string) => {
      const result = tabs.find((tab) => tab.value === value);
      if (result) {
        currentTab.value = result;
      }
    };

    /** 格式化歌手 */
    const formatArtist = (artists: IArtist[]) => {
      return artists
        .map((artist) => artist.name)
        .reduce((initValue, name) => `${initValue}/${name}`);
    };

    /** 播放当前歌曲 */
    const playSong = (songId: number, playlistId: number) => {
      store.dispatch("player/setSongList", {
        id: playlistId,
        noSetCurrentSong: true,
      });
      store.commit("player/setCurrentSongById", songId);
    };

    return {
      tabs,
      currentTab,
      changeTab,
      formatNo,
      formatArtist,
      transformSecondToMinute,
      playSong,
    };
  },
});
</script>

<style lang="scss" scoped>
.song-list {
  .tabs {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .tab {
      color: #333;
      font-size: 15px;
      margin-right: 20px;
      padding-bottom: 6px;
      cursor: pointer;
    }

    & .active {
      color: #d33a30;
      font-weight: bold;
      border-bottom: 2px solid #d13b31;
    }
  }

  .tab-content {
    .all-song-list {
      padding-bottom: 34px;
      .list-title {
        display: flex;
        align-items: center;
        height: 36px;
        .title {
          font-size: 13px;
          color: #888888;
        }
      }
      .song-name {
        margin-left: 84px;
        flex: 1;
      }
      .singer {
        width: 180px;
      }
      .album {
        width: 250px;
      }
      .duration {
        width: 50px;
      }
      .list {
        height: calc(100% - 403px);
        .list-item {
          display: flex;
          align-items: center;
          height: 34px;
          font-size: 13px;
          cursor: pointer;
          &:nth-child(2n + 1) {
            background-color: #fafafa;
          }
          &:hover {
            background-color: #f0f0f0;
          }
        }
        .no {
          width: 84px;
          color: #bbbbbb;
          padding-left: 16px;
          box-sizing: border-box;
        }
        .song-name {
          color: #666;
          margin-left: 0;
        }
        .singer,
        .album {
          color: #666;
        }
        .duration {
          color: #bbbbbb;
        }
      }
    }
  }

  .subscriber-list-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    padding-bottom: 20px;
    .subscriber {
      width: 50%;
      display: flex;
      align-items: center;
      margin-top: 20px;
      & > .image {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-right: 8px;
      }
      .name {
        color: #333;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
}
</style>
