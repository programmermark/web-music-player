<template>
  <div class="w-full">
    <div class="px-8">
      <div class="flex pt-4 mb-6">
        <MpOptSpecialIcon
          icon="calendar"
          color="#d33a31"
          bgColor="#fff"
          :size="100"
          display="always"
          scale="1"
          :innerNumberStyle="{
            color: '#d33a31',
            fontSize: '36px',
            top: '36px',
          }"
        />

        <div class="ml-4 m-2">
          <div class="text-xl text-gray-700 font-semibold">每日歌曲推荐</div>
          <div class="text-xs mt-1 text-gray-500">根据你的音乐口味生成，每天6:00更新</div>
        </div>
      </div>
      <div>
        <div
          class="inline-flex items-center h-8 rounded-2xl cursor-pointer mb-3 bg-red-600 hover:bg-red-500"
          @click="playAllSongs(dailySongIds)"
          title="播放全部歌曲"
        >
          <MpIcon
            class="ml-4"
            icon="play-button-solid"
            :size="20"
            :scale="1"
            color="#fff"
            bgColor="none"
          />
          <span class="text-white text-sm ml-2 pr-6">播放全部</span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="pb-10 border-t border-gray-100">
      <template v-if="state.dailySongs && state.dailySongs.length > 0">
        <!-- 歌曲标题 -->
        <div class="w-full flex items-center h-9 text-[13px] text-gray-500">
          <div class="flex-1 ml-28">音乐标题</div>
          <div class="w-44">歌手</div>
          <div class="w-64">专辑</div>
          <div class="w-12 mr-8">时长</div>
        </div>
        <!-- 歌曲列表 -->
        <div
          class="w-full flex items-center h-9 text-[13px] hover:bg-gray-100 even:bg-gray-50"
          v-for="(song, index) in state.dailySongs"
          :key="song.id"
          @dblclick="playSong(song.id, dailySongIds)"
          title="双击播放当前歌曲"
        >
          <div
            v-show="currentSongId !== song.id"
            class="w-20 text-gray-400 ml-8 pl-4 box-border"
          >
            {{ formatNo(index + 1) }}
          </div>
          <div
            v-show="currentSongId === song.id"
            class="w-20 text-gray-400 ml-8 pl-4 box-border"
          >
            <MPOptIcon
              icon="horn-playing-solid"
              color="#d33a31"
              :size="14"
              scale="1"
              bgColor="none"
              display="always"
            />
          </div>
          <div
            class="flex-1 flex items-center text-gray-800 text-ellipsis"
            :class="{ 'text-red-500': currentSongId === song.id }"
          >
            {{ song.name }}
            <span v-if="song.alias.length > 0" class="text-gray-400"
              >（{{ song.alias[0] }}）</span
            >
            <div class="mr-8" v-show="song.mvId && song.mvId > 0">
              <MpIcon
                icon="mv"
                :size="32"
                color="#d33333"
                bgColor="none"
                @click="gotoMVDetail(song.mvId)"
              />
            </div>
          </div>
          <div class="w-44 mr-4 flex items-center text-gray-500">
            <div
              class="flex items-center text-ellipsis"
              v-for="(artist, index) in song.artists"
              :key="artist.id"
            >
              <span
                class="px-1 cursor-pointer max-w-[150px] text-ellipsis hover:text-gray-800"
                @click="gotoArtistDetail(artist.id)"
                title="点击跳转到歌手详情"
                >{{ artist.name }}</span
              >
              <span v-if="index < song.artists.length - 1">/</span>
            </div>
          </div>
          <div
            class="w-60 mr-4 text-gray-500 text-ellipsis cursor-pointer hover:text-gray-800"
            @click="gotoAlbumDetail(song.album.id)"
            title="点击跳转到专辑详情"
          >
            {{ song.album.name }}
          </div>
          <div class="w-12 mr-8 text-gray-400">
            {{ transformSecondToMinute(Math.floor((song.duration || 0) / 1000)) }}
          </div>
        </div>
      </template>
      <div class="empty-song-list" v-else>歌单中暂无任何歌曲</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { apis } from "@/api";
import { useStore } from "@/store";
import { http } from "@/common/js/http";
import { formatNo, transformSecondToMinute } from "@/common/js/util";
import MPOptIcon from "@/components/MPOptIcon.vue";
import MpIcon from "@/components/MPIcon.vue";
import MpOptSpecialIcon from "@/components/MpOptSpecialIcon.vue";
import { IDailyRecommendSongs, IDailyRecommendSongsState } from "./interface";
import { ISong } from "@/store/modules/interface/latest-music";

const store = useStore();
const router = useRouter();

const state = reactive<IDailyRecommendSongsState>({
  dailySongs: [],
});

/** 每日推荐歌曲id数组 */
const dailySongIds = computed(() => state.dailySongs.map((song) => song.id));

/** 当前播放的歌曲id */
const currentSongId = computed(() => store.state.player.currentSong?.id);

/**
 * 获取每日歌曲推荐
 */
const fetchDailyRecommendSongs = async () => {
  const { dailySongs } = await http<IDailyRecommendSongs>(
    { url: apis.personalDailyReocommendSongs },
    "data"
  );
  console.log("dailySongs", dailySongs);
  const formatSongs: ISong[] = dailySongs.map((song) => ({
    id: song.id /** 歌曲id */,
    name: song.name /** 歌曲名 */,
    alias: song.alia /** 歌曲别名数组 */,
    duration: song.dt /** 歌曲时长（毫秒） */,
    mvId: song.mv,
    artists: song.ar.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
    album: {
      id: song.al.id,
      name: song.al.name,
      picUrl: song.al.picUrl,
    },
  }));
  state.dailySongs = formatSongs;
};

/** 播放全部歌曲 */
const playAllSongs = (songIds: number[]) => {
  store.dispatch("player/setSongListByIds", {
    ids: songIds,
    currentId: undefined,
  });
};

/** 播放当前歌曲 */
const playSong = (songId: number, songIds: number[]) => {
  // store.dispatch("player/setSongList", {
  //   id: playlistId,
  //   noSetCurrentSong: true,
  // });
  // store.commit("player/setCurrentSongById", songId);

  store.dispatch("player/setSongListByIds", {
    ids: songIds,
    currentId: songId,
  });
};

/** 跳转到MV详情 */
const gotoMVDetail = (id?: number) => {
  if (IdleDeadline) {
    router.push(`/mv/${id}`);
  }
};

/** 跳转到歌手详情 */
const gotoArtistDetail = (id: number) => {
  if (id) {
    router.push(`/artist/${id}`);
  }
};

/** 前往专辑详情 */
const gotoAlbumDetail = (id: number) => {
  router.push(`/albumDetail/${id}`);
};

onMounted(() => {
  fetchDailyRecommendSongs();
});
</script>

<style lang="scss" scoped></style>
