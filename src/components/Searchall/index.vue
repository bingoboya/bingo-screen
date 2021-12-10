<template>
  <div style="height: 100%;">
    <div>
      <a-range-picker v-model:value="state.value1" :locale="locale" show-time/>
    </div>
    <!-- <div>电力拓扑图</div> -->
    <div style="padding: 10px;">
      <div style="height: 30px;text-align: center;">储1能系统平均运行效率：XX%</div>
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
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  const value1 = ref([])
const state = reactive({
  value1: [],
  energyRunCart: []
})
const getData = () => {
  request.get('/dashboarddata', { name: 'bingo' }).then((res) => {
    // console.log('getData', res.energyRun.runCart);
    state.energyRunCart = res.energyRun.runCart
  })
}
getData()
let task = setInterval(() => {
  getData()
}, 3000)
watch([() => state.value1], (n, o) => {
  console.log('watch--日期', n, !!(n[0]));
  const hasn0 = (!!(n[0]) && Object.keys(n[0]).length !== 0)
  if(hasn0) {
    console.log('至少还有一个有值, 关闭定时')
    if(task){
      clearInterval(task)
    }
  }else{
    console.log('都没有值, 开启定时器', task)
    if(task) {
      clearInterval(task)
    }
      task = setInterval(() => {
        getData()
      }, 3000)
  }
})
onUnmounted(() => {
  clearInterval(task)
})
</script>

<style lang="scss" scoped>
.system-wrapper {
  flex:1;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px 10px;
  // grid-auto-rows: 50px;
}
</style>