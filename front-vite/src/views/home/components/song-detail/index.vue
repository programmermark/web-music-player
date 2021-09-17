<template>
  <div class="w-full h-[calc(100%-50px)] bg-[#f8f8f8]">
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
        <SongLyric v-if="currentSong" :song="currentSong" :lyric="songLyric" />
      </div>
    </div>

    <!-- 歌曲评论 -->
    <!-- 包含该歌曲的歌单 -->
    <!-- 相似歌曲 -->
  </div>
  <MusicPlayer />
</template>

<script lang="ts" setup>
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";
import { ILyricResponse } from "./interface";
import MusicPlayer from "@/views/home/components/player/index.vue";
import RotateCover from "./components/rotate-cover/index.vue";
import SongLyric from "./components/song-lyric/index.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const songLyric = ref("");

/** 当前歌曲 */
const currentSong = computed(() => store.state.player.currentSong);

/** 获取歌曲歌词 */
const getSongLyric = async (id: number) => {
  const lrc = await http<ILyricResponse>(
    { url: `${apis.lyric}?id=${id}` },
    "lrc"
  );
  if (lrc) {
    songLyric.value = lrc.lyric;
  }
};

onMounted(() => {
  const id = route.params.id;
  if (id) {
    getSongLyric(Number(id));
  }
});
</script>

<style lang="scss" scoped></style>
