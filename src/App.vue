
<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
      <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar/>
    <loading />
  </div>
</template>
<script setup>
import loading from "./components/loading/loading.vue";
import TabBar from "./components/tab-bar/tab-bar.vue";
</script>
<style scoped>



</style>
