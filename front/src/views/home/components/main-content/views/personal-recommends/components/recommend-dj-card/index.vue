<template>
  <div class="recommend-dj-card" @click="gotoDjDetail(id)">
    <div class="wrapper">
      <!-- 封面 -->
      <div class="cover">
        <el-image class="image" :src="`${imgUrl}?param=180y180`" alt="电台封面">
          <template #placeholder>
            <img
              class="no-image"
              src="@/assets/image/no-img.png"
              alt="电台封面"
            />
          </template>
        </el-image>
      </div>
      <!-- title + 歌手名 -->
      <div class="singer-wrapper">
        <div class="recommend-desc">{{ recommendDesc }}</div>
        <div class="singer">{{ singer }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RecommendDjCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    /** 封面图片URL */
    imgUrl: {
      type: String,
      required: true,
    },
    /** 电台推荐文字描述 */
    recommendDesc: {
      type: String,
      required: true,
    },
    /** 歌手名称 */
    singer: {
      type: String,
      required: true,
    },
  },
  setup() {
    const gotoDjDetail = (id: number) => {
      console.log("前往电台详情页面，电台id：" + id);
    };
    return {
      gotoDjDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.recommend-dj-card {
  display: flex;
  width: calc(50% - 10px);
  box-sizing: border-box;
  margin-right: 20px;
  margin-top: -1px;
  padding: 0 10px;
  cursor: pointer;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &:hover {
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  .wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    .cover {
      width: 90px;
      height: 90px;
      margin-right: 20px;
      border-radius: 4px;

      & > .image {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: 1px solid #ededed;
        border-radius: 4px;

        .no-image {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }

        :deep(.el-image__inner) {
          border-radius: 4px;
        }
      }
    }

    .singer-wrapper {
      .recommend-desc {
        font-size: 14px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .singer {
        font-size: 13px;
        color: #999;
      }
    }
  }
}
</style>
