<template>
  <div>
    <!-- 歌词封面（播放时旋转） -->
    <RotateCover v-if="currentSong" :img="currentSong?.coverImg" />
    <!-- 歌曲信息 -->
    <!-- 歌词组件（词曲作者、歌词） -->

    <!-- 歌曲评论 -->
    <!-- 包含该歌曲的歌单 -->
    <!-- 相似歌曲 -->
  </div>
</template>

<script lang="ts" setup>
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";
import { ILyric } from "./interface";
import RotateCover from "./components/rotate-cover/index.vue";

const store = useStore();

/** 当前歌曲 */
const currentSong = computed(() => store.state.player.currentSong);

/** 获取歌曲歌词 */
const getSongLyric = async (id: number) => {
  const { lyric } = await http<ILyric>({ url: `${apis.lyric}?id=${id}` }, "lrc");
};
</script>

<style lang="scss" scoped></style>
