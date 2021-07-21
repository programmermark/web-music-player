<template>
  <div class="home">
    <!-- Header -->
    <Header />
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/header/index.vue";
import LeftContent from "./components/left-content/index.vue";
import MainContent from "./components/main-content/index.vue";
import MusicPlayer from "./components/player/index.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header,
    LeftContent,
    MainContent,
    "mp-player": MusicPlayer,
  },
});
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  min-width: 1000px;
  max-width: 1200px;
  height: 600px;
  margin: 30px;
  box-sizing: border-box;
  border: 1px solid rgba($color: #c9c9c9, $alpha: 0.6);
  border-radius: 8px;
  box-shadow: 20px 0 20px 2px #e6e6e6, -20px 0 20px 2px #e6e6e6,
    0 20px 20px 2px #e6e6e6;

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
}
</style>
