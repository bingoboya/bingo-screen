<template>
  <div style="display: flex;flex-direction:column;height: 100%;">
    <div>
      <!-- <div>策略优化</div> -->
      <div>
        <div style="width: 100%;height:300px; margin: 20px 0px; background: #edeaea; border-radius: 4px;">
          <Strategy :legendTitle="state.legendTitle" :options="state.chunengyouhuaoptions" :title="'储能优化充放电策略'" />
        </div>
        <TimeSchedul :dataList="state.chunengyouhuaDataList" :tableData="state.powerElect" />
      </div>
    </div>
    <div style="margin: 10px 0;display: flex;justify-content: space-around">
      <a-button @click="goStrategygeneration">返回</a-button>
      <a-button @click="goStrategycomparison">结果对比</a-button>
      <a-button>保存并下发</a-button>
      <a-button>重新生成</a-button>
    </div>
  </div>
</template>

<script setup>
import TimeSchedul from './TimeSchedul.vue'
import Strategy from 'components/Echarts/Strategy.vue'
import request from '@/utils/request'
import qs from 'qs'
const router = useRouter();
const state = reactive({
  powerElect: ['功率', '电量'],
  chunengyouhuaoptions: [], // 储能优化充放电策略
  legendTitle: ['储能功率(KW)(优化策略)', '储能电量(KWh)(优化策略)'],
  chunengyouhuaDataList: []
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
    const str1 = '0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	-1000	-1000	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	0	0	0	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	-1000	-1000	0	0	0'
    const str2 = '0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	250	500	750	1000	1250	1500	1750	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	2000	1714.285714	1428.571429	1428.571429	1428.571429	1428.571429	1428.571429	1428.571429	1428.571429	1428.571429	1428.571429	1142.857143	857.1428571	571.4285714	285.7142857	0	0	0	0	0	0	0	0	0	0	0	250	500	750	1000	1250	1500	1750	2000	2000	2000	2000	2000	2000	2000	2000	2000	1714.285714	1428.571429	1142.857143	857.1428571	571.4285714	285.7142857	0	0	0'
    state.chunengyouhuaDataList = [str1.split('	'), str2.split('	')]
    state.chunengyouhuaoptions = [
      {
        name: '储能功率(KW)(优化策略)',
        type: 'line',
        // stack: 'Total',
        smooth: true,
        symbol: "none",
        data: state.chunengyouhuaDataList[0]
        // data: createArr()
      },
      {
        name: '储能电量(KWh)(优化策略)',
        type: 'line',
        // stack: 'Total',
        smooth: true,
        symbol: "none",
        data: state.chunengyouhuaDataList[1]
        // data: createArr()
      }
    ]
  })
}

getdashboarddata()
const goStrategygeneration = () => {
  // 返回到策略生成
  router.push({
    path: '/optimizedSchedul/strategygeneration'
  })
}
const goStrategycomparison = () => {
  // 跳转到策略对比
  router.push({
    path: '/optimizedSchedul/strategycomparison'
  })
}
</script>

<style lang="scss" scoped>
</style>