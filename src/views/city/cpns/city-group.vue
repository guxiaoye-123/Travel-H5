<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
        <van-index-anchor index="热门"/>
        <div class="list">
            <template v-for="(city, index) in groupData.hotCities" :key="index">
                <div class="hotcity" @click="cityClick(city)">{{city.cityName}}</div>
            </template>
        </div>
        <template v-for="(group, index) in groupData.cities" :key="index">
            <van-index-anchor :index="group.group" />
            <template v-for="(city, indey) in group.cities" :key="indey">
                <van-cell :title="city.cityName" @click="cityClick(city)" />
            </template>
        </template>
      
    </van-index-bar>
    <!-- <template v-for="(group, index) in groupData.cities" :key="index">
      <div class="group-item">
        <h2 class="title">标题： {{ group.group }}</h2>
        <div class="list">
          <template v-for="(city, indey) in group.cities" :key="indey">
            <div class="city">
              {{ city.cityName }}
            </div>
          </template>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city"

 const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});

// 动态获取索引
const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift('#')
    return list
})
// 监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = city => {
    // 选中城市
    cityStore.currentCity = city
    console.log(city);
    router.back()
}

</script>

<style scoped lang='less'>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: .625rem;
    padding-right: 1.5625rem;
    .hotcity {
        width: 4.375rem;
        height: 1.75rem;
        border-radius: 5px;
        font-size: 17px;
        color: #000;
        text-align: center;
        line-height: 1.75rem;
        background-color: #fff4ec;
        margin: .625rem 0;
    }
}
</style>