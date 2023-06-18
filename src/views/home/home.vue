<template>
  <div class="home">
    <home-nav-bar />
    <!-- banner图 -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <!-- 定位 -->
    <div class="location">
      <div class="city">广州</div>
      <div class="position">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue";
</script>

<style scoped lang='less'>
.home {
  .banner {
    img {
      width: 100%;
    }
  }
  .location {
    display: flex;
    align-items: center;
    height: 2.75rem;
    padding: 0 1.25rem;
    .city {
       flex: 1; 
    }
    .position {
        width: 4.625rem;
        .text {
            position: relative;
            top: 1px;
            font-size: 12px;
        }
        img {
            margin-left: .3125rem;
            width: 1.125rem;
            height: 1.125rem;
        }
    }
  }
}
</style>