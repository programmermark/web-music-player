<template>
  <div class="latest-songs h-full">
    <div class="header pl-[30px] pr-[30px]">
      <div class="tab-wrapper text-center">
        <div
          class="tab-item"
          :class="[currentTab === tab.value && 'active']"
          v-for="tab in tabs"
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
      <div class="song-list">
        <template v-if="allSongs && allSongs.length > 0">
          <div class="song-item" v-for="(song, index) in allSongs" :key="song.id">
            <span class="no" v-show="currentSongId !== song.id">{{
              formatNo(index + 1)
            }}</span>
            <MPOptIcon
              v-show="currentSongId === song.id"
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
              {{ song.name }}{{ song.alias && song.alias[0] ? `(${song.alias[0]})` : "" }}
            </div>
            <div
              class="artist text-ellipsis"
              :title="formatArtistListToString(song.artists)"
            >
              <span v-for="(artist, index) in song.artists" :key="artist.id">
                <span class="cursor-pointer" @click="gotoArtistDetail(artist.id)">{{
                  artist.name
                }}</span>
                <span v-if="index + 1 < song.artists.length" class="px-1">/</span>
              </span>
            </div>
            <div class="album text-ellipsis" @click="gotoAlbumDetail(song.album.id)">
              {{ song.album.name }}
            </div>
            <div class="duration">
              {{ transformSecondToMinute(Math.floor((song.duration || 0) / 1000)) }}
            </div>
          </div>
        </template>
        <div v-else class="flex items-center">
          <div class="w-full py-6 text-center text-sm text-gray-400">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { formatNo } from "@/common/js/util";
import { formatArtistListToString, transformSecondToMinute } from "@/common/js/util";
import { gotoAlbumDetail, gotoArtistDetail } from "@/common/js/router";
import { usePlayerStore } from "@/stores/player";
import { useTopSong } from "../../hooks/useTopSong";

const playerStore = usePlayerStore();

const tabs = [
  { label: "全部", value: 0 },
  { label: "华语", value: 7 },
  { label: "欧美", value: 96 },
  { label: "日本", value: 8 },
  { label: "韩国", value: 16 },
];

const currentTab = ref(0);
const currentSongId = ref<number | undefined>(undefined);

const { data: allSongs } = useTopSong(currentTab);

const allSongIds = computed(() => {
  if (allSongs.value) {
    return allSongs.value.map((song) => song.id);
  }
  return [];
});

/** 切换歌曲tab */
const toggleTab = (value: number) => {
  currentTab.value = value;
};

/** 播放全部 */
const playAllSong = () => {
  if (allSongIds.value.length > 0) {
    playerStore.setSongListByIds({
      ids: allSongIds.value,
    });
  }
};

/** 播放当前歌曲 */
const playSong = (id: number) => {
  if (allSongIds.value) {
    currentSongId.value = id;
    playerStore.setSongListByIds({
      ids: allSongIds.value,
      currentId: id,
    });
  }
};
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
