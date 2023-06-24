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
          <span class="time">{{ startDateStr }}</span>
        </div>
      </div>
      <div class="stay">共 {{ stayCount }} 晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
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
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { formatMonthDay, getDiffDays } from "@/utils/foemat_date";
import useMainStore from "@/stores/modules/main";
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
const mainStore = useMainStore()

const { startDate, endDate } = storeToRefs(mainStore)
const startDateStr= computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));

// 日历组件处理
const showCalendar = ref(false);
const stayCount = ref(getDiffDays(startDate.value, endDate.value));
const onConfirm = (value) => {
  // 设置日期
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
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
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
      color: #333;
      font-size: .9375rem;
    }
    .position {
      width: 74px;
      .text {
        position: relative;
        top: .0625rem;
        color: #666;
        font-size: .75rem;
      }
      img {
        margin-left: 5px;
        width: 18px;
        height: 18px;
      }
    }
  }
  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 1.25rem;
    color: #999;
    height: 44px;
  }

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    margin-left: 40px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: .75rem;
      color: #999;
    }

    .time {
      margin-top: .1875rem;
      color: #333;
      font-size: .9375rem;
      font-weight: 500;
    }
  }

  .date-range {
    height: 2.75rem;
    .stay {
      flex: 1;
      text-align: center;
      font-size: .75rem;
      color: #666;
    }
  }
  .price-counter {
    .start {
      border-right: .0625rem solid var(--line-color);
    }
  }
  .hot-suggests {
    margin: .625rem 0;
    height: auto;

    .item {
      padding: .25rem .5rem;
      margin: .25rem;
      border-radius: .875rem;
      font-size: .75rem;
    }
  }
  .search-btn {
    .btn {
      width: 21.375rem;
      height: 2.375rem;
      max-height: 3.125rem;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 2.375rem;
      text-align: center;
      border-radius: 1.25rem;
      color: #fff;
      background-image: var(--theme-linear-gradient);
    }
  }
}
</style>