<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      />
      <van-tabs v-model:active="tabActive" color="#ff9854" ling-higth="3">
        <template v-for="(value, key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key) in allCities" :key="value.cities">
        <city-group v-show="tabActive == key" :group-data="value" />
      </template>
     
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";

import CityGroup from "./cpns/city-group.vue"
const router = useRouter();

//搜索功能
const searchValue = ref("");
const onCancel = () => {
  router.back();
};

// tab栏切换
const tabActive = ref();

// 请求城市数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);

// 获取选中标签后的数据
const currentGroup = computed(() => allCities.value[tabActive.value]);
</script>

<style scoped lang='less'>
.city {
  // 局部滚动
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 6.125rem);
    overflow-y: auto;
  }
}
</style>