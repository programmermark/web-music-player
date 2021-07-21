<template>
  <div class="latest-music-card" @dblclick="handleDbClick">
    <div class="wrapper">
      <!-- 歌曲封面（单击播放） -->
      <div class="cover" @click="playSong">
        <img :src="coverImg" alt="歌曲封面图片" />
        <mp-opt-icon
          class="play-button"
          :size="24"
          icon="play-caret-solid"
          color="#d33a33"
          bgColor="rgba(255,255,255,0.5)"
          display="always"
          @click="playSong"
        />
      </div>
      <!-- 排序｜播放时会显示播放图标 -->
      <div class="order">
        <div class="order-num">{{ order }}</div>
      </div>
      <!-- 歌曲名称、歌手名称 -->
      <div class="name">
        <div class="song-name">
          {{ songName }}
          <span v-show="aliasName">（{{ aliasName }}）</span>
        </div>
        <div class="author-name">{{ artistName }}</div>
      </div>
      <!-- MV图标（有mvId才显示） -->
      <div class="mv-wrapper" v-show="mvId > 0">
        <mp-icon
          icon="mv"
          :size="32"
          color="#d33333"
          bgColor="none"
          @click="playMV"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MPIcon from "@/components/MPIcon.vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { computed, defineComponent, PropType, toRefs } from "vue";
import { IArtist } from "../../interface/latestMusicCard";

export default defineComponent({
  components: { "mp-opt-icon": MPOptIcon, "mp-icon": MPIcon },
  props: {
    /** 记录id或者歌曲id */
    id: {
      type: Number,
      required: true,
    },
    /** 歌曲MV的id，可能为空 */
    mvId: {
      type: Number,
      default: -1,
    },
    /** 排序数字 */
    orderNumber: {
      type: Number,
      required: true,
    },
    /** 封面图片URL */
    coverImg: {
      type: String,
      required: true,
    },
    /** 歌曲名称 */
    songName: {
      type: String,
      required: true,
    },
    /** 歌曲别名 */
    aliasName: {
      type: String,
      default: "",
    },
    /** 作者数组 */
    artists: {
      type: Array as PropType<IArtist[]>,
      required: true,
    },
  },

  setup(props) {
    const { id, mvId, artists, orderNumber, songName, aliasName } =
      toRefs(props);

    /** 格式化歌手名称 */
    const artistName = computed(() => {
      const nameStr = artists.value
        .map((item) => item.name)
        .reduce((initValue, currentValue) => initValue + "/" + currentValue);
      return nameStr;
    });

    /** 格式化排序数字 */
    const order = computed(() => {
      if (orderNumber.value < 10) {
        return `0${orderNumber.value}`;
      }
      return orderNumber.value;
    });

    /** 格式化后的歌曲名称 */
    const formatName = computed(() => {
      let name = songName.value;
      if (aliasName.value) {
        name = `${songName.value}（${aliasName.value}）`;
      }
      return name;
    });

    const playSong = () => {
      console.log("播放歌曲, 歌曲id:", id.value);
    };

    const playMV = () => {
      console.log("播放歌曲MV, 歌曲MV的id:", mvId.value);
    };

    const handleDbClick = () => {
      console.log("双击事件触发");
    };

    return {
      formatName,
      artistName,
      order,
      handleDbClick,
      playSong,
      playMV,
    };
  },
});
</script>

<style lang="scss" scoped>
.latest-music-card {
  width: calc(50% - 10px);
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 10px;
  border-radius: 4px;
  margin-right: 20px;
  box-sizing: border-box;
  cursor: pointer;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &:hover {
    background-color: #f5f5f5;
  }
  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;

    .cover {
      width: 60px;
      height: 60px;
      position: relative;

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      .play-button {
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 12px);
      }
    }

    .order {
      width: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      .order-num {
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #b7b7b7;
      }
      .play-icon {
        color: #d33933;
      }
    }

    .name {
      max-width: calc(100% - 150px);
      .song-name {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 10px;
        display: flex;
        align-items: center;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;

        & > span {
          color: #979797;
        }
      }
      .author-name {
        font-size: 13px;
        color: #666666;
      }
    }

    .mv-wrapper {
      margin-right: 20px;
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
