<template>
  <div class="moniter-wrapper">
    <div class="moniter-nav-wrapper">
      <anav />
    </div>
    <div class="moniter-content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import anav from './anav.vue'

</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
.moniter-wrapper {
  display: flex;
  width: 100%;
  .moniter-nav-wrapper {
    height: 100%;
  }
  .moniter-content-wrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 10px 10px 10px;
  }
}
</style>