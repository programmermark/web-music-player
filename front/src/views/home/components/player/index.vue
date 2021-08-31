<template>
  <!-- 底部播放器 -->
  <div class="music-player-wrapper">
    <div class="music-player">
      <div class="wrapper">
        <audio
          ref="audioPlayerRef"
          class="audio-element"
          :src="currentSongUrl"
          controls
        ></audio>
        <!-- 播放器左侧 -->
        <div class="left-part">
          <div v-if="playingSong" class="wrapper">
            <div class="cover-img">
              <img :src="`${playingSong.coverImg}?param=80y80`" alt="歌曲封面图片" />
            </div>
            <div class="song-info-wrapper">
              <div class="song-info">
                <span class="song-name word-ellipsis">{{
                  playingSong.name
                }}</span>
                <div class="parting-line">-</div>
                <span
                  class="artist word-ellipsis"
                  :title="playingSongArtistStr"
                  >{{ playingSongArtistStr }}</span
                >
              </div>
              <div class="play-pace">
                <span class="time">
                  {{ transformSecondToMinute(songState.playedSongDuration) }}
                </span>
                <span class="parting-line">/</span>
                <span class="time">
                  {{ transformSecondToMinute(songState.songDuration) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 播放器中部 -->
        <div class="center-part">
          <div class="prev-song-wrapper" @click="playPrev">
            <mp-icon icon="prev-song" color="#d33a30" :size="16" />
          </div>
          <div
            v-if="songState.isPause"
            class="play-song-wrapper"
            @click="playSong"
          >
            <mp-icon icon="play-button" color="#d33a30" :size="40" :scale="1" />
          </div>
          <div v-else class="play-song-wrapper" @click="playPause">
            <mp-icon
              icon="pause-button"
              color="#d33a30"
              :size="40"
              :scale="1"
            />
          </div>
          <div class="next-song-wrapper" @click="playNext">
            <mp-icon icon="next-song" color="#d33a30" :size="16" />
          </div>
        </div>
        <!-- 播放器右侧 -->
        <div class="right-part">
          <div class="wrapper">
            <div
              class="play-list-wrapper mr-20"
              @click="changeListState(playerState.listState)"
            >
              <el-tooltip
                placement="top"
                :content="playerState.listStateDesc"
                :visible-arrow="false"
                effect="light"
              >
                <mp-icon
                  :icon="playerState.listStateIcon"
                  color="#4b4b4b"
                  :size="16"
                  :scale="1"
                />
              </el-tooltip>
            </div>
            <div
              class="play-list-wrapper mr-20"
              @click.stop="toggleExpandSong()"
            >
              <mp-icon
                icon="play-list"
                :color="playerState.expandSong ? '#d33a30' : '#4b4b4b'"
                :size="16"
                :scale="1"
              />
            </div>
            <div class="show-word-wrapper mr-20">
              <mp-icon icon="word" color="#4b4b4b" :size="16" :scale="1" />
            </div>
            <volume-adjuster @change-volume="onChangeVolume">
              <template v-slot:content>
                <div class="adjust-volume-wrapper mr-20">
                  <mp-icon icon="horn" color="#4b4b4b" :size="16" :scale="1" />
                </div>
              </template>
            </volume-adjuster>
          </div>
        </div>
      </div>
      <!-- 歌曲进度条 -->
      <div
        class="progress-bar"
        :style="{ width: `${songState.playRate * 100}%` }"
      ></div>
    </div>
  </div>
  <!-- 右侧播放列表 -->
  <div
    id="music-song-list"
    class="music-song-list"
    v-if="playerState.expandSong"
    @click.stop="toggleExpandSong(true)"
  >
    <div class="list-title">当前播放</div>
    <div class="operates">
      <div class="left">总{{ storeSongList.length }}首</div>
      <div class="right">
        <div class="collect-all">
          <mp-icon class="icon" icon="add-collect" :size="16" :scale="1" />
          收藏全部
        </div>
        <div class="clear-all" @click="clearPlayList">清空列表</div>
      </div>
    </div>
    <!-- 播放列表 -->
    <el-scrollbar>
      <div class="song-list-wrapper">
        <div
          class="song-list"
          :class="[
            playingSong && playingSong.id === song.id && 'song-list-active',
          ]"
          v-for="song in storeSongList"
          :key="song.id"
          @dblclick="playSongById(song.id)"
        >
          <mp-icon
            v-if="playingSong && playingSong.id === song.id"
            class="icon-in-play"
            icon="in-play"
            :size="16"
            :scale="1"
            color="#d33a30"
          />
          <div
            class="song-name text-ellipsis"
            :class="[playingSong && playingSong.id === song.id && 'active']"
            :title="song.name"
          >
            {{ song.name }}
          </div>
          <div
            class="artist text-ellipsis"
            :class="[playingSong && playingSong.id === song.id && 'active']"
            :title="formatArtistListToString(song.artists)"
          >
            {{ formatArtistListToString(song.artists) }}
          </div>
          <mp-icon
            class="icon-link"
            icon="link"
            :scale="1"
            :size="14"
            color="#a3a3a3"
            bgColor="none"
          />
          <div class="duration">
            {{ transformSecondToMinute(song.duration || 0) }}
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";
import { IPlaySong } from "@/store/modules/interface/player";
import { useStore } from "@/store";
import { ISongState } from "./interface/index";
import { useAudio, usePlayerState } from "./hooks/index";
import { formatArtistListToString } from "@/common/js/util";
import { transformSecondToMinute } from "@/common/js/util/index";

import MPIcon from "@/components/MPIcon.vue";
import VolumeAdjuster from "./components/volume-adjuster/index.vue";

export default defineComponent({
  components: { "mp-icon": MPIcon, "volume-adjuster": VolumeAdjuster },
  name: "MusicPlayer",
  setup() {
    const store = useStore();
    const { playerState, changeListState, toggleExpandSong, adjustVolume } =
      usePlayerState();

    /** 播放器元素 */
    const audioPlayerRef = ref<HTMLAudioElement>();

    /** 当前播放的歌曲id */
    const currentPlayId = ref(-1);

    /** 当前歌曲播放状态 */
    const songState = reactive<ISongState>({
      isPause: true /** 歌曲是否已暂停 */,
      playRate: 0 /** 播放进度 */,
      songDuration: 0 /** 歌曲时长 */,
      playedSongDuration: 0 /** 已播放歌曲时长 */,
    });

    /** 歌曲列表 */
    const storeSongList = computed<IPlaySong[]>(
      () => store.state.player.songList
    );

    /** 当前播放的歌曲 */
    const storeCurrentSong = computed<IPlaySong>(() => {
      return store.state.player.currentSong as IPlaySong;
    });

    /** 当前播放的歌曲（没有歌曲播放的时候为undefined）*/
    const playingSong = computed(() => {
      if (currentPlayId.value !== -1) {
        return storeSongList.value.find(
          (item) => item.id === currentPlayId.value
        );
      }
      return undefined;
    });

    /** 正在播放的歌曲的歌手名组成的数组 */
    const playingSongArtistStr = computed(() => {
      let artistStr = "";
      if (playingSong.value && playingSong.value.artists.length > 0) {
        artistStr = playingSong.value.artists
          .map((artist) => artist.name)
          .reduce((initValue, currentValue) => initValue + "/" + currentValue);
      }
      return artistStr;
    });

    /** 当前播放的歌曲的url */
    const currentSongUrl = computed(() => {
      if (playingSong.value) {
        return playingSong.value.songUrl;
      }
      return "";
    });

    watch(
      () => storeCurrentSong.value,
      (nv, ov) => {
        /** store中的当前歌曲存在，并且和上一次的歌曲不同则替换当前播放的歌曲id */
        if (nv !== undefined && nv.id !== ov?.id) {
          currentPlayId.value = nv.id;
          nextTick(() => {
            if (audioPlayerRef.value) {
              audioPlayerRef.value.play();
            }
          });
        }
      },
      { immediate: true }
    );

    /** 播放下一首音乐 */
    const playNext = () => {
      const findIndex = storeSongList.value.findIndex(
        (song) => song.id === currentPlayId.value
      );
      /**
       * 当前无播放歌曲或者当前播放歌曲在列表中找不到，又或者播放到了列表的最后一首，
       * 则播放列表的第一首歌曲
       */
      if (
        currentPlayId.value === -1 ||
        findIndex === -1 ||
        findIndex === storeSongList.value.length - 1
      ) {
        currentPlayId.value = storeSongList.value[0].id;
        store.commit("player/setCurrentSong", storeSongList.value[0]);
        return;
      }
      const nextSong = storeSongList.value[findIndex + 1];
      currentPlayId.value = nextSong.id;
      store.commit("player/setCurrentSong", nextSong);
    };

    /** 播放上一首音乐 */
    const playPrev = () => {
      const findIndex = storeSongList.value.findIndex(
        (song) => song.id === currentPlayId.value
      );
      /**
       * 当前无播放歌曲或者当前播放歌曲在列表中找不到，则播放列表的第一首歌曲
       */
      if (currentPlayId.value === -1 || findIndex === -1) {
        currentPlayId.value = storeSongList.value[0].id;
        store.commit("player/setCurrentSong", storeSongList.value[0]);
        return;
      } else if (findIndex === 0) {
        /** 当前播放的是第一首，点击播放上一首歌曲则播放列表中的最后一首 */
        const length = storeSongList.value.length;
        currentPlayId.value = storeSongList.value[length - 1].id;
        store.commit("player/setCurrentSong", storeSongList.value[length - 1]);
        return;
      }
      const nextSong = storeSongList.value[findIndex - 1];
      currentPlayId.value = nextSong.id;
      store.commit("player/setCurrentSong", nextSong);
    };

    const playSongById = (id: number) => {
      const findIndex = storeSongList.value.findIndex((song) => song.id === id);
      /**
       * 当前无播放歌曲或者当前播放歌曲在列表中找不到，则播放下一首歌曲
       */
      if (id === -1 || findIndex === -1) {
        playNext();
      }
      const nextSong = storeSongList.value[findIndex];
      currentPlayId.value = nextSong.id;
      store.commit("player/setCurrentSong", nextSong);
    };

    /** 播放音乐 */
    const playSong = () => {
      if (audioPlayerRef.value !== undefined) {
        songState.isPause = false;
        audioPlayerRef.value.play();
      }
    };

    /** 暂停播放 */
    const playPause = () => {
      if (audioPlayerRef.value !== undefined) {
        songState.isPause = true;
        audioPlayerRef.value.pause();
      }
    };

    /** 清空播放列表 */
    const clearPlayList = () => {
      songState.isPause = true;
      store.commit("player/setCurrentSong", undefined);
      store.commit("player/setSongList", []);
    };

    /** 调整音量 */
    const onChangeVolume = (volume: number) => {
      if (audioPlayerRef.value) {
        adjustVolume(volume);
        audioPlayerRef.value.volume = volume;
      }
    };

    onMounted(() => {
      if (audioPlayerRef.value !== undefined) {
        audioPlayerRef.value.volume = playerState.volume;
        const { initAudio } = useAudio(
          audioPlayerRef as Ref<HTMLAudioElement>,
          songState,
          playNext
        );
        initAudio();
      }

      const songListEle = document.querySelector("#music-song-list");
      document.addEventListener("click", function (e) {
        /** 被点击的元素不是songListEle，就隐藏songListEle */
        if (e.target !== songListEle && playerState.expandSong) {
          toggleExpandSong(false);
        }
      });
    });

    return {
      audioPlayerRef,
      currentPlayId,
      playingSong,
      playingSongArtistStr,
      currentSongUrl,
      songState,
      playerState,
      storeSongList,
      changeListState,
      toggleExpandSong,
      playNext,
      playPrev,
      playSong,
      playPause,
      transformSecondToMinute,
      formatArtistListToString,
      playSongById,
      clearPlayList,
      onChangeVolume,
    };
  },
});
</script>

<style lang="scss" scoped>
.music-player-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 100;

  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background-color: #fff;

  .music-player {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border-top: 2px solid #f5f5f5;
    position: relative;

    & > .wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      .left-part {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;

        & > .wrapper {
          display: flex;
          align-items: center;

          .cover-img {
            width: 40px;
            height: 40px;
            border-radius: 4px;
            margin-right: 10px;

            & > img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
          }

          .song-info-wrapper {
            display: flex;
            flex-direction: column;
            height: 40px;
            justify-content: center;

            .song-info {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
              .song-name {
                max-width: 200px;
                color: #4d4d4d;
                font-size: 14px;
                font-weight: bold;
              }
              .parting-line {
                color: #666666;
                font-size: 13px;
                padding: 0 4px;
              }
              .artist {
                max-width: 150px;
                color: #666666;
                font-size: 13px;
              }
            }
            .play-pace {
              display: flex;
              align-items: center;
              .time {
                color: #bbbbbb;
                font-size: 12px;
              }
              .parting-line {
                color: #bbbbbb;
                font-size: 12px;
                padding: 0 2px;
              }
            }
          }
        }
      }

      .center-part {
        display: flex;
        align-items: center;
        .prev-song-wrapper {
          margin-left: 36px;
          margin-right: 24px;
        }
        .next-song-wrapper {
          margin-left: 24px;
          margin-right: 36px;
        }
      }

      .right-part {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;

        .wrapper {
          flex: 1;
          align-self: flex-end;
          display: flex;
          align-items: center;
        }
      }

      .audio-element {
        display: none;
      }
    }

    .progress-bar {
      position: absolute;
      left: 0;
      top: -2px;
      height: 2px;
      background-color: #d33a30;
    }
  }

  :deep(.mr-20) {
    margin-right: 20px;
  }

  .word-ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
}

