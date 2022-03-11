<template>
  <div class="latest-songs">
    <div class="header pl-[30px] pr-[30px]">
      <div class="tab-wrapper">
        <div
          class="tab-item"
          :class="[tabsState.currentTab === tab.value && 'active']"
          v-for="tab in tabsState.tabs"
          :key="tab.value"
          @click="toggleTab(tab.value)"
        >
          {{ tab.label }}
        </div>
      </div>
      <div class="flex-wrapper">
        <div class="operate-wrapper">
          <div class="operate-item" @click="playAllSong">
            <MPOptIcon
              icon="play-button-solid"
              color="#fff"
              :size="14"
              scale="1"
              bgColor="none"
              display="always"
            />
            <span class="text">播放全部</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="song-list" v-infinite-scroll="onPageChange">
        <div
          class="song-item"
          v-for="(song, index) in currentSongs"
          :key="song.id"
        >
          <span class="no" v-show="tabsState.currentSongId !== song.id">{{
            formatNo(index + 1)
          }}</span>
          <MPOptIcon
            v-show="tabsState.currentSongId === song.id"
            class="icon-reset"
            icon="horn-playing-solid"
            color="#d33a31"
            :size="14"
            scale="1"
            bgColor="none"
            display="always"
          />
          <div class="image-wrapper" @click="playSong(song.id)">
            <el-image
              class="image"
              :src="`${song.album.picUrl}?param=100y100`"
              alt="歌曲专辑封面"
              lazy
            >
              <template #placeholder>
                <img
                  class="no-image"
                  src="@/assets/image/no-img.png"
                  alt="歌曲专辑封面"
                />
              </template>
            </el-image>
            <MPOptIcon
              class="play-button"
              title="点击播放歌曲"
              :size="24"
              icon="play-caret-solid"
              color="#d33a33"
              bgColor="#dddddd"
              display="always"
              @click="playSong(song.id)"
            />
          </div>
          <div
            class="song-name text-ellipsis"
            @dblclick="playSong(song.id)"
            title="双击播放歌曲"
          >
            {{ song.name
            }}{{ song.alias && song.alias[0] ? `(${song.alias[0]})` : "" }}
          </div>
          <div
            class="artist text-ellipsis"
            :title="formatArtistListToString(song.artists)"
          >
            <span v-for="(artist, index) in song.artists" :key="artist.id">
              <span
                class="cursor-pointer"
                @click="gotoArtistDetail(artist.id)"
                >{{ artist.name }}</span
              >
              <span v-if="index + 1 < song.artists.length" class="px-1">/</span>
            </span>
          </div>
          <div
            class="album text-ellipsis"
            @click="gotoAlbumDetail(song.album.id)"
          >
            {{ song.album.name }}
          </div>
          <div class="duration">
            {{
              transformSecondToMinute(Math.floor((song.duration || 0) / 1000))
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, toRefs, watch } from "vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import type {
  ICurrentSongsState,
  ITabsState,
} from "../../interface/latest-songs";
import { formatNo } from "@/common/js/util";
import {
  formatArtistListToString,
  transformSecondToMinute,
} from "@/common/js/util";
import type { ISong } from "@/stores/interface/latest-music";
import { gotoAlbumDetail, gotoArtistDetail } from "@/common/js/router";
import { useLatestMusicStore } from "@/stores/latest-music";
import { usePlayerStore } from "@/stores/player";

const latestMusicStore = useLatestMusicStore();
const playerStore = usePlayerStore();

const tabsState = reactive<ITabsState>({
  currentTab: 0,
  tabs: [
    { label: "全部", value: 0 },
    { label: "华语", value: 7 },
    { label: "欧美", value: 96 },
    { label: "日本", value: 8 },
    { label: "韩国", value: 12 },
  ],
  currentSongId: undefined,
});

/** 当前歌曲分页参数 */
const currentSongsState = reactive<ICurrentSongsState>({
  limit: 10,
  offset: 0,
});

/** 新歌速递(全部) */
const allSongs = computed(() => latestMusicStore.allSongs);
/** 新歌速递(华语) */
const chineseSongs = computed(() => latestMusicStore.chineseSongs);
/** 新歌速递(欧美) */
const europeAndAmericaSongs = computed(
  () => latestMusicStore.europeAndAmericaSongs
);
/** 新歌速递(韩国) */
const koreaSongs = computed(() => latestMusicStore.koreaSongs);
/** 新歌速递(日本) */
const japaneseSongs = computed(() => latestMusicStore.japaneseSongs);

