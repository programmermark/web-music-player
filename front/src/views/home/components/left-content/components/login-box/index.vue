<template>
  <teleport to="#home">
    <div
      class="login-box"
      v-if="visible"
      @click.stop="changeLoginBoxVisble(true)"
    >
      <div class="close-icon">
        <i
          class="el-icon-close icon-reset"
          @click.stop="changeLoginBoxVisble(false)"
        ></i>
      </div>
      <div class="desc-img-wrapper">
        <img src="./assets/image/login-bg.png" alt="登录背景图" />
      </div>
      <div class="form-box-wrapper">
        <div class="form-box">
          <el-form
            :model="formState"
            :rules="rules"
            ref="loginFormRef"
            size="small"
          >
            <el-form-item prop="phone">
              <el-input
                v-model="formState.phone"
                type="text"
                placeholder="请输入手机号"
                prefix-icon="el-icon-mobile-phone"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formState.password"
                type="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
              />
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" @click.stop="handleLogin"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { validatorPhone } from "@/common/js/util/validator";
import { ILogin } from "@/store/modules/interface/login";
import { useStore } from "@/store";

export default defineComponent({
  name: "LoginBox",
  emits: ["change-visible"],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const loginFormRef = ref<HTMLDivElement>();
    const formState = reactive({
      phone: "",
      password: "",
    });

    const validatePhone = (rule: any, value: string, callback: any) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!validatorPhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };

    const rules = {
      phone: [{ validator: validatePhone, trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };

    /**
     * 切换登录弹窗的显示与隐藏状态
     */
    const changeLoginBoxVisble = (visible: boolean) =>
      emit("change-visible", visible);

    /** 登录账号 */
    const handleLogin = () => {
      console.log("执行登录");
      (loginFormRef.value as any).validate((valid: boolean) => {
        if (valid) {
          const userInfo: ILogin = {
            phone: formState.phone,
            password: formState.password,
          };
          store.dispatch("login/setUserInfo", userInfo);
        }
      });
    };

    onMounted(() => {
      const ele = document.querySelector(".login-box");
      document.addEventListener("click", (e) => {
        /** 被点击的元素不是songListEle，就隐藏songListEle */
        if (e.target !== ele) {
          emit("change-visible", false);
        }
      });
    });

    return {
      loginFormRef,
      formState,
      rules,
      changeLoginBoxVisble,
      handleLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 350px;
  height: 410px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;

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
