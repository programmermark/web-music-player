<template>
  <div class="w-full">
    <div class="px-[30px] mb-8">
      <NotifyCard v-for="log in logs" :key="log.date" :log="log" />
    </div>
    <div class="h-8"></div>
  </div>
</template>

<!-- 系统通知 -->
<script lang="ts" setup>
import NotifyCard from "./components/notify-card/index.vue";
import { logs } from "@/bulletins/logs/2021-08";
</script>

<style lang="scss" scoped></style>
