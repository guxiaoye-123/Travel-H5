<template>
  <div class="home">
    <home-nav-bar />
    <!-- banner图 -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <!-- 定位 -->
    <home-search-box />
    <home-categories />
    <!-- 内容 -->
    <home-content />
    <!-- 下拉搜索框显示 -->
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue"
import homeContent from "./cpns/home-content.vue";
import useScroll from "@/hooks/useScroll"
import { computed, watch } from "vue";
const homeStore = useHomeStore()
homeStore.fetchHostSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()



// 滚动

const { isReachBottom, scrollTop } = useScroll()

watch(isReachBottom, (newValue)=>{
if(newValue) {
  homeStore.fetchHouselistData().then(()=>{
    isReachBottom.value = false
  })
}
})

// 搜索框展示控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop)=> {
//   console.log(newTop);
//   isShowSearchBar.value = newTop > 100
// })

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 100
})
</script>
<style scoped lang='less'>
.home {
  padding-bottom: 3.75rem;
  .banner {
    img {
      width: 100%;
    }
  }
}
</style>