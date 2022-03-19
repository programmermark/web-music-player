<template>
  <div class="userinfo">
    <MPOptIcon
      v-if="!hasLogged"
      class="icon-reset"
      icon="user-avatar"
      color="#ffffff"
      :size="40"
      bgColor="#e0e0e0"
      scale="60%"
      display="always"
    />
    <img
      v-else-if="userInfo"
      class="avatar"
      :src="`${userInfo.avatarUrl}?param=80y80`"
      alt="用户头像"
    />

    <div v-if="userInfo" class="username">
      {{ hasLogged ? userInfo.nickname : "未登录" }}
    </div>
    <el-popover
      v-if="hasLogged"
      placement="right-start"
      trigger="click"
      width="320px"
      :show-arrow="false"
      popper-class="user-info-box-popover"
    >
      <template #reference>
        <el-icon class="cursor-pointer" color="#8e8e8e"><caret-right /></el-icon>
      </template>
      <UserInfoBox />
    </el-popover>
    <div v-else class="flex items-center" @click.stop="toogleLoginDialog">
      <el-icon class="cursor-pointer" color="#8e8e8e"><caret-right /></el-icon>
    </div>
    <!-- 登录弹窗 -->
    <template v-if="showLoginDialog">
      <LoginBox :visible="showLoginDialog" @change-visible="handleLoginBoxVisible" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import LoginBox from "../login-box/index.vue";
import UserInfoBox from "../userinfo-box/index.vue";
import { useLoginStore } from "@/stores/login";

const loginStore = useLoginStore();

const showLoginDialog = ref(false);
const hasLogged = computed(() => loginStore.hasLogged);
const userInfo = computed(() => loginStore.userInfo);

/** 切换登录弹窗显示与隐藏状态 */
const toogleLoginDialog = () => {
  showLoginDialog.value = !showLoginDialog.value;
};

const handleLoginBoxVisible = (visible: boolean) => {
  showLoginDialog.value = visible;
};
</script>

<style lang="scss" scoped>
.userinfo {
  display: flex;
  align-items: center;
  margin: 10px 0;

  .icon-reset {
    margin: 0 8px;
  }

  .avatar {
    width: 40px;
    margin: 0 8px;
    border-radius: 50%;
  }

  .username {
    color: #333333;
    font-size: 14px;
    margin-right: 8px;
  }
}
</style>
