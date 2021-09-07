<template>
  <div class="hot-song" v-if="hotSongList.length > 0">
    <!-- top50 图片 -->
    <div class="image">
      <img src="./image/top-50.png" alt="top50歌曲" />
    </div>
    <div class="right-content">
      <div class="header">
        <div class="title">热门50首</div>
        <MPIcon
          icon="play-button-solid"
          color="#666666"
          :size="20"
          :scale="1"
          bgColor="none"
          title="点击播放全部"
          @click="playAllSong"
        />
      </div>
      <div class="list-wrapper">
        <div
          class="song-item"
          v-for="(song, index) in hotSongList"
          :key="song.id"
          title="点击播放歌曲"
          @click="playCurrentSong(song.id)"
        >
          <div v-show="!currentSong || currentSong.id !== song.id" class="no">
            {{ formatNo(index + 1) }}
          </div>
          <MPOptIcon
            v-show="currentSong && currentSong.id === song.id"
            class="icon-reset"
            icon="horn-playing-solid"
            color="#d33a31"
            :size="14"
            scale="1"
            bgColor="none"
            display="always"
          />
          <div class="name">
            {{ song.name }}
            <span v-if="song.alia && song.alia.length > 0" class="alias"
              >（{{ song.alia[0] }}）</span
            >
          </div>
          <div class="duration">
            {{ transformSecondToMinute(Math.floor((song.dt || 0) / 1000)) }}
          </div>
        </div>
      </div>
      <div class="show-more" v-if="songList.length > 10 && !showAllSong">
        <div class="content" @click="toggleShowAllSong">
          <span class="text"> 查看全部50首 </span>
          <MPIcon
            icon="arrow-right"
            color="#999999"
            :size="12"
            :scale="1"
            bgColor="none"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="no-data" v-else>没有相关专辑</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import MPIcon from "@/components/MPIcon.vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { IHotSong } from "@/store/modules/interface/artist-detail";
import { formatNo, transformSecondToMinute } from "@/common/js/util";
import { useStore } from "@/store";

const props = withDefaults(defineProps<{ songList: IHotSong[] }>(), {
  songList: () => [],
});

const store = useStore();

/** 显示所有的热门歌曲 */
const showAllSong = ref(false);

/** 当前播放的歌曲 */
const currentSong = computed(() => store.state.player.currentSong);

/** top 10热门歌曲 */
const top10SongList = computed(() =>
  props.songList.filter((song, index) => index < 10)
);

/** 用于展示的热门歌曲 */
const hotSongList = computed(() => {
  if (showAllSong.value) {
    return props.songList;
  }
  return top10SongList.value;
});

/** 所有歌曲id组成的数组 */
const songIds = computed(() => props.songList.map((song) => song.id));

/** 切换显示全部歌曲 */
const toggleShowAllSong = () => (showAllSong.value = !showAllSong.value);

/** 播放全部歌曲 */
const playAllSong = () => {
  store.dispatch("player/setSongListByIds", {
    ids: songIds.value,
    currentId: songIds.value[0],
  });
};

/** 播放全部歌曲，从指定的id开始播放 */
const playCurrentSong = (id: number) => {
  store.dispatch("player/setSongListByIds", {
    ids: songIds.value,
    currentId: id,
  });
};
</script>

<style lang="scss" scoped>
.hot-song {
  padding-top: 20px;
  margin-bottom: 40px;
  display: flex;
  .image {
    width: 150px;
    height: 150px;
    border-radius: 8px;

    margin-right: 60px;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  .right-content {
    flex: 1;
    .header {
      display: flex;
      align-items: center;
      .title {
        margin-right: 30px;
        font-size: 16px;
        color: #333;
      }
    }

    .list-wrapper {
      margin-top: 12px;
      .song-item {
        display: flex;
        align-items: center;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        cursor: pointer;

        .no {
          color: #bbb;
          padding: 0 16px;
        }

        .icon-reset {
          padding: 0 16px;
        }
        .name {
          color: #333;
          flex: 1;
          .alias {
          }
        }
        .duration {
          color: #bbb;
          margin-right: 80px;
        }

        &:nth-child(2n + 1) {
          background-color: #fafafa;
        }
      }
    }

    .show-more {
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      height: 34px;
      background-color: #fbfbfb;
      .content {
        display: flex;
        align-items: center;
        margin-right: 30px;
        cursor: pointer;

        .text {
          font-size: 13px;
          color: #999;
          margin-right: 4px;
        }
      }
    }
  }
}

.no-data {
  margin-top: 48px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
