<template>
  <div class="official-rank-list">
    <div
      class="img-wrapper"
      :title="type === 'song' ? '点击前往歌单详情' : '点击前往歌手列表'"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="viewAll"
    >
      <img :src="`${imgUrl}?param=170y170`" alt="歌单封面" />
      <div class="text">{{ updateTime }}</div>
      <MPOptIcon
        v-show="showIcon && type === 'song'"
        class="play-button"
        title="点击播放歌曲"
        :size="40"
        icon="play-caret-solid"
        color="#d33a33"
        bgColor="#dddddd"
        display="always"
        @click="playSong"
      />
    </div>
    <div class="right-content">
      <div class="list-wrapper" v-if="type === 'song'">
        <div
          class="list"
          v-for="(song, index) in songList"
          :key="song.name"
          title="双击播放歌曲"
          @dblclick="playCurrentSong(rankList.id, song.name)"
        >
          <span class="order">{{ index + 1 }}</span>
          <span class="name">{{ song.name }}</span>
          <span class="artist text-ellipsis">{{ song.artistStr }}</span>
        </div>
      </div>
      <div class="list-wrapper" v-else>
        <div
          class="list"
          v-for="(artist, index) in artistList"
          :key="artist.id"
          title="单击查看歌手详情"
          @click="gotoArtistDetail(artist.id)"
        >
          <span class="order">{{ index + 1 }}</span>
          <span class="name">{{ artist.name }}</span>
        </div>
      </div>
      <div class="view-detail" @click="viewAll">
        <span>查看全部</span>
        <el-icon class="text-sm text-[#666666] ml-1">
          <arrow-right />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from "vue";
import type { IArtistRank, ISongRankOfficial } from "@/stores/interface/ranklist";
import { formatTime } from "@/common/js/util";
import MPOptIcon from "@/components/MPOptIcon.vue";
import {
  gotoArtistDetail,
  gotoArtistRankList,
  gotoPlayListDetail,
} from "@/common/js/router";
import { usePlayerStore } from "@/stores/player";

const props = withDefaults(
  defineProps<{
    rankList: ISongRankOfficial | IArtistRank;
    type?: "song" | "artist";
  }>(),
  {
    type: "song",
  }
);

const { rankList, type } = toRefs(props);

const playerStore = usePlayerStore();

const showIcon = ref(false);

/** 排行榜封面 */
const imgUrl = computed(() => {
  let url = "";
  if (type.value === "song") {
    url = (rankList.value as ISongRankOfficial).coverImgUrl;
  } else {
    url = (rankList.value as IArtistRank).coverUrl;
  }
  return url;
});

/** 更新时间 */
const updateTime = computed(() => {
  let time = "";
  if (type.value === "song") {
    time =
      formatTime(
        (rankList.value as ISongRankOfficial).trackNumberUpdateTime,
        "MM月dd日"
      ) + "更新";
  } else {
    time = formatTime((rankList.value as IArtistRank).updateTime, "MM月dd日") + "更新";
  }
  return time;
});

/** 歌曲列表 */
const songList = computed(() => (rankList.value as ISongRankOfficial).songList);

/** 歌手列表 */
const artistList = computed(() => (rankList.value as IArtistRank).artistList);

const handleMouseEnter = () => {
  showIcon.value = true;
};

const handleMouseLeave = () => {
  showIcon.value = false;
};

/** 播放歌单歌曲，从第一首歌曲开始播放 */
const playSong = (e: Event) => {
  e.stopPropagation();
  const id = (rankList.value as ISongRankOfficial).id;
  playerStore.setSongList({ id });
};

/** 播放歌单，从选中的当前歌曲开始播放 */
const playCurrentSong = (id: number, songName: string) => {
  playerStore.setSongList({ id, noSetCurrentSong: true });
  playerStore.setCurrentSongByName(songName);
};

/** 查看全部 */
const viewAll = () => {
  if (type.value === "song") {
    const id = (rankList.value as ISongRankOfficial).id;
    gotoPlayListDetail(id);
  } else {
    gotoArtistRankList();
  }
};
</script>

<style lang="scss" scoped>
.official-rank-list {
  display: flex;
  padding-bottom: 30px;
  .img-wrapper {
    width: 170px;
    height: 170px;
    margin-right: 32px;
    border-radius: 8px;
    position: relative;
    & > img {
      width: 100%;
      border-radius: 8px;
    }
    .text {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 110px;
      color: #fff;
      font-size: 14px;
    }
    .play-button {
      position: absolute;
      left: calc(50% - 20px);
      top: calc(50% - 20px);
    }
  }

  .right-content {
    flex: 1;
    .list-wrapper {
      .list {
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        font-size: 14px;
        cursor: pointer;

        &:nth-child(2n + 1) {
          background-color: #fafafa;
          border-radius: 4px;
        }

        &:hover {
          background-color: #f5f5f5;
        }

        .order {
          color: #d33a31;
          padding: 0 10px 0 2px;
        }
        .name {
          flex: 1;
          color: #333333;
        }
        .artist {
          width: 180px;
          color: #969696;
          text-align: right;
        }
      }
    }

    .view-detail {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 14px;
      margin-top: 10px;
      margin-left: 10px;
      cursor: pointer;

      .icon-reset {
        color: #666;
        font-size: 14px;
        margin-left: 4px;
      }
    }
  }
}
</style>
