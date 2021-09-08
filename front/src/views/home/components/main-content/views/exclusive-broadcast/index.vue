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
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import BroadcastCard from "./components/broadcast-card/index.vue";

const store = useStore();

/** 是否还有更多数据 */
const hasMore = computed(() => store.state.exclusiveBroadcast.hasMore);
const limit = computed(() => store.state.exclusiveBroadcast.limit);
const offset = computed(() => store.state.exclusiveBroadcast.offset);
/** 独家放送MV列表 */
const broadcastList = computed(() => store.state.exclusiveBroadcast.list);

/**
 * 向下滚动时加载数据
 */
const onPageChange = () => {
  if (hasMore.value) {
    store.dispatch("exclusiveBroadcast/setList", {
      limit: limit.value,
      offset: limit.value + offset.value,
    });
  }
};

onMounted(() => {
  store.dispatch("exclusiveBroadcast/setList", {
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
