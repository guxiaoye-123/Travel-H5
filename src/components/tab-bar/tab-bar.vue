<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img
              v-if="currentIndex !== index"
              :src="getAssetURL(item.image)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/load_assets.js";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const currentIndex = ref(0);
const route = useRoute();
// 监听路由改变时的东西

watch(route, (newRouter)=> {
  const index = tabbarData.findIndex(item => item.path === newRouter.path)
  if( index === -1) return
  currentIndex.value = index
})
</script>

<style scoped lang='less'>
.tab-bar {
  :deep(.van-tabbar-item__icon) {
    font-size: 3.125rem;
  }
  img {
    height: 1.625rem;
  }
}
</style>