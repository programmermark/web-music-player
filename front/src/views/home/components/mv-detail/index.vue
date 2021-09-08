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
        <MPVideoPlayer v-if="mvDetailState.mvUrl" :src="mvDetailState.mvUrl.url" />
        <!-- MV详细信息 -->
        <div class="detail-info" v-if="mvDetailState.mvDetail">
          <div class="artist">
            <img
              v-if="mvDetailFirstArtist"
              class="avatar"
              :src="`${mvDetailFirstArtist.img1v1Url}?param=100y100`"
              alt="头像"
              @click="mvDetailFirstArtist && gotoArtistDetail(mvDetailFirstArtist.id)"
            />
            <div class="artist-wrapper" v-if="mvDetailArtist">
              <div
                class="artist-text"
                v-for="(artist, index) in mvDetailArtist"
                :key="artist.id"
              >
                <span class="name" @click="gotoArtistDetail(artist.id)">{{
                  artist.name
                }}</span>
                <span v-if="index + 1 < mvDetailArtist.length" class="part-line">/</span>
              </div>
            </div>
          </div>
          <div class="title-wrapper">
            <div class="title">{{ mvDetailState.mvDetail.name }}</div>
            <i
              :class="[
                !mvDetailState.showMVDesc ? 'el-icon-caret-bottom' : 'el-icon-caret-top',
              ]"
              class="icon-reset"
              @click="toggleShowMVDesc"
            ></i>
          </div>

          <div class="other-info">
            <div class="item">发布：{{ mvDetailState.mvDetail.publishTime }}</div>
            <div class="item">
              播放：{{ translatePlayCount(mvDetailState.mvDetail.playCount) }}次
            </div>
          </div>
          <div class="desc" v-show="mvDetailState.showMVDesc">
            {{ mvDetailState.mvDetail.desc }}
          </div>
        </div>
      </div>
      <!-- 相关推荐 -->
      <div class="recommend-mvs"></div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { translatePlayCount } from "@/common/js/util";
import MPIcon from "@/components/MPIcon.vue";
import MPVideoPlayer from "@/components/MPVideoPlayer.vue";
import { IMVDetail, IMVDetailState, IMVUrl } from "./interface";

const router = useRouter();
const route = useRoute();

const mvDetailState = reactive<IMVDetailState>({
  mvDetail: undefined,
  mvUrl: undefined,
  showMVDesc: false,
});

/** MV详情艺术家 */
const mvDetailArtist = computed(() => mvDetailState.mvDetail?.artists);

/** MV详情艺术家 */
const mvDetailFirstArtist = computed(() => mvDetailState.mvDetail?.artists[0]);

/**
 * 获取MV视频地址
 */
const getMVRealAddress = async (id: number) => {
  const data = await http<IMVUrl>({ url: `${apis.mvUrl}?id=${id}` }, "data");
  const mvUrl: IMVUrl = {
    id: data.id,
    url: data.url,
  };
  mvDetailState.mvUrl = mvUrl;
};

/**
 * 获取MV详情
 */
const getMVDetail = async (id: number) => {
  const data = await http<IMVDetail>({ url: `${apis.mvDetail}?mvid=${id}` }, "data");
  const mvDetail: IMVDetail = {
    id: data.id,
    name: data.name,
    playCount: data.playCount,
    publishTime: data.publishTime,
    duration: data.duration,
    cover: data.cover,
    artists: data.artists,
    desc: data.desc,
    brs: data.brs,
  };
  mvDetailState.mvDetail = mvDetail;
};

/** 路由回退到上一页 */
const gotBack = () => router.go(-1);

/** 跳转到歌手详情 */
const gotoArtistDetail = (id: number) => router.push(`/artist/${id}`);

/** 切换显示MV详细描述 */
const toggleShowMVDesc = () => {
  mvDetailState.showMVDesc = !mvDetailState.showMVDesc;
};

onMounted(() => {
  const id = route.params.id;
  if (id) {
    getMVRealAddress(Number(route.params.id));
    getMVDetail(Number(route.params.id));
  }
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
        size: 18px;
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
