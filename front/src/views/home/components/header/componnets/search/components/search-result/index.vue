<template>
  <div class="w-[356px]">
    <div
      class="px-2 py-2 mb-1 text-gray-500 flex items-center cursor-pointer"
      @click="gotoSearchContent(keywords)"
    >
      搜“<span class="text-blue-500 cursor-pointer">{{ keywords }}</span
      >”相关的结果<MPOptIcon
        class="ml-1"
        icon="arrow-right"
        :size="12"
        color="#666666"
        scale="1"
        display="always"
      />
    </div>
    <!-- 单曲 -->
    <div class="py-2" v-if="state.songs && state.songs.length > 0">
      <div
        class="px-2 text-gray-400 text-sm cursor-pointer mb-3"
        @click="gotoSearchContent(keywords)"
      >
        <MPOptIcon
          class="mr-2"
          icon="music"
          :size="14"
          color="#999999"
          scale="1"
          display="always"
        />单曲
      </div>
      <div
        class="
          pl-7
          pr-2
          py-2
          text-sm
          cursor-pointer
          text-gray-700 text-ellipsis
          hover:bg-gray-100
        "
        v-for="song in state.songs"
        :key="song.id"
        @click="playSong(song.id)"
      >
        <span v-html="song.name"></span> -
        {{ song.artists[0].name }}
      </div>
    </div>
    <!-- 歌手 -->
    <div class="py-2" v-if="state.artists && state.artists.length > 0">
      <div
        class="px-2 text-gray-400 text-sm cursor-pointer mb-3"
        @click="gotoSearchContent(keywords)"
      >
        <MPOptIcon
          class="mr-2"
          icon="user-avatar"
          :size="14"
          color="#999999"
          scale="1"
          display="always"
        />歌手
      </div>
      <div
        class="
          pl-7
          pr-2
          py-2
          text-sm
          cursor-pointer
          text-gray-700 text-ellipsis
          hover:bg-gray-100
        "
        v-for="artist in state.artists"
        :key="artist.id"
        @click="gotoArtistDetail(artist.id)"
      >
        <span v-html="artist.name"></span>
      </div>
    </div>
    <!-- 专辑 -->
    <div class="py-2" v-if="state.albums && state.albums.length > 0">
      <div
        class="px-2 text-gray-400 text-sm cursor-pointer mb-3"
        @click="gotoSearchContent(keywords)"
      >
        <MPOptIcon
          class="mr-2"
          icon="album"
          :size="14"
          color="#999999"
          scale="1"
          display="always"
        />专辑
      </div>
      <div
        class="
          pl-7
          pr-2
          py-2
          text-sm
          cursor-pointer
          text-gray-700 text-ellipsis
          hover:bg-gray-100
        "
        v-for="album in state.albums"
        :key="album.id"
        @click="gotoAlbumDetail(album.id)"
      >
        <span v-html="album.name"></span> -
        {{ album.artist.name }}
      </div>
    </div>
    <!-- 歌单 -->
    <div class="py-2" v-if="state.playlists && state.playlists.length > 0">
      <div
        class="px-2 text-gray-400 text-sm cursor-pointer mb-3"
        @click="gotoSearchContent(keywords)"
      >
        <MPOptIcon
          class="mr-2"
          icon="playlist"
          :size="14"
          color="#999999"
          scale="1"
          display="always"
        />歌单
      </div>
      <div
        class="
          pl-7
          pr-2
          py-2
          text-sm
          cursor-pointer
          text-gray-700 text-ellipsis
          hover:bg-gray-100
        "
        v-for="playlist in state.playlists"
        :key="playlist.id"
        @click="gotoPlaylistDetail(playlist.id)"
      >
        <span v-html="playlist.name"></span>
      </div>
    </div>
  </div>
</template>

<!-- 关键词搜索结果 -->
<script lang="ts" setup>
import { onMounted, reactive, watch } from "vue";
import debounce from "lodash/debounce";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { useStore } from "@/store";
import { ISearchSuggest } from "../../interface/search-result";
import { highLightKeywords } from "@/common/js/util";
import { useRouter } from "vue-router";

const props = defineProps<{
  keywords: string;
}>();

const store = useStore();
const router = useRouter();

const state = reactive<ISearchSuggest>({
  albums: [],
  artists: [],
  playlists: [],
  songs: [],
});

/**
 * 获取搜索建议
 */
const fetchSearchSuggest = async (keywords: string) => {
  const { albums, artists, playlists, songs } = await http<ISearchSuggest>(
    {
      url: `${apis.searchSuggest}?keywords=${keywords}`,
    },
    "result"
  );
  /** 格式化接口，裁剪字段 */
  if (albums && albums.length > 0) {
    state.albums = albums.map((album) => ({
      id: album.id,
      name: highLightKeywords(props.keywords, album.name, "text-blue-500"),
      artist: {
        id: album.artist.id,
        name: album.artist.name,
      },
    }));
  }
  if (artists && artists.length > 0) {
    state.artists = artists.map((artist) => ({
      id: artist.id,
      name: highLightKeywords(props.keywords, artist.name, "text-blue-500"),
    }));
  }
  if (songs && songs.length > 0) {
    state.songs = songs.map((song) => ({
      id: song.id,
      name: highLightKeywords(props.keywords, song.name, "text-blue-500"),
      artists: song.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
      })),
    }));
  }
  if (playlists && playlists.length > 0) {
    state.playlists = playlists.map((playlist) => ({
      id: playlist.id,
      name: highLightKeywords(props.keywords, playlist.name, "text-blue-500"),
    }));
  }
};

/** 播放歌曲 */
const playSong = (id: number) => {
  store.dispatch("player/setCurrentSong", id);
};

/** 跳转到歌手详情页面 */
const gotoArtistDetail = (id: number) => {
  router.push(`/artist/${id}`);
};

/** 跳转到专辑详情页面 */
const gotoAlbumDetail = (id: number) => {
  router.push(`/albumDetail/${id}`);
};

/** 跳转到歌单详情页面 */
const gotoPlaylistDetail = (id: number) => {
  router.push(`/playlistDetail/${id}`);
};

/** 跳转到搜索结果页面 */
const gotoSearchContent = (keywords: string) => {
  router.push(`/search-content/${keywords}`);
};

watch(
  () => props.keywords,
  async (nv, ov) => {
    if (nv !== ov && nv) {
      debounce(() => fetchSearchSuggest(nv), 400)();
    }
  }
);

onMounted(() => {
  if (props.keywords) {
    fetchSearchSuggest(props.keywords);
  }
});
</script>

<style lang="scss" scoped></style>
