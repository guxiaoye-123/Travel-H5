<template>
  <div class="loading" v-if="isLoading" @click="loadingClick">
    <div class="bg">
      <img src="../../assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();

const { isLoading } = storeToRefs(mainStore);

const loadingClick = () => {
    isLoading.value = false
}
</script>

<style scoped lang='less'>
.loading {
  position: fixed;

  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);
  .bg {
    width: 6.5rem;
    height: 6.5rem;
    background: url(../../assets/img/home/loading-bg.png) 0 0 / 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 4.375rem;
      height: 4.375rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>