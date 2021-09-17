<template>
  <div class="w-[400px]">
    <div class="text-gray-700 text-[22px] font-semibold mt-9">
      {{ song.name }}
    </div>
    <div
      class="mt-3 text-sm overflow-ellipsis whitespace-nowrap overflow-hidden"
    >
      {{ song.subName }}
    </div>
    <div class="mt-5 flex">
      <div class="flex text-[13px] text-gray-600 mr-2">
        专辑：<span
          class="
            text-blue-400
            cursor-pointer
            w-24
            overflow-ellipsis
            whitespace-nowrap
            overflow-hidden
          "
          @click="gotoAlbumDetail(song.album?.id)"
          >{{ song.album?.name }}</span
        >
      </div>
      <div class="flex text-[13px] text-gray-600 mr-1">
        歌手：<span
          class="
            text-blue-400
            cursor-pointer
            w-24
            overflow-ellipsis
            whitespace-nowrap
            overflow-hidden
          "
          title="前往歌手详情"
          @click="gotoArtistDetail(song.artists[0].id)"
          >{{ song.artists[0].name }}</span
        >
      </div>
    </div>
    <!-- 歌词滚动 -->
    <el-scrollbar
      class="h-80 w-[380px] mt-6 border-r border-solid border-gray-200"
    >
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { formatLyric } from "@/common/js/util";
import { IPlaySong } from "@/store/modules/interface/player";
import { computed } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const { lyric } = defineProps<{
  song: IPlaySong;
  lyric: string /** 歌曲歌词，为空字符串代表歌曲没有歌词 */;
}>();

const router = useRouter();

/** 格式化后的歌词数组 */
const formatedLyrics = computed(() => formatLyric(lyric));

/** 跳转到歌手详情 */
const gotoArtistDetail = (id: number) => router.push(`/artist/${id}`);

/** 跳转到专辑详情 */
const gotoAlbumDetail = (id: number | undefined) => {
  ElMessage.warning({
    message: "功能开发中，敬请期待！",
    type: "warning",
  });
};
</script>

<style lang="scss" scoped></style>
