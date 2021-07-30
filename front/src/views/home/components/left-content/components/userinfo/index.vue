<template>
  <div class="userinfo">
    <mp-opt-icon
      v-if="!hasLogged"
      class="icon-reset"
      icon="user-avatar"
      color="#ffffff"
      :size="40"
      bgColor="#e0e0e0"
      scale="60%"
      display="always"
    />
    <img v-else class="avatar" :src="userInfo.avatarUrl" alt="用户头像" />

    <div class="username">{{ hasLogged ? userInfo.nickname : "未登录" }}</div>
    <el-popover v-if="hasLogged" placement="right" trigger="click">
      <template #reference>
        <i class="el-icon-caret-right operate-icon"></i>
      </template>
    </el-popover>
    <div v-else class="operate" @click.stop="toogleLoginDialog">
      <i class="el-icon-caret-right operate-icon"></i>
    </div>
    <!-- 登录弹窗 -->
    <template v-if="showLoginDialog">
      <login-box
        :visible="showLoginDialog"
        @change-visible="handleLoginBoxVisible"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import MPOptIcon from "@/components/MPOptIcon.vue";
import LoginBox from "../login-box/index.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "UserInfo",
  components: { "mp-opt-icon": MPOptIcon, "login-box": LoginBox },
  setup() {
    const store = useStore();

    const showLoginDialog = ref(false);
    const hasLogged = computed(() => store.state.login.hasLogged);
    const userInfo = computed(() => store.state.login.userInfo);

    /** 切换登录弹窗显示与隐藏状态 */
    const toogleLoginDialog = () => {
      console.log("toggle");
      showLoginDialog.value = !showLoginDialog.value;
      console.log("showLoginDialog.value", showLoginDialog.value);
    };

    const handleLoginBoxVisible = (visible: boolean) => {
      console.log("visible", visible);
      showLoginDialog.value = visible;
    };

    return {
      hasLogged,
      userInfo,
      showLoginDialog,
      toogleLoginDialog,
      handleLoginBoxVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.userinfo {
  display: flex;
  align-items: center;
  margin: 10px 0;

  .icon-reset {
    margin: 0 8px;
    border: 1px solid #d4d4d4;
  }

  .avatar {
    width: 40px;
    margin: 0 8px;
    border: 1px solid #d4d4d4;
    border-radius: 50%;
  }

  .username {
    color: #333333;
    font-size: 14px;
    margin-right: 8px;
  }

  .operate-icon {
    cursor: pointer;
    color: #8e8e8e;
  }
}
</style>
