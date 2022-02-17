<template>
  <el-dialog
    :modelValue="modelValue"
    center
    :title="`歌曲：${songName}`"
    :width="470"
    @open="handleOpen"
    @close="handleClose"
  >
    <div>
      <el-input
        :modelValue="comment"
        type="textarea"
        :rows="4"
        placeholder="发表评论"
        :autosize="{ minRows: 4, maxRows: 4 }"
        :maxlength="140"
        show-word-limit
        @input="handleInput"
      />

      <div class="flex flex-row-reverse mt-6">
        <el-button
          type="primary"
          size="small"
          :disabled="!comment.length"
          @click="handleSubmit"
          >评论</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<!-- 评论弹窗 -->
<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue?: boolean;
    comment: string;
    songId: number;
    songName: string;
  }>(),
  {
    modelValue: false,
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
  (event: "update:comment", value: string): void;
  (event: "submit"): void;
}>();

/** 打开弹窗 */
const handleOpen = () => {
  emit("update:modelValue", true);
};

/** 关闭弹窗 */
const handleClose = () => {
  emit("update:modelValue", false);
};

/** 更新输入内容 */
const handleInput = (value: string) => {
  emit("update:comment", value);
};

/** 发表评论 */
const handleSubmit = () => {
  emit("submit");
  handleClose();
};
</script>

<style lang="scss" scoped></style>