/** 当前歌曲(没有被分页筛选过的所有歌曲) */
const allCurrentSongs = computed(() => {
  const { currentTab, tabs } = toRefs(tabsState);
  let songList: ISong[] = [];
  if (currentTab.value === tabs.value[0].value) {
    songList = allSongs.value;
  } else if (currentTab.value === tabs.value[1].value) {
    songList = chineseSongs.value;
  } else if (currentTab.value === tabs.value[2].value) {
    songList = europeAndAmericaSongs.value;
  } else if (currentTab.value === tabs.value[3].value) {
    songList = koreaSongs.value;
  } else if (currentTab.value === tabs.value[4].value) {
    songList = japaneseSongs.value;
  }
  return songList;
});

/** 当前歌曲（所有）的条数 */
const allCurrentSongsLength = computed(() => allCurrentSongs.value.length);

/** 当前歌曲 */
const currentSongs = computed(() =>
  allCurrentSongs.value.filter(
    (item, index) => index < currentSongsState.limit + currentSongsState.offset
  )
);

/** 当前歌曲id */
const currentSongIds = computed(() =>
  currentSongs.value.map((item) => item.id)
);

/**
 * 向下滚动时加载数据
 */
const onPageChange = () => {
  if (currentSongsState.offset < allCurrentSongsLength.value) {
    currentSongsState.offset += currentSongsState.limit;
  }
};

/** 切换歌曲tab */
const toggleTab = (value: number) => {
  tabsState.currentTab = value;
};

/** 播放全部 */
const playAllSong = () => {
  playerStore.setSongListByIds({
    ids: currentSongIds.value,
  });
};

/** 播放当前歌曲 */
const playSong = (id: number) => {
  tabsState.currentSongId = id;
  playerStore.setSongListByIds({
    ids: currentSongIds.value,
    currentId: id,
  });
};

/** 获取歌曲 */
const fetchSongs = (tabValue: string | number) => {
  latestMusicStore.setSongsByType(Number(tabValue));
};

watch(
  () => tabsState.currentTab,
  (tabValue) => {
    /** 如果当前tab的歌曲列表有数据则不再请求，使用缓存的数据（最新歌曲数据短时间不会变化） */
    if (tabValue === tabsState.tabs[0].value && allSongs.value.length > 0) {
      return;
    } else if (
      tabValue === tabsState.tabs[1].value &&
      chineseSongs.value.length > 0
    ) {
      return;
    } else if (
      tabValue === tabsState.tabs[2].value &&
      europeAndAmericaSongs.value.length > 0
    ) {
      return;
    } else if (
      tabValue === tabsState.tabs[3].value &&
      koreaSongs.value.length > 0
    ) {
      return;
    } else if (
      tabValue === tabsState.tabs[4].value &&
      japaneseSongs.value.length > 0
    ) {
      return;
    }
    fetchSongs(tabValue);
  }
);

onMounted(() => {
  fetchSongs(tabsState.currentTab);
});
</script>

<style lang="scss" scoped>
.latest-songs {
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tab-wrapper {
      display: inline-flex;
      .tab-item {
        font-size: 14px;
        color: #666;
        margin-right: 28px;
        cursor: pointer;
      }
      .active {
        color: #000;
        font-weight: bold;
      }
    }
    .flex-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      .operate-wrapper {
        .operate-item {
          display: inline-flex;
          align-items: center;
          background-image: linear-gradient(90deg, #fc5244, #d43a32);
          color: #fff;
          margin-right: 8px;
          padding: 5px 12px;
          border-radius: 12px;
          font-size: 13px;
          cursor: pointer;
          & > .text {
            margin-left: 4px;
          }
        }
      }
    }
  }

  .content {
    .song-list {
      .song-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        background-color: #fff;
        cursor: pointer;
        &:nth-child(2n + 1) {
          background-color: #fafafa;
        }

        .no {
          font-size: 13px;
          color: #b7b7b7;
          margin-left: 10px;
          padding: 0 4px;
        }
        .icon-reset {
          margin-left: 14px;
          margin-right: 4px;
        }
        .image-wrapper {
          padding: 0 10px;
          position: relative;
          .image {
            width: 60px;
            height: 60px;
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
              border-radius: 4px;
            }
          }
          .play-button {
            position: absolute;
            left: calc(50% - 12px);
            top: calc(50% - 12px);
          }
        }
        .song-name {
          flex: 1;
          padding: 0 8px;
          box-sizing: border-box;
          color: #333;
          font-size: 14px;
        }
        .artist {
          width: 160px;
          padding: 0 8px;
          box-sizing: border-box;
          color: #666;
          font-size: 12px;
        }
        .album {
          width: 240px;
          padding: 0 8px;
          box-sizing: border-box;
          color: #666;
          font-size: 12px;
        }
        .duration {
          width: 70px;
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
