<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <!-- 日期范围 -->
    <div class="section date-range" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
      </div>
      <div class="stay">共 {{ stayCount }} 晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <!-- 日历 -->
    <van-calendar
      v-model:show="showCalendar"
      @confirm="onConfirm"
      type="range"
      color="#ff9854"
      :round="false"
      :show-confirm="false"
    />
    <div class="section price-count bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hostSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import useCityStore from "@/stores/modules/city";
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { formatMonthDay, getDiffDays } from "@/utils/foemat_date";
const router = useRouter();

const cityClick = () => {
  router.push("/city");
};

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
    },
    (err) => {
      console.log("获取位置失败", err);
    }
  );
};

// 当前城市
const cityStore = useCityStore();

const { currentCity } = storeToRefs(cityStore);

// 日期时间处理
const nowDate = new Date();
const startDate = ref(formatMonthDay(new Date()));
const newDate = new Date();
newDate.setDate(nowDate.getDate() + 1);
const endDate = ref(formatMonthDay(newDate));

// 日历组件处理
const showCalendar = ref(false);
const stayCount = ref(getDiffDays(nowDate, newDate));
const onConfirm = (value) => {
  // 设置日期
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  startDate.value = formatMonthDay(selectStartDate);
  endDate.value = formatMonthDay(selectEndDate);
  stayCount.value = getDiffDays(selectStartDate, selectEndDate);
  showCalendar.value = false;
};
// 热门建议
const homeStore = useHomeStore();
const { hostSuggests } = storeToRefs(homeStore);

// 开始搜索
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
};
</script>

<style scoped lang='less'>
.search-box {
  --van-calendar-popup-height: 100%;
  .location {
    display: flex;
    align-items: center;
    height: 2.75rem;
    padding: 0 1.25rem;
    .city {
      flex: 1;
      color: #333;
      font-size: 15px;
    }
    .position {
      width: 4.625rem;
      .text {
        position: relative;
        top: 1px;
        color: #666;
        font-size: 12px;
      }
      img {
        margin-left: 0.3125rem;
        width: 1.125rem;
        height: 1.125rem;
      }
    }
  }
  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 2.75rem;
  }

  .start {
    flex: 1;
    display: flex;
    height: 2.75rem;
    align-items: center;
  }

  .end {
    min-width: 30%;
    margin-left: 2.5rem;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }

  .date-range {
    height: 44px;
    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }
  .price-counter {
    .start {
      border-right: 1px solid var(--line-color);
    }
  }
  .hot-suggests {
    margin: 10px 0;
    height: auto;

    .item {
      padding: 4px 8px;
      margin: 4px;
      border-radius: 14px;
      font-size: 12px;
    }
  }
  .search-btn {
    .btn {
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
    }
  }
}
</style>