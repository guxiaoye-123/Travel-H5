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
    <detai-facility :house-facility="mainPart?.dynamicModule?.facilityModule.houseFacility" />
  </div>
  <detail-landlord :landlord="mainPart?.dynamicModule?.landlordModule" />
  <detail-comment :comment="mainPart?.dynamicModule?.commentModule" />
  <detail-notice :order-rules="mainPart?.dynamicModule.rulesModule.orderRules" />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";
import { ref, computed } from "vue";
import DetailSwipe from "./cpns/detail_01-swipe.vue";
import DetailInfos from "./cpns/detail_02-infos.vue";
import DetaiFacility from "./cpns/detai_03-facility.vue";
import DetailLandlord from "./cpns/detail_04-landlord.vue";
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
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