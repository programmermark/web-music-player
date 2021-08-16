<template>
  <div class="latest-albums">
    <div class="header">
      <div class="tab-wrapper">
        <div
          class="tab-item"
          :class="[currentTab === tab.value && 'active']"
          v-for="tab in tabs"
          :key="tab.value"
          @click="toggleTab(tab.value)"
        >
          {{ tab.label }}
        </div>
      </div>
      <div class="flex-wrapper">
        <div class="operate-wrapper">
          <div
            class="operate-item"
            :class="[currentType === type.value && 'active']"
            v-for="type in types"
            :key="type.value"
            @click="toggleType(type.value)"
          >
            <span class="text">{{ type.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="date">
        <span class="month">{{ formatMonth(new Date().getMonth() + 1) }}</span>
        <span class="year">{{ formatMonth(new Date().getFullYear()) }}</span>
      </div>
      <div class="albums">
        <div class="album-item" v-for="album in currentAlbums" :key="album.id">
          <div class="wrapper">
            <el-image
              class="image"
              :src="album.picUrl"
              alt="专辑封面"
              @click="gotoAlbumDetail(album.id)"
            >
              <template #placeholder>
                <img
                  class="image"
                  src="@/assets/image/no-img.png"
                  alt="专辑封面"
                  @click="gotoArtistDetail(album.id)"
                />
              </template>
            </el-image>
            <div class="name text-ellipsis-2">{{ album.name }}</div>
            <div class="artist text-ellipsis">
              {{ formatArtistListToString(album.artists) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { useStore } from "@/store";
import { IAlbumsPayload } from "@/store/modules/interface/latest-music";
import { ITabsState } from "../../interface/latest-albums";
import { formatMonth, formatArtistListToString } from "@/common/js/util";

export default defineComponent({
  name: "LatestAlbums",
  setup() {
    const store = useStore();

    const tabsState = reactive<ITabsState>({
      currentTab: "ALL",
      tabs: [
        { label: "全部", value: "ALL" },
        { label: "华语", value: "ZH" },
        { label: "欧美", value: "EA" },
        { label: "日本", value: "KR" },
        { label: "韩国", value: "JP" },
      ],
      currentType: "hot",
      types: [
        { label: "推荐", value: "hot" },
        { label: "全部", value: "new" },
      ],
      currentAlbumId: undefined,
      limit: 30,
      offset: 0,
    });

    const currentTab = computed(() => tabsState.currentTab);
    const currentType = computed(() => tabsState.currentType);
    const limit = computed(() => tabsState.limit);

    /** 新歌速递(全部) */
    const allAlbums = computed(() => store.state.latestMusic.allAlbums);
    /** 新歌速递(华语) */
    const chineseAlbums = computed(() => store.state.latestMusic.chineseAlbums);
    /** 新歌速递(欧美) */
    const europeAndAmericaAlbums = computed(
      () => store.state.latestMusic.europeAndAmericaAlbums
    );
    /** 新歌速递(韩国) */
    const koreaAlbums = computed(() => store.state.latestMusic.koreaAlbums);
    /** 新歌速递(日本) */
    const japaneseAlbums = computed(
      () => store.state.latestMusic.japaneseAlbums
    );

    /** 当前专辑 */
    const currentAlbums = computed(() => {
      const { currentTab, tabs } = toRefs(tabsState);
      if (currentTab.value === tabs.value[0].value) {
        return allAlbums.value;
      } else if (currentTab.value === tabs.value[1].value) {
        return chineseAlbums.value;
      } else if (currentTab.value === tabs.value[2].value) {
        return europeAndAmericaAlbums.value;
      } else if (currentTab.value === tabs.value[3].value) {
        return koreaAlbums.value;
      } else if (currentTab.value === tabs.value[4].value) {
        return japaneseAlbums.value;
      }
      return allAlbums.value;
    });

    /**
     * 切换tab
     */
    const toggleTab = (value: string) => {
      if (value !== tabsState.currentTab) {
        tabsState.currentTab = value;
      }
    };

    /**
     * 切换type
     */
    const toggleType = (value: string) => {
      if (value !== tabsState.currentType) {
        tabsState.currentType = value;
      }
    };

    /** 获取专辑 */
    const fetchAlbums = (payload: IAlbumsPayload) => {
      store.dispatch("latestMusic/setAlbumsByType", payload);
    };

    /** 前往专辑id */
    const gotoAlbumDetail = (id: number) => {
      console.log("专辑id", id);
    };

    watch(
      [currentTab, currentType],
      ([currentTab, currentType], [oldCurrentTab, oldCurrentType]) => {
        /** 如果当前tab的歌曲列表有数据则不再请求，使用缓存的数据（最新歌曲数据短时间不会变化） */
        if (
          currentTab === tabsState.tabs[0].value &&
          allAlbums.value.length > 0 &&
          currentType === oldCurrentType
        ) {
          return;
        } else if (
          currentTab === tabsState.tabs[1].value &&
          chineseAlbums.value.length > 0 &&
          currentType === oldCurrentType
        ) {
          return;
        } else if (
          currentTab === tabsState.tabs[2].value &&
          europeAndAmericaAlbums.value.length > 0 &&
          currentType === oldCurrentType
        ) {
          return;
        } else if (
          currentTab === tabsState.tabs[3].value &&
          koreaAlbums.value.length > 0 &&
          currentType === oldCurrentType
        ) {
          return;
        } else if (
          currentTab === tabsState.tabs[4].value &&
          japaneseAlbums.value.length > 0 &&
          currentType === oldCurrentType
        ) {
          return;
        }
        const payload: IAlbumsPayload = {
          offset: 0,
          limit: limit.value,
          area: currentTab,
          type: currentType,
        };
        fetchAlbums(payload);
      }
    );

    onMounted(() => {
      const payload: IAlbumsPayload = {
        offset: tabsState.offset,
        limit: tabsState.limit,
        area: tabsState.currentTab,
        type: tabsState.currentType,
      };
      fetchAlbums(payload);
    });

    return {
      ...toRefs(tabsState),
      currentAlbums,
      formatMonth,
      formatArtistListToString,
      toggleTab,
      toggleType,
      gotoAlbumDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.latest-albums {
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tab-wrapper {
      display: inline-flex;
      .tab-item {
        font-size: 14px;
        color: #666;
        margin-right: 28px;
        cursor: pointer;
      }
      .active {
        color: #000;
        font-weight: bold;
      }
    }
    .flex-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      .operate-wrapper {
        display: flex;
        align-items: center;
        .operate-item {
          font-size: 13px;
          padding: 0 10px;
          color: #666;
          border-right: 1px solid #eee;

          &:last-child {
            border-right: none;
          }
          & > .text {
            display: block;
            padding: 5px 12px;
            font-size: 13px;
            border-radius: 12px;
            cursor: pointer;
          }
        }
        .active {
          .text {
            background-color: #fef5f5;
            color: #d33a31;
          }
        }
      }
    }
  }

  .content {
    display: flex;
    .date {
      width: 56px;
      display: flex;
      flex-direction: column;
      font-weight: bold;
      color: #333;
      .month {
        font-size: 20px;
      }
      .year {
        font-size: 12px;
      }
    }
    .albums {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 56px);
      .album-item {
        width: 20%;
        box-sizing: border-box;
        &:nth-child(5n) {
          .wrapper {
            margin-right: 0;
          }
        }

        .wrapper {
          margin-right: calc(100% - 140px);
        }

        .image {
          width: 140px;
          height: 140px;
          border-radius: 8px;
          border: 1px solid #efefef;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
