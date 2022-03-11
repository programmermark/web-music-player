<template>
  <el-scrollbar class="main-content">
    <div class="mv-detail">
      <!-- MV详情 -->
      <div class="detail-wrapper">
        <!-- 视频详情 -->
        <div class="router-wrapper" @click="gotBack">
          <MPIcon icon="arrow-left" color="#666" bg-color="none" :size="16" :scale="1" />
          <span class="text">视频详情</span>
        </div>
        <!-- MV 播放器 -->
        <MPVideoPlayer v-if="videoUrl" :src="videoUrl" />
        <!-- MV详细信息 -->
        <div class="detail-info" v-if="videoDetail">
          <div class="artist">
            <img
              v-if="mvDetailFirstArtist && mvDetailFirstArtist.avatarUrl"
              class="avatar"
              :src="`${mvDetailFirstArtist.avatarUrl}?param=100y100`"
              alt="头像"
              @click="mvDetailFirstArtist && gotoArtistDetail(mvDetailFirstArtist.userId)"
            />
            <img
              v-if="mvDetailFirstArtist && !mvDetailFirstArtist.avatarUrl"
              class="avatar"
              src="@/assets/image/no-img.png"
              alt="头像"
              @click="mvDetailFirstArtist && gotoArtistDetail(mvDetailFirstArtist.userId)"
            />
            <div class="artist-wrapper" v-if="mvDetailArtist">
              <div
                class="artist-text"
                v-for="(artist, index) in mvDetailArtist"
                :key="artist.userId"
              >
                <span class="name" @click="gotoArtistDetail(artist.userId)">{{
                  artist.nickname
                }}</span>
                <span v-if="index + 1 < mvDetailArtist.length" class="part-line">/</span>
              </div>
            </div>
          </div>
          <div class="title-wrapper">
            <div class="title">{{ videoDetail.title }}</div>
            <i
              :class="[
                !mvDetailState.showMVDesc ? 'el-icon-caret-bottom' : 'el-icon-caret-top',
              ]"
              class="icon-reset"
              @click="toggleShowMVDesc"
            ></i>
          </div>

          <div class="other-info">
            <div class="item">发布：{{ videoDetail.publishTime }}</div>
            <div class="item">
              播放：{{ translatePlayCount(videoDetail.playTime || 0) }}次
            </div>
          </div>
          <div class="desc" v-show="mvDetailState.showMVDesc">
            {{ videoDetail.description }}
          </div>
        </div>
      </div>
      <!-- 相关推荐 -->
      <div class="recommend-mvs">
        <div class="text-base font-bold mb-4">相关推荐</div>
        <template v-if="relatedVideoList && relatedVideoList.length > 0">
          <RecommendCard v-for="mv in relatedVideoList" :key="mv.vid" :mv="mv" />
        </template>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { translatePlayCount } from "@/common/js/util";
import MPIcon from "@/components/MPIcon.vue";
import MPVideoPlayer from "@/components/MPVideoPlayer.vue";
import RecommendCard from "./components/recommend-card/index.vue";
import type { IMVDetailState, IMVInfo } from "./interface";
import { gotoArtistDetail } from "@/common/js/router";
import { useVideoDetail, useVideoInfo, useVideoUrl } from "./hooks/useVideoDetail";
import { useRelatedVideo } from "./hooks/useSimilarVideo";

const router = useRouter();
const route = useRoute();

/** 视频id */
const videoId = ref(route.params.id as string | number);

/** 视频类型 */
const videoType = computed(() => {
  if (!isNaN(Number(videoId.value))) {
    return 1;
  } else {
    return 2;
  }
});

/** 视频详情 */
const { data: videoDetail } = useVideoDetail(videoId, videoType);
/** MV详情信息 */
const { data: videoInfo } = useVideoInfo(videoId);

/** 相似视频 */
const { data: relatedVideoList } = useRelatedVideo(videoId, videoType);
/** 视频url */
const { data: videoUrl } = useVideoUrl(videoId, videoType);

/** 视频统计补充信息 */
const MVDetailInfo = computed(() => {
  if (videoType.value === 1) {
    return videoInfo.value;
  } else {
    return {
      shareCount: videoDetail.value?.shareCount,
      commentCount: videoDetail.value?.commentCount,
    } as IMVInfo;
  }
});

const mvDetailState = reactive<IMVDetailState>({
  mvDetail: undefined,
  mvUrl: undefined,
  showMVDesc: false,
});

/** MV详情艺术家 */
const mvDetailArtist = computed(() => videoDetail.value?.creators);

/** MV详情艺术家 */
const mvDetailFirstArtist = computed(() => {
  if (videoDetail.value && videoDetail.value.creators) {
    return videoDetail.value.creators[0];
  }
  return undefined;
});

/** 路由回退到上一页 */
const gotBack = () => router.go(-1);

/** 切换显示MV详细描述 */
const toggleShowMVDesc = () => {
  mvDetailState.showMVDesc = !mvDetailState.showMVDesc;
};

onBeforeRouteUpdate(() => {
  videoId.value = route.params.id as string | number;
});
</script>

<style lang="scss" scoped>
.main-content {
  height: calc(100% - 60px);
  flex: 1;
  padding: 0;
  :deep(.el-scrollbar__view) {
    display: flex;
    justify-content: center;
    height: 100%;
  }
}
.mv-detail {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .detail-wrapper {
    width: 640px;
    margin-right: 30px;
    .router-wrapper {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 16px;
      .text {
        margin-left: 10px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .detail-info {
      .artist {
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 30px;

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 25px;
          margin-right: 10px;
        }

        .artist-wrapper {
          display: flex;
          align-items: center;
          .artist-text {
            color: #666;
            .name {
              cursor: pointer;
            }
            .part-line {
              padding: 0 2px;
            }
          }
        }
      }

      .title-wrapper {
        padding-bottom: 16px;
        color: #333;
        .title {
          width: 100%;
          font-size: 22px;
        }
        .icon-reset {
          font-size: 24px;
          margin-left: 8px;
          cursor: pointer;
        }
      }

      .other-info {
        display: flex;
        align-items: center;
        padding-bottom: 16px;
        .item {
          margin-right: 20px;
          font-size: 13px;
          color: #bfbfbf;
        }
      }

      .desc {
        font-size: 13px;
        color: #333;
        line-height: 1.5;
        padding-bottom: 32px;
      }
    }
  }

  .recommend-mvs {
    width: 280px;
  }
}
</style>
