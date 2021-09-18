<template>
  <div class="w-[400px]">
    <div class="text-gray-700 text-[22px] font-semibold mt-9">
      {{ song.name }}
    </div>
    <div
      v-show="song.subName"
      class="mt-3 text-sm overflow-ellipsis whitespace-nowrap overflow-hidden"
    >
      {{ song.subName }}
    </div>
    <div class="mt-4 flex">
      <div class="flex text-[13px] text-gray-600 mr-2">
        专辑：<span
          class="text-blue-400 cursor-pointer w-24 overflow-ellipsis whitespace-nowrap overflow-hidden"
          @click="gotoAlbumDetail(song.album?.id)"
          >{{ song.album?.name }}</span
        >
      </div>
      <div class="flex text-[13px] text-gray-600 mr-1">
        歌手：<span
          class="text-blue-400 cursor-pointer w-24 overflow-ellipsis whitespace-nowrap overflow-hidden"
          title="前往歌手详情"
          @click="gotoArtistDetail(song.artists[0].id)"
          >{{ song.artists[0].name }}</span
        >
      </div>
    </div>
    <!-- 歌词滚动 -->

    <el-scrollbar
      ref="scrollBarRef"
      class="h-80 w-[380px] mt-6 border-r border-solid border-gray-200"
    >
      <div class="cursor-pointer" v-if="formatedLyrics && formatedLyrics.length > 0">
        <div
          v-for="(lyric, index) in formatedLyrics"
          :key="index"
          class="lyric-item text-sm text-gray-600 bg-opacity-5"
          :class="lyricClass(lyric.text, index)"
        >
          {{ lyric.text }}
        </div>
      </div>
      <div v-else class="flex items-center justify-center h-full text-sm text-gray-800">
        纯音乐，请您欣赏
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { formatLyric } from "@/common/js/util";
import { useStore } from "@/store";
import { IPlaySong } from "@/store/modules/interface/player";
import { computed } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  song: IPlaySong;
  lyric: string /** 歌曲歌词，为空字符串代表歌曲没有歌词 */;
}>();

const router = useRouter();
const store = useStore();

/** 滚动条ref */
const scrollBarRef = ref();
/** 当前播放的歌词的索引 */
const currentLyricIndex = ref(0);

/** 格式化后的歌词数组 */
const formatedLyrics = computed(() => formatLyric(props.lyric));
/** 歌曲当前播放时间 */

const lyricClass = (text: string, index: number) => {
  return {
    "pb-5": text.includes("作词") || text.includes("作曲") || index % 2 === 0,
    "text-[16px] text-gray-900 font-medium":
      currentLyricIndex.value === index - 1 &&
      !text.includes("作词") &&
      !text.includes("作曲"),
  };
};

/** 跳转到歌手详情 */
const gotoArtistDetail = (id: number) => router.push(`/artist/${id}`);

/** 跳转到专辑详情 */
const gotoAlbumDetail = (id: number | undefined) => {
  ElMessage.warning({
    message: "功能开发中，敬请期待！",
    type: "warning",
  });
};

watch(
  () => store.state.player.currentTime,
  (newTime, oldTime) => {
    if (newTime !== oldTime) {
      /** 获取比当前播放时间大的第一个元素 */
      for (let i = 0; i < formatedLyrics.value.length; i++) {
        if (
          Math.floor(formatedLyrics.value[i].time) ===
          Math.floor(store.state.player.currentTime)
        ) {
          currentLyricIndex.value = i - 1;
          break;
        } else if (
          Math.floor(formatedLyrics.value[i].time) >
          Math.floor(store.state.player.currentTime)
        ) {
          currentLyricIndex.value = i - 2;
          break;
        }
      }
      let height = 0;
      if (currentLyricIndex.value !== 0) {
        const lyricEles = document.querySelectorAll(".lyric-item");
        lyricEles.forEach((ele, index) => {
          if (currentLyricIndex.value >= index) {
            height += ele.clientHeight;
          }
        });
        if (height >= 160) {
          scrollBarRef.value?.setScrollTop(height - 160 + 20);
        }
      }
    }
  }
);
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
