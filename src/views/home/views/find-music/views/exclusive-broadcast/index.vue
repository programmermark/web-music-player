<template>
  <div class="exclusive-broadcast" v-infinite-scroll="onPageChange">
    <BroadcastCard
      v-for="broadcast in broadcastList"
      :key="broadcast.id"
      :broadcast="broadcast"
    />
  </div>
</template>

<script lang="ts" setup>
import { useExclusiveBroadcastStore } from "@/stores/exclusive-broadcast";
import { computed, onMounted } from "vue";
import BroadcastCard from "./components/broadcast-card/index.vue";

const exclusiveBroadcastStore = useExclusiveBroadcastStore();
/** 是否还有更多数据 */
const hasMore = computed(() => exclusiveBroadcastStore.hasMore);
const limit = computed(() => exclusiveBroadcastStore.limit);
const offset = computed(() => exclusiveBroadcastStore.offset);
/** 独家放送MV列表 */
const broadcastList = computed(() => exclusiveBroadcastStore.list);

/**
 * 向下滚动时加载数据
 */
const onPageChange = () => {
  if (hasMore.value) {
    exclusiveBroadcastStore.setList({
      limit: limit.value,
      offset: limit.value + offset.value,
    });
  }
};

onMounted(() => {
  exclusiveBroadcastStore.setList({
    limit: limit.value,
    offset: 0,
  });
});
</script>

<style lang="scss" scoped>
.exclusive-broadcast {
  width: 100%;
  padding: 20px 30px 40px;
}
</style>
