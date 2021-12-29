<template>
  <div style="height: 100%;">
    <div>
      <!-- v-model:value="state.query.selectTime" -->
      <a-date-picker @change="onChange" show-time placeholder="选择时间" />
    </div>
    <!-- <div>电力拓扑图</div> -->
    <!-- <div style="display: flex;
    justify-content: center;width: 100%;">
      <img style="width: 90%" :src="tuyuan" alt />
    </div>-->
    <div style="padding: 10px;background: rgb(235, 233, 233)">
      <div style="padding-left: 10px;">储能系统平均运行效率：20 %</div>
      <div class="system-wrapper">
        <div
          class="custom-card-wrapper"
          v-for="(item, index) in state.dataList"
          :key="index"
          style="display: flex;flex-direction: column;
                    align-items: center;
                  justify-content: center;"
        >
          <div>
            <div style="font-size:12px;">{{ item.title }}</div>
          </div>
          <div style="display: flex;align-items: baseline;">
            <div style="font-size: 22px;">{{ item.val }}</div>
            <div style="font-size:12px;">{{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import request from '@/utils/request.js';
import tuyuan from '@/assets/tuyuan.jpg'
import qs from 'qs'
import _ from 'lodash'
const state = reactive({// 只监听时间变化调用接口
  query: {},
  dataList: []
})
const getData = (query) => {
  request({
    url: '/weather/homepage' + '?' + qs.stringify(query),
    method: 'get'
  }).then(res => {
    const { cemsSysInfoEfficiency } = res
    state.dataList = fomate(cemsSysInfoEfficiency)
  })
}

const fomate = (initData) => {
  const arr = [
    { mark: 'rapw', title: '额定功率', val: 2, unit: 'KW' },
    { mark: 'rcap', title: '额定容量', val: 2, unit: 'KWh' },
    { mark: 'req', title: '可充电量', val: 2, unit: 'KWh' },
    { mark: 'rdq', title: '可放电量', val: 2, unit: 'KWh' },
    { mark: 'npcs', title: 'PCS数量', val: 2, unit: '个' },
    { mark: 'npcs', title: 'BMS数量', val: 2, unit: '个' },
    { mark: 'reqp', title: '可充功率', val: 2, unit: 'KW' },
    { mark: 'rdqp', title: '可放功率', val: 2, unit: 'KW' },
    { mark: 'ulsoc', title: 'SOC运行上限', val: 2, unit: '%' },
    { mark: 'llsoc', title: 'SOC运行下限', val: 2, unit: '%' },
    { mark: 'teq', title: '总充电量', val: 2, unit: 'KWh' },
    { mark: 'tdq', title: '总放电量', val: 2, unit: 'KWh' },
  ]
  arr.forEach(item => {
    item.val = initData[item.mark]
  })
  console.log(arr)
  return arr
}
// getData()
// let task = setInterval(() => {
//   getData()
// }, 3000)
const onChange = (value, dateString) => {
  // console.log('watch-111-日期Selected Time: ', value, dateString);
  state.query.selectTime = dateString
}

watch(() => _.cloneDeep(state.query), (n, o) => {
  // console.log('watch-111222-日期', n, o);
  Object.keys(n).forEach(val => {
    if(!(n[val]))
      delete n[val]
  })
  getData(n)
  //   // const hasn0 = (!!(n[0]) && Object.keys(n[0]).length !== 0)
  //   // if (hasn0) {
  //   //   console.log('至少还有一个有值, 关闭定时')
  //   //   if (task) {
  //   //     clearInterval(task)
  //   //   }
  //   // } else {
  //   //   console.log('都没有值, 开启定时器', task)
  //   //   if (task) {
  //   //     clearInterval(task)
  //   //   }
  //   //   task = setInterval(() => {
  //   //     getData()
  //   //   }, 3000)
  //   // }
}, { immediate: true })
onUnmounted(() => {
  // clearInterval(task)
})
</script>

<style lang="scss" scoped>
.system-wrapper {
  background: rgb(235, 233, 233);
  border-radius: 8px;
  // padding: 0 10px 10px 10px;
  flex: 1;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px 10px;
  // grid-auto-rows: 50px;
  .custom-card-wrapper {
    background: #fff;
    border-radius: 8px;
    border: 1px solid rgb(226, 219, 219);
    &:hover {
      box-shadow: 0 2px 12px 0 rgb(0, 0, 0, 0.1);
    }
  }
}
</style>