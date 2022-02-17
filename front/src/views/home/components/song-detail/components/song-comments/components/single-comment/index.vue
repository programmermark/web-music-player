<template>
  <div class="pt-5">
    <!-- 评论用户头像 -->
    <div class="flex">
      <div class="w-10 h-10 rounded-full overflow-hidden">
        <img
          class="w-full h-full object-cover"
          :src="comment.user.avatarUrl"
          alt="评论用户头像"
        />
      </div>
      <div class="ml-3 pb-5 flex-1 border-b border-gray-200">
        <div class="mb-2">
          <span class="text-sm text-blue-400">{{ comment.user.nickname }}：</span>
          <span class="text-sm text-gray-500">{{ comment.content }}</span>
        </div>
        <div class="flex items-center">
          <span class="flex-1 text-xs text-gray-500">{{
            formatDateToTextInCommentCase(comment.time, true)
          }}</span>
          <div class="flex items-center">
            <div class="flex items-center pr-3 border-r border-gray-300 cursor-pointer">
              <MPIcon
                v-if="!comment.liked"
                icon="zan"
                :size="14"
                :scale="1"
                bg-color="none"
                color="#8c8c8c"
              />
              <MPIcon
                v-else
                icon="zan"
                :size="14"
                :scale="1"
                bg-color="#f1f5fa"
                color="#db3532"
              />
              <span class="ml-1 text-xs text-[#8c8c8c]">{{ comment.likedCount }}</span>
            </div>
            <div class="px-3 flex items-center" @click="handleComment(comment.commentId)">
              <MPIcon
                icon="comment"
                :size="14"
                :scale="1"
                bg-color="none"
                color="#8c8c8c"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 单条评论组件 -->
<script lang="ts" setup>
import { ISongComment } from "../../../../interface/song-comments";
import { formatDateToTextInCommentCase } from "@/common/js/util";
import MPIcon from "@/components/MPIcon.vue";

defineProps<{ comment: ISongComment }>();

const emit = defineEmits<{
  (event: "submit-comment", commentId: number): void;
}>();

const handleComment = (commentId: number) => {
  emit("submit-comment", commentId);
};
</script>

<style lang="scss" scoped></style>
