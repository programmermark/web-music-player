<template>
  <div class="userinfo-box">
    <!-- 动态、关注、粉丝 -->
    <div class="base-info-wrapper">
      <div class="base-info" v-if="userInfo">
        <div class="item">
          <div class="count">{{ userInfo.eventCount }}</div>
          <div>动态</div>
        </div>
        <div class="item">
          <div class="count">{{ userInfo.followeds }}</div>
          <div>关注</div>
        </div>
        <div class="item">
          <div class="count">{{ userInfo.follows }}</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <!-- 会员中心、等级、商城 -->
    <div class="shopping-cart">
      <a
        class="opearte-item link-reset"
        href="https://music.163.com/#/member"
        target="_blank"
      >
        <div class="item">
          <mp-icon
            icon="member-center"
            :size="16"
            :scale="1"
            bgColor="none"
            color="#4b4b4b4"
          />
          <span class="text">会员中心</span>
        </div>
      </a>
      <a
        class="opearte-item link-reset"
        href="https://music.163.com/#/user/level"
        target="_blank"
      >
        <div class="item">
          <mp-icon
            icon="level"
            :size="16"
            :scale="1"
            bgColor="none"
            color="#4b4b4b4"
          />
          <span class="text">等级</span>
        </div>
      </a>
      <a
        class="opearte-item link-reset"
        href="https://music.163.com/store/product"
        target="_blank"
      >
        <div class="item">
          <mp-icon
            icon="shopping-cart"
            :size="16"
            :scale="1"
            bgColor="none"
            color="#4b4b4b4"
          />
          <span class="text">商场</span>
        </div>
      </a>
    </div>

    <!-- 退出登录 -->
    <div class="opearte-item logout" @click="handleLogOut">
      <div class="item">
        <mp-icon
          icon="logout"
          :size="16"
          :scale="1"
          bgColor="none"
          color="#4b4b4b4"
        />
        <span class="text">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MPIcon from "@/components/MPIcon.vue";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  components: { "mp-icon": MPIcon },
  setup() {
    const store = useStore();

    const userInfo = computed(() => store.state.login.userInfo);

    /** 退出登录 */
    const handleLogOut = () => {
      store.dispatch("login/setLogOut");
    };

    return {
      userInfo,
      handleLogOut,
    };
  },
});
</script>

<style lang="scss" scoped>
.userinfo-box {
  background-color: #fff;
  border-radius: 4px;

  .base-info-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 24px 0;
    border-bottom: 1px solid #d9d9d9;

    .base-info {
      display: flex;
      align-items: center;
      .item {
        width: 90px;
        border-right: 1px solid #ededed;
        box-sizing: border-box;
        font-size: 13px;
        color: #666;
        text-align: center;
        cursor: pointer;

        &:last-child {
          border-right: none;
        }

        .count {
          color: #333;
          font-size: 27px;
          font-weight: bold;
        }
      }
    }
  }

  .shopping-cart {
    padding: 6px 0;
    border-bottom: 1px solid #d9d9d9;
  }

  .logout {
    margin: 6px 0;
  }

  .opearte-item {
    display: flex;
    align-items: center;
    height: 32px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background: #f2f2f2;
    }

    .item {
      display: flex;
      align-items: center;
      padding-left: 26px;
      cursor: pointer;

      .text {
        margin-left: 10px;
      }
    }
  }

  .link-reset {
    text-decoration: none;
    color: #333;
  }
}
</style>
