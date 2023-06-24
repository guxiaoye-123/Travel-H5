<template>
  <div class="detail-swipe">
    <van-swipe class="swipe-list" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item"
          ><img :src="item.url" alt=""
        /></van-swipe-item>
      </template>
      <template #indicator="{ active }">
        <div class="indicator">
          <template v-for="(value, key) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory == key"
                >{{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

// 对数据进行转化

let swipeGroup = {};
props.swipeData.forEach((e) => {
  // 新建属性名
  if (Object.keys(swipeGroup).indexOf("" + e.enumPictureCategory) === -1) {
    swipeGroup[e.enumPictureCategory] = [];
  }
  // 对应插入属性值
  swipeGroup[e.enumPictureCategory].push(e);
});
console.log(swipeGroup);

// props.swipeData.forEach((item, index) => {
//     swipeGroup[item.enumPictureCategory] = []

//     const valueArry = swipeGroup[item.enumPictureCategory]
//     valueArry.push(item)
// })
// console.log(swipeGroup);

const nameReg = /【(.*?)】/i;
const getName = (name) => {
  const result = nameReg.exec(name);
  return result[1];
};


const getCategoryIndex = item =>{
    const arr = swipeGroup[item.enumPictureCategory]
    return arr.findIndex(e => e === item)
}
</script>

<style scoped lang='less'>
.detail-swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }
    .indicator {
      position: absolute;
      display: flex;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);
      .item {
        margin: 0 0.3125rem;
        &.active {
          padding: 0 0.1875rem;
          border-radius: 0.1875rem;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>