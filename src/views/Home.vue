<template>
  <div>
    home
    <!-- <el-date-picker v-model="value1" type="date" placeholder="Pick a day" /> -->
    <router-view></router-view>
  </div>
</template>

<script setup>
const value1 = ref('2021-10-29')
</script>

<style lang="scss" scoped>

</style>