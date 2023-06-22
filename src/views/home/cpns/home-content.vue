<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houselist" :key="item.data.houseId">
        <house-item-v9 :item-data="item.data" v-if="item.discoveryContentType == 9" />
        <house-item-v3 :item-data="item.data" v-else-if="item.discoveryContentType == 3" />
      </template>
    </div>
  </div>
</template>

<script setup>
import houseItemV3 from "@/components/house-item-v3/house-item-v3.vue"
import HouseItemV9 from "@/components/house-item-v9/house-item-v9.vue"
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
const homeStore = useHomeStore();
const { houselist } = storeToRefs(homeStore);
console.log(houselist);
</script>

<style scoped lang='less'>
.content {
  padding: 0.625rem 0.5rem;
  .title {
    font-size: 22px;
    padding: 0.625rem;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>