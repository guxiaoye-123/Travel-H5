<template>
  <div class="detail top-page" ref="showTabControl">
    <tab-control
    v-if="true"
    class="tabs"
    :titles="['1','2']"
    @tabItemClick="tabClick"
  />
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
    <detai-facility
      :house-facility="mainPart?.dynamicModule?.facilityModule.houseFacility"
    />
    <detail-landlord :landlord="mainPart?.dynamicModule?.landlordModule" />
    <detail-comment :comment="mainPart?.dynamicModule?.commentModule" />
    <detail-notice
      :order-rules="mainPart?.dynamicModule.rulesModule.orderRules"
    />
    <detail-map :position="mainPart?.dynamicModule.positionModule" />
    <detail-intro :price-intro="mainPart?.introductionModule" />
    <div class="footer">
      <img :src="mainPart?.ensureModule.icon" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
   
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";
import { ref, computed } from "vue";
import DetailSwipe from "./cpns/detail_01-swipe.vue";
import DetailInfos from "./cpns/detail_02-infos.vue";
import DetaiFacility from "./cpns/detai_03-facility.vue";
import DetailLandlord from "./cpns/detail_04-landlord.vue";
import DetailComment from "./cpns/detail_05-comment.vue";
import DetailNotice from "./cpns/detail_06-notice.vue";
import DetailMap from "./cpns/detail_07-map.vue";
import DetailIntro from "./cpns/detail_08-intro.vue";
import TabControl from "@/components/tab-control/tab-control.vue";
import useScroll from "@/hooks/useScroll";
const route = useRoute();
const router = useRouter();
console.log(route.params.id);
const houseId = route.params.id;
// 获取房屋详情信息
const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});

// 监听数据返回方法
const onClickLeft = () => {
  router.back();
};

// tabControl 操作
const detailRef = ref()
console.log(detailRef);
console.log(useScroll());
const { scrollTop } = useScroll()
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})
</script>

<style scoped lang='less'>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>