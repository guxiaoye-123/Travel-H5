<template>
  <div class="detail top-page">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
    </div>
    <detail-infos :top-infos="mainPart?.topModule" />
    <div class="facility">
        
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";
import { ref, computed } from "vue";
import DetailSwipe from "./cpns/detail_01-swipe.vue";
import DetailInfos from "./cpns/detail_02-infos.vue";
const route = useRoute();
const router = useRouter();
console.log(route.params.id);
const houseId = route.params.id;
// 获取房屋详情信息
const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
console.log("mainPart", mainPart);
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});

// 监听数据返回方法
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped lang='less'>
</style>