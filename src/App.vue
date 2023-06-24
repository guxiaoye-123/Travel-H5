
<template>
  <div class="app">
    <router-view/>
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
