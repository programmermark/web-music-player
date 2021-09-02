<template>
  <div class="created-playlist">
    <div class="collapse" @click="toggleCollapse">
      <i
        :class="hasCollapsed ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"
        class="icon-reset"
      />
      <span>收藏的歌单</span>
    </div>
    <!-- 歌单列表 -->
    <div class="all-playlist" v-show="hasCollapsed">
      <div class="playlist" v-for="playlist in playlists" :key="playlist.id">
        <div class="content-left" @click="handlePlayListClick(playlist.id)">
          <mp-icon
            icon="music-list"
            color="#494949"
            :size="16"
            :scale="1"
            bgColor="none"
          />
          <span class="text" :title="playlist.name">{{ playlist.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MPIcon from "@/components/MPIcon.vue";
import { IPlaylist } from "@/store/modules/interface/playlist";
import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { "mp-icon": MPIcon },
  name: "CollectedPlayList",
  props: {
    /** 歌单 */
    playlists: {
      type: Array as PropType<IPlaylist[]>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const hasCollapsed = ref(false);

    const toggleCollapse = () => {
      hasCollapsed.value = !hasCollapsed.value;
    };

    const handlePlayListClick = (playlistId: number) => {
      router.push({ name: "PlaylistDetail", params: { id: playlistId } });
    };

    return {
      hasCollapsed,
      toggleCollapse,
      handlePlayListClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.created-playlist {
  margin-bottom: 30px;
  .collapse {
    padding: 16px 0 10px 4px;
    color: #888;
    font-size: 12px;
    cursor: pointer;
    .icon-reset {
      color: #bdbdbd;
    }
  }

  .all-playlist {
    .liked-playlist,
    .playlist {
      display: flex;
      align-items: center;
      height: 36px;
      margin-right: 8px;
      padding-left: 18px;
      cursor: pointer;
      &:hover {
        background-color: #e5e5e5;
      }
      .content-left {
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        .text {
          flex: 1;
          font-size: 13px;
          color: #333333;
          margin-left: 8px;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: break-all;
        }
      }
      .icon-reset {
        margin-right: 10px;
      }
    }
  }
}
</style>
