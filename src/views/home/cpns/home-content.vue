<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houselist" :key="item.data.houseId">
        <house-item-v9
          @click="itemClick(item.data)"
          :item-data="item.data"
          v-if="item.discoveryContentType == 9"
        />
        <house-item-v3 @click="itemClick(item.data)" :item-data="item.data"
        v-else-if="item.discoveryContentType == 3" />
      </template>

      <!-- <component :is="currentComponent" /> -->
    </div>
  </div>
</template>

<script setup>
import houseItemV3 from "@/components/house-item-v3/house-item-v3.vue";
import HouseItemV9 from "@/components/house-item-v9/house-item-v9.vue";
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const homeStore = useHomeStore();
const { houselist } = storeToRefs(homeStore);
console.log(houselist.value);

// computed(()=> {
//   const condition = houselist.value.map(item => {
//    item.discoveryContentType
//    console.log('condition', condition);
//   })
// })
 const router = useRouter()
const itemClick = (item) => {
  // 跳转详情页
  router.push(`/detail/${item.houseId}`)
}
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