<template>
  <div class="flex-1 mr-14 mb-10">
    <!-- 发表评论 -->
    <div class="mb-10">
      <div class="mb-[10px]">
        <span class="text-base text-gray-800 font-semibold mr-4">听友评论</span>
        <span class="text-[13px] text-gray-600">(已有{{ comments?.total }}条评论)</span>
      </div>
      <div
        class="flex items-center bg-white border border-gray-300 rounded-md h-8 box-border"
        @click="handleShowCommentDialog"
      >
        <div class="flex-1 flex items-center cursor-text">
          <MPIcon
            class="ml-[10px] mr-[6px]"
            :size="18"
            icon="write-comment"
            :scale="1"
            bg-color="none"
            color="#d7d7d7"
          />
          <span class="text-[13px] text-[#d7d7d7]">发表评论</span>
        </div>
        <span class="text-lg text-gray-500 mr-[10px]">@</span>
      </div>
    </div>
    <div>
      <div
        v-loading="isLoading"
        element-loading-text="载入中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255)"
      ></div>
      <div v-show="!isLoading">
        <!-- 精彩评论 -->
        <div
          class="mt-11 mb-10"
          v-if="comments?.hotComments && comments.hotComments.length > 0"
        >
          <div class="text-base text-gray-800 font-semibold">精彩评论</div>
          <template v-for="comment in comments?.hotComments">
            <SingleComment :comment="comment" @submit-comment="handleReplayComment" />
          </template>
        </div>
        <!-- 最新评论 -->
        <div>
          <div class="text-base text-gray-800 font-medium">
            最新评论（{{ comments?.total }}）
          </div>
          <template v-for="comment in comments?.comments">
            <SingleComment :comment="comment" @submit-comment="handleReplayComment" />
          </template>
          <!-- 分页 -->
          <el-pagination
            v-if="comments?.comments && comments?.comments.length > 0"
            class="page-wrapper"
            background
            layout="prev, pager, next"
            :current-page="offset"
            :page-size="limit"
            :total="comments.total"
            @current-change="handlePageChange"
            @prev-click="handlePageChange"
            @next-click="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 评论弹窗 -->
    <CommentDialog
      :song-id="songId"
      :song-name="songName"
      v-model="commentState.showDialog"
      v-model:comment="commentState.comment"
      @submit="handleSubmitComment"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import MPIcon from "@/components/MPIcon.vue";
import { useStore } from "@/store";
import { computed, reactive, ref, toRefs, watch } from "vue";
import { submitSongComment, useSongComments } from "../../hooks/useSongComments";
import SingleComment from "./components/single-comment/index.vue";
import CommentDialog from "./components/comment-dialog/index.vue";
import { SubmitType } from "../../interface/song-comments";

const props = defineProps<{
  songId: number;
  songName: string;
}>();

const store = useStore();

const { songId } = toRefs(props);

const offset = ref(1);
const limit = ref(20);
const commentState = reactive<{
  type: SubmitType;
  showDialog: boolean;
  comment: string;
  beCommentId?: number;
}>({
  type: 1,
  showDialog: false,
  comment: "",
});

const currentSongId = computed(() => store.state.player.currentSong?.id);

const { isLoading, data: comments } = useSongComments(songId, offset, limit);

watch(currentSongId, (nv, ov) => {
  if (nv !== ov) {
    offset.value = 1;
  }
});

const handlePageChange = (page: number) => {
  console.log("page", page);
  offset.value = page;
};

const handleReplayComment = (beCommentId: number) => {
  commentState.type = 2;
  commentState.showDialog = true;
  commentState.comment = "";
  commentState.beCommentId = beCommentId;
};

const handleShowCommentDialog = () => {
  commentState.type = 1;
  commentState.showDialog = true;
  commentState.comment = "";
  commentState.beCommentId = undefined;
};

/** 发表|回复评论 */
const handleSubmitComment = async () => {
  await submitSongComment(
    commentState.type,
    songId.value,
    commentState.comment,
    commentState.beCommentId
  );
  commentState.comment = "";
  ElMessage.success("评论成功");
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  padding: 40px 0 0 0;
  text-align: center;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #d13b31;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled):hover) {
  color: #d13b31;
}
</style>
