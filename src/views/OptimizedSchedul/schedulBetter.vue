<template>
  <div>
    <div style="width: 100%;height:300px; margin: 20px 0px; background: #edeaea; border-radius: 4px;">
      <Strategy :legendTitle="state.legendTitle" :options="state.chunengoptions" :title="'储能充放电策略'" />
    </div>
    <TimeSchedul :dataList="state.chunengyouhuaDataList" :tableData="state.strategyOptimizationData" />
  </div>
  <div style="margin: 10px 0;display: flex;justify-content:space-around;">
    <a-button>导入策略</a-button>
    <a-button @click="goStrategyGeneration">自动生成策略</a-button>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import TimeSchedul from './TimeSchedul.vue'
import Strategy from 'components/Echarts/Strategy.vue'
import request from '@/utils/request'
import qs from 'qs'
const router = useRouter();
const store = useStore()
const route = useRoute();
const state = reactive({
  chunengyouhuaDataList: [],
  strategyOptimizationData: ['原始策略', '日前策略', '实时策略'],
  chunengoptions: [], // 储能充放电策略
  legendTitle: ['储能功率(KW)(原始策略)', '储能功率(KW)(日前优化策略)', '储能功率(KW)(实时优化策略)'],
})
const createArr = () => {
  const arr = []
  for (let i = 0; i < 96; i++) {
    arr.push((Math.random() * 100).toFixed(2))
  }
  return arr
}
const getdashboarddata = (query) => {
  request({
    url: '/api/getincome' + '?' + qs.stringify(query),
    method: 'get'
  }).then((res) => {
    const str1 = '0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	-1000	-1000	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	-1000	-1000	0	0	0	0	0	0	0	0	0	0	0'
    const str2 = '0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	-1000	-1000	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	0	0	0	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	-1000	-1000	0	0	0'
    const str3 = '0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	-1000	-1000	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	-1000	-1000	-1000	-1000	-1000	-1000	-1000'
    state.chunengyouhuaDataList = [str1.split('	'), str2.split('	'), str3.split('	')]
    state.chunengoptions = [
      {
        name: '储能功率(KW)(原始策略)',
        type: 'line',
        // stack: 'Total',
        smooth: true,
        symbol: "none",
        data: state.chunengyouhuaDataList[0]
        // data: createArr()
      },
      {
        name: '储能功率(KW)(日前优化策略)',
        type: 'line',
        // stack: 'Total',
        smooth: true,
        symbol: "none",
        data: state.chunengyouhuaDataList[1]
        // data: createArr()
      },
      {
        name: '储能功率(KW)(实时优化策略)',
        type: 'line',
        // stack: 'Total',
        smooth: true,
        symbol: "none",
        data: state.chunengyouhuaDataList[2]
        // data: createArr()
      }
    ]
  })
}

getdashboarddata()
console.log('stor', store.state.counter)
// store.dispatch('')
const goStrategyGeneration = () => {
  setTimeout(() => {
    router.push({
      path: '/optimizedSchedul/strategygeneration'
    })
    // selectedKeys.value = ['/optimizedSchedul/historyres']
  }, 0);
  // setTimeout(() => {
  //   router.push({
  //     path: '/optimizedSchedul/schedul'
  //   })
  //   // selectedKeys.value = ['/optimizedSchedul/schedul']
  // }, 2000);
}
</script>

<style lang="scss" scoped>
.grid-wrapper {
  width: 600px;
  // height: 600px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  // grid-template-rows: repeat(auto-fill, 50px);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>