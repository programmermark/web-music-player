<template>
  <transition name="song-detail" :persisted="true" mode="out-in">
    <div
      v-show="isShowSongDetail"
      class="w-full h-[calc(100%-110px)] bg-[#f8f8f8] mt-[50px] mb-[60px] absolute top-0 left-0 z-[99] overflow-hidden"
    >
      <el-scrollbar>
        <div class="flex">
          <div class="w-6/12 flex flex-row-reverse">
            <!-- 歌词封面（播放时旋转） -->
            <RotateCover
              v-if="currentSong"
              class="mr-16 mt-16"
              :img="currentSong?.coverImg"
            />
          </div>
          <div class="w-6/12">
            <!-- 歌词组件（词曲作者、歌词） -->
            <SongLyric
              v-if="currentSong"
              :song="currentSong"
              :lyric="lyricState.lyric"
              :transLyric="lyricState.transLyric"
              :lyricUser="lyricState.lyricUser"
              :transLyricUser="lyricState.transLyricUser"
            />
          </div>
        </div>

        <div v-if="currentSongId" class="mt-16 px-[200px] flex">
          <!-- 歌曲评论 -->
          <SongComments :songId="currentSongId" :songName="currentSong?.name || ''" />
          <div class="w-[280px]">
            <!-- 包含该歌曲的歌单 -->
            <!-- 相似歌曲 -->
          </div>
        </div>
      </el-scrollbar>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch, computed } from "vue";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import type { ILyricResponse, ILyricState } from "./interface";
import RotateCover from "./components/rotate-cover/index.vue";
import SongLyric from "./components/song-lyric/index.vue";
import SongComments from "./components/song-comments/index.vue";
import { usePlayerStore } from "@/stores/player";

const playerStore = usePlayerStore();

/** 是否展示歌曲详情 */
const isShowSongDetail = computed(() => playerStore.isShowSongDetail);
/** 当前歌曲 */
const currentSong = computed(() => playerStore.currentSong);
/** 当前歌曲id */
const currentSongId = computed(() => playerStore.currentSong?.id);

const lyricState = reactive<ILyricState>({
  lyric: "",
  lyricUser: undefined,
  transLyric: undefined,
  transLyricUser: undefined,
});

/** 获取歌曲歌词 */
const getSongLyric = async (id: number) => {
  const { lrc, lyricUser, tlyric, transUser } = await http<ILyricResponse>(
    { url: `${apis.lyric}?id=${id}` },
    ""
  );
  lyricState.lyric = lrc.lyric;
  lyricState.transLyric = tlyric?.lyric;
  lyricState.lyricUser = lyricUser;
  lyricState.transLyricUser = transUser;
};

watch(
  () => playerStore.currentSong,
  (song) => {
    if (song && song.id) {
      getSongLyric(Number(song.id));
    }
  }
);

watch(
  () => isShowSongDetail,
  (nv, ov) => {
    console.log("isShowSongDetail", nv.value, ov.value);
  }
);

onMounted(() => {
  const id = currentSong.value?.id;
  if (id) {
    getSongLyric(Number(id));
  }
});
</script>

<style lang="scss" scoped>
.song-detail-enter-active {
  animation: fade 0.3s;
}

.song-detail-leave-active {
  animation: fade 0.3s reverse;
}

@keyframes fade {
  0% {
    transform: translateY(100%);
  }
  25% {
    transform: translateY(80%);
  }
  50% {
    transform: translateY(50%);
  }
  75% {
    transform: translateY(20%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
