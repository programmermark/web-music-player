<template>
  <teleport to="#app">
    <!-- <teleport to="#home"> -->
    <div class="login-box">
      <div class="close-icon">
        <i class="el-icon-close icon-reset"></i>
      </div>
      <div class="desc-img-wrapper">
        <img src="./assets/image/login-bg.png" alt="登录背景图" />
      </div>
      <div class="form-box-wrapper">
        <div class="form-box">
          <el-form size="small">
            <el-form-item>
              <el-input
                v-model="input1"
                placeholder="请输入手机号"
                prefix-icon="el-icon-mobile-phone"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="input2"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
              />
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginBox",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 350px;
  position: absolute;
  top: calc(50% -205px);
  left: calc(50% - 175px);
  z-index: 200;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  box-shadow: 8px 0 8px 2px #e6e6e6, -8px 0 8px 2px #e6e6e6;

  transform: scale(1);

  .close-icon {
    margin-bottom: 32px;
    .icon-reset {
      cursor: pointer;
      color: #999999;
      padding: 10px 12px;
    }
  }

  .desc-img-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    & > img {
      width: 260px;
    }
  }

  .form-box-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
    .form-box {
      width: 260px;

      .submit-btn {
        width: 100%;
        color: #fff;
        background-color: #d33a30;
        font-size: 16px;
        margin-top: 22px;
        padding-top: 12px;
        padding-bottom: 12px;
        border-radius: 6px;
      }
      &:deep(.el-input.is-active .el-input__inner) {
        border-color: #d33a30;
      }
      &:deep(.el-input__inner:focus) {
        border-color: #d33a30;
      }
    }
  }
}
</style>
