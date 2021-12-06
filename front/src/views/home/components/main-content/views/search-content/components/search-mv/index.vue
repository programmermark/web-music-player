<template>
  <div class="h-full">
    <el-scrollbar v-if="!loading">
      <div class="w-full">
        <div class="pl-[30px] pr-9">
          <div
            class="
              inline-block
              box-border
              pr-5
              md:w-1/3
              lg:w-1/4
              xl:w-1/5
              mv-item
            "
            v-for="mv in mvs"
            :key="mv.vid"
          >
            <!-- MV封面 -->
            <div class="relative cursor-pointer" @click="gotoMVDetail(mv.vid)">
              <el-image
                class="
                  w-full
                  h-full
                  flex
                  items-center
                  justify-center
                  box-border
                  rounded
                  border border-gray-50
                "
                :src="`${mv.coverUrl}?param=480y270`"
                alt="MV封面"
              >
                <template #placeholder>
                  <img
                    class="w-full h-full"
                    src="@/assets/image/no-img-16x9.png"
                    alt="MV封面"
                  />
                </template>
              </el-image>
              <div
                class="absolute flex items-center top-1 right-2 cursor-pointer"
              >
                <MPOptIcon
                  icon="play-caret"
                  color="#fff"
                  bgColor="none"
                  :size="14"
                  scale="1"
                  display="always"
                />
                <span class="text-[13px] text-white ml-[2px]">{{
                  translatePlayCount(mv.playTime)
                }}</span>
              </div>
              <div class="absolute bottom-1 right-2 text-white text-[13px]">
                {{ transformSecondToMinute(Math.floor(mv.durationms / 1000)) }}
              </div>
            </div>
            <!-- MV名称 -->
            <div
              class="
                flex
                items-center
                mt-1
                text-[13px] text-gray-800
                cursor-pointer
              "
              @click="gotoMVDetail(mv.vid)"
            >
              <MPOptIcon
                class="mr-2"
                v-if="mv.type === 0"
                icon="mv-text"
                :size="20"
                scale="1"
                color="#e03f40"
                display="always"
                bg-color="none"
              />
              <div class="text-ellipsis flex-1" v-html="mv.title"></div>
            </div>
            <!-- MV作者 -->
            <div class="flex items-center mb-10 mt-1 text-xs text-gray-400">
              <span class="mr-1" v-if="mv.type === 1">by</span>
              <div
                class="flex items-center"
                v-for="(creator, index) in mv.creator"
                :key="creator.userId"
                @click="gotoCreatorDetail(creator.userId, mv.type)"
              >
                <span class="text-ellipsis" v-html="creator.userName"></span
                ><span v-if="index + 1 < mv.creator.length" class="px-1"
                  >/</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="flex justify-center mt-6 pb-8" v-show="total > pageSize">
          <el-pagination
            :current-page="currentPage"
            :total="total"
            :page-size="pageSize"
            :pager-count="9"
            background
            layout="prev, pager, next"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
    </el-scrollbar>

    <!-- loading -->
    <div
      class="card-wrapper-loading"
      v-show="loading"
      v-loading="loading"
      element-loading-text="载入中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255)"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { translatePlayCount, transformSecondToMinute } from "@/common/js/util";
import MPOptIcon from "@/components/MPOptIcon.vue";
import { ISearchContentMV } from "../../interface";
import { ElMessage } from "element-plus";
import { gotoMVDetail, gotoArtistDetail } from "@/common/js/router";

const props = withDefaults(
  defineProps<{
    /** 分页条数偏移量 */
    offset: number;
    /** 分页每页条数 */
    pageSize: number;
    /** 分页总条数 */
    total: number;
    /** MV列表 */
    mvs: ISearchContentMV[];
    /** loading状态 */
    loading: boolean;
  }>(),
  {
    loading: false,
  }
);

const emits = defineEmits<{
  (e: "page-change", page: number): void;
}>();

/** 当前页码 */
const currentPage = computed(() => props.offset / props.pageSize + 1);

/** 跳转到MV的创建者页面 */
const gotoCreatorDetail = (userId: number, type: 0 | 1 = 0) => {
  if (type === 0) {
    gotoArtistDetail(userId);
  } else {
    ElMessage.warning({
      message: "用户主页开发中，敬请期待！",
      type: "warning",
    });
  }
};

/** 切换分页 */
const handlePageChange = (page: number) => {
  emits("page-change", (page - 1) * props.pageSize);
};
</script>

<style lang="scss" scoped>
.card-wrapper-loading {
  height: 100%;
  :deep(.el-loading-spinner) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.el-icon-loading) {
    color: #666;
  }

  :deep(.el-loading-text) {
    margin-left: 2px;
    color: #666;
  }
}
</style>
