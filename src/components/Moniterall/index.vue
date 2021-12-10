<template>
  <div style="height: 100%;">
    <!-- <div>电力拓扑图</div> -->
    <div style="padding: 10px;">
      <div style="height: 30px;text-align: center;">储3能系统平均运行效率：XX%</div>
      <div class="system-wrapper">
        <div class="custom-card" v-for="(item, index) in state.energyRunCart" :key="index">
          <div class="custom-card-header">
            <div style="height: 10px;font-size:12px;">{{ item.title }}</div>
            <div style="height: 10px;font-size:12px;">KW</div>
          </div>
          <div class="custom-card-content">{{ item.number }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import request from '@/utils/request';
import { onUnmounted } from 'vue-demi';
const state = reactive({
  energyRunCart: []
})
const getData = () => {
  request.get('/dashboarddata', { name: 'bingo' }).then((res) => {
    // console.log('getData', res.energyRun.runCart);
    state.energyRunCart = res.energyRun.runCart
  })
}
getData()
const task = setInterval(()=>{
  getData()
},3000)
onUnmounted(()=>{
  clearInterval(task)
})
</script>

<style lang="scss" scoped>
.system-wrapper {
  flex: 1;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px 10px;
  // grid-auto-rows: 50px;
}
</style>