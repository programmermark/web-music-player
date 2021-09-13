<template>
  <div id="content">
    <el-row class="wrapper">
      <el-col class="left-content-wrapper" :span="4">
        <!-- left-content -->
        <left-content></left-content>
      </el-col>
      <el-col class="right-content-wrapper" :span="20">
        <!-- main-content -->
        <main-content></main-content>
      </el-col>
    </el-row>
  </div>
  <!-- footer -->
  <mp-player />
</template>

<script lang="ts">
import { ElNotification } from "element-plus";
import { computed, defineComponent, onMounted } from "vue";
import LeftContent from "./components/left-content/index.vue";
import MainContent from "./components/main-content/index.vue";
import MusicPlayer from "./components/player/index.vue";
import { logs } from "@/bulletins/logs/2021-08";
import { useStore } from "@/store";
import { ILog } from "@/store/modules/interface/bulletin";

export default defineComponent({
  name: "Home",
  components: {
    LeftContent,
    MainContent,
    "mp-player": MusicPlayer,
  },
  setup() {
    const store = useStore();

    /** 公告是否已通知过 */
    const hasNotified = computed(() => store.state.bulletin.hasNotified);

    /** store中的最新公告 */
    const currentBulletin = computed(() => store.state.bulletin.currentBulletin);

    /**
     * 更新公告sotre
     */
    const updateBulletinStore = (
      hasNotified: boolean,
      currentBulletin: ILog,
      bulletinList: ILog[]
    ) => {
      store.commit("bulletin/setHasNotified", hasNotified);
      store.commit("bulletin/setCurrentBulletin", currentBulletin);
      store.commit("bulletin/setBulletinList", bulletinList);
    };

    /** 打开更新公告弹窗 */
    const openBulletinDialog = () => {
      const log = logs[0];
      /**
       * 更新条件：
       * 1. 未接收过通知；
       * 2. store中的最新通知不是最新的；
       */
      if (
        !hasNotified.value ||
        !currentBulletin.value ||
        (currentBulletin.value.briefContent !== log.briefContent &&
          currentBulletin.value.content !== log.content)
      ) {
        if (log && log.title) {
          ElNotification({
            title: log.title,
            customClass: "custom-notification",
            dangerouslyUseHTMLString: true,
            message: log.briefContent,
            duration: 60000,
            onClose: () => updateBulletinStore(true, log, logs),
          });
        }
      }
    };

    onMounted(() => {
      openBulletinDialog();
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>
#content {
  width: 100%;
  height: calc(100% - 50px);
  .wrapper {
    height: 100%;
    .left-content-wrapper {
      height: 100%;
      background-color: #ededed;
      border-bottom-left-radius: 8px;
    }
    .right-content-wrapper {
      height: 100%;
    }
  }
}
</style>
