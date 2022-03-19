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
            @dblclick="playSong(song.id)"
          >
            <div class="no">{{ formatNo(index + 1) }}</div>
            <div class="song-name text-ellipsis">{{ song.name }}</div>
            <div class="singer text-ellipsis">
              {{ formatArtist(song.artists) }}
            </div>
            <div class="album text-ellipsis">{{ song.album.name }}</div>
            <div class="duration">
              {{ transformSecondToMinute(Math.floor((song.duration || 0) / 1000)) }}
            </div>
          </div>
        </div>
      </div>
      <!-- 收藏者 -->
      <div class="album-detail" v-show="currentTab.value === tabs[1].value">
        <div class="title">专辑介绍</div>
        <div class="desc" v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import type { ITabOption } from "../../interface/songList";
import { formatNo, transformSecondToMinute } from "@/common/js/util";
import type { IArtist } from "../../../artist-detail/interface";
import type { ISong } from "@/stores/interface/latest-music";
import { usePlayerStore } from "@/stores/player";

const props = defineProps<{
  /** 专辑id */
  albumId: number;
  /** 歌曲列表 */
  songList: ISong[];
  /** 专辑描述 */
  description: string;
}>();

const playerStore = usePlayerStore();

const { songList } = toRefs(props);

const tabs: ITabOption[] = [
  { label: "歌曲列表", value: "songlist" },
  { label: "专辑详情", value: "albumDetail" },
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
const playSong = (songId: number) => {
  const songIds = songList.value.map((song) => song.id);
  playerStore.setSongListByIds({
    ids: songIds,
    currentId: songId,
  });
};
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

  .album-detail {
    padding-bottom: 20px;

    .title {
      margin-top: 20px;
      color: #333;
      font-size: 14px;
      font-weight: bold;
    }
    .desc {
      margin-top: 24px;
      color: #666;
      font-size: 13px;
      line-height: 2;
    }
  }
}
</style>