.music-song-list {
  position: absolute;
  z-index: 99;
  top: 50px;
  right: 0;
  width: 420px;
  min-height: calc(100% - 110px);
  background-color: #ffffff;
  box-shadow: 0 4px 4px 0 #fafafa;

  .list-title {
    padding: 20px 0 20px 20px;
    font-size: 20px;
    color: #333333;
    font-weight: bold;
  }

  .operates {
    display: flex;
    align-items: center;
    padding: 0 20px 16px 20px;

    .left {
      flex: 1;
      color: #bababa;
      font-size: 13px;
    }

    .right {
      display: flex;
      align-items: center;
      .collect-all {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #333333;
        font-size: 14px;
        margin-right: 20px;

        .icon {
          margin-right: 5px;
        }
      }
      .clear-all {
        cursor: pointer;
        color: #4d7abd;
        font-size: 14px;
      }
    }
  }

  .song-list-wrapper {
    border-top: 1px solid #f0f0f0;
    height: calc(100vh - 267px);

    .song-list {
      display: flex;
      align-items: center;
      height: 35px;
      font-size: 13px;
      position: relative;

      &:nth-child(2n) {
        background-color: #fafafa;
      }

      .icon-in-play {
        position: absolute;
        transform: scale(0.5);
        padding: 0 5px;
      }
      .song-name {
        width: 185px;
        margin-left: 20px;
        margin-right: 10px;
        color: #333333;
      }
      .artist {
        width: 80px;
        margin-right: 10px;
        color: #666666;
        cursor: pointer;
      }
      .icon-link {
        cursor: pointer;
        margin-right: 10px;
      }
      .duration {
        flex: 1;
        color: #bfbfbf;
      }
      .active {
        color: #d33a30;
      }
    }
    .song-list-active {
      background-color: #f0f0f0 !important;
    }
  }
}
</style>
