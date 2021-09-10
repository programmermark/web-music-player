<template>
  <div class="broadcast-card">
    <div
      class="cover-wrapper"
      title="点击前往播放MV页面"
      @click="gotoMVDetail(broadcast.id)"
    >
      <el-image
        class="image"
        :src="`${broadcast.picUrl}?param=540y200`"
        alt="MV封面"
      >
        <template #placeholder>
          <img
            class="no-image"
            src="@/assets/image/no-img-27x10.png"
            alt="MV封面"
          />
        </template>
      </el-image>

      <div class="icon">
        <MPIcon icon="play-caret" color="#fff" bgColor="none" />
      </div>
    </div>
    <div
      class="name text-ellipsis-2"
      title="点击前往播放MV页面"
      @click="gotoMVDetail(broadcast.id)"
    >
      {{ broadcast.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IExclusiveBroadcast } from "@/store/modules/interface/exclusive-broadcast";
import MPIcon from "@/components/MPIcon.vue";
import { useRouter } from "vue-router";

defineProps<{ broadcast: IExclusiveBroadcast }>();

const router = useRouter();

/** 跳转到MV详情 */
const gotoMVDetail = (id: number) => {
  router.push(`/mv/${id}`);
};
</script>

<style lang="scss" scoped>
.broadcast-card {
  display: inline-block;
  width: calc(25% - 15px);
  padding-bottom: 40px;
  padding-right: 20px;

  &:nth-child(4n) {
    padding-right: 0;
  }

  .cover-wrapper {
    position: relative;
    margin-bottom: 8px;
    cursor: pointer;
    & > .image {
      width: 100%;
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

    .icon {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      padding: 4px;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        border-radius: 50%;
        background-color: #000;
        border: 1px solid #efefef;
        opacity: 0.5;
        z-index: -1;
      }
    }
  }
  .name {
    font-size: 14px;
    color: #333;
    height: 40px;
    line-height: 20px;
    cursor: pointer;
  }
}

@media screen and (max-width: 1064px) {
  .broadcast-card {
    width: calc(50% - 10px);
    &:nth-child(2n) {
      padding-right: 0;
    }
  }
}
</style>
