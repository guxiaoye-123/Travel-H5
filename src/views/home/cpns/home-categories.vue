<template>
<div class="categories">
    <template v-for="item in categories" :key="item.id">
        <div class="item">
            <img :src="item.pictureUrl" alt="">
            <div class="text">{{ item.title }}</div>
        </div>
    </template>
</div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';


const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)

</script>

<style scoped lang='less'>
.categories {
    display: flex;
    overflow-x: auto;
    height: 5rem;
    padding: 0 .625rem;
    margin-top: .5rem;
    &::-webkit-scrollbar {
        display: none;
    }
    .item {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 4.375rem; 
        img {
            width: 2rem;
            height: 2rem;
        }
    }
}
</style>