<template>
  <div style="display: flex;flex-direction:column;height: 100%;">
    <div style="display: flex;flex-direction:column;">
      <!-- <div>策略对比</div> -->
      <div>
        <a-tabs v-model:activeKey="state.activeKey" @change="getdashboarddata">
          <a-tab-pane :key="1" tab="储能功率">
            <div style="width: 100%;height:300px; margin: 10px 0px; background: #edeaea; border-radius: 4px;">
              <Strategy :legendTitle="state.legendTitlechunenggonglvoptions" :options="state.chunenggonglvoptions" :title="'储能充放电功率'" />
            </div>
          </a-tab-pane>
          <a-tab-pane :key="2" tab="储能收益">
            <div style="width: 100%;height:300px; margin: 10px 0px; background: #edeaea; border-radius: 4px;">
              <Strategy :legendTitle="state.legendTitlechunengshikeoptions" :options="state.chunengshikeoptions" :title="'储能时刻收益'" />
            </div>
            <div style="width: 100%;height:300px; margin: 10px 0px; background: #edeaea; border-radius: 4px;">
              <Strategy :legendTitle="state.legendTitlechunengleijioptions" :options="state.chunengleijioptions" :title="'储能累计收益(预计)'" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div style="margin: 10px 0;display: flex;justify-content: space-around">
      <a-button @click="goStrategyoptimization">返回</a-button>
    </div>
  </div>
</template>

<script setup>
import Strategy from 'components/Echarts/Strategy.vue'
import request from '@/utils/request'
import qs from 'qs'
const router = useRouter();
const state = reactive({
  activeKey: 1,
  chunenggonglvoptions: [], // 储能充放电功率
  chunengshikeoptions: [], // 储能时刻收益
  chunengleijioptions: [], // 储能累计收益(预计)
  legendTitlechunenggonglvoptions: ['储能功率(KW)(原始策略)', '储能功率(KW)(优化策略)'],
  legendTitlechunengshikeoptions: ['储能原始策略', '储能优化策略'],
  legendTitlechunengleijioptions: ['储能原始策略', '储能优化预计累计收益'],
})
const goStrategyoptimization = () => {
  // 返回到策略优化
  router.push({
    path: '/optimizedSchedul/strategyoptimization'
  })
}
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
    const str3 = '0.0	0.0	0.0	0.0	-109.7	-107.1	-105.1	-103.9	-100.0	-96.8	-90.4	-91.2	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	217.1	170.8	136.7	134.5	137.1	143.0	139.7	0.0	0.0	0.0	0.0	0.0	0.0	0.0	-162.9	-164.9	-169.0	-163.6	-170.9	-172.1	-172.0	-184.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	139.5	145.0	181.7	200.3	168.8	157.2	187.3	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0'
    const str4 = '0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	-17.4	-2.5	0.0	0.0	-2.5	-37.3	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	191.0	217.1	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	222.0	220.6	221.8	220.6	221.2	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	-147.9	-132.5	-127.5	-133.0	-141.9	-164.5	-161.8	-186.4	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	182.1	182.2	182.0	192.8	199.8	223.4	201.8	0.0	0.0	0.0'
    const str5 = '0.0	0.0	0.0	0.0	-109.7	-216.8	-321.9	-425.8	-525.8	-622.6	-713.0	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-804.2	-587.1	-416.2	-279.6	-145.0	-8.0	135.0	274.8	274.8	274.8	274.8	274.8	274.8	274.8	274.8	111.9	-53.0	-222.0	-385.6	-556.5	-728.7	-900.7	-1084.7	-1084.7	-1084.7	-1084.7	-1084.7	-1084.7	-1084.7	-1084.7	-1084.7	-1084.7	-1084.7	-945.2	-800.2	-618.5	-418.2	-249.4	-92.2	95.1	95.1	95.1	95.1	95.1	95.1	95.1	95.1	95.1	95.1	95.1	95.1'
    const str6 = '0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	-17.4	-19.9	-19.9	-19.9	-22.4	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	131.3	348.4	348.4	348.4	348.4	348.4	348.4	348.4	348.4	348.4	570.4	791.0	1012.8	1233.4	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1306.7	1174.2	1046.7	913.7	771.7	607.2	445.4	259.0	259.0	259.0	259.0	259.0	259.0	259.0	259.0	259.0	441.1	623.3	805.3	998.1	1197.9	1421.3	1623.1	1623.1	1623.1	1623.1'
    state.chunenggonglvoptions = [
      {
        name: '储能功率(KW)(原始策略)',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        data: str1.split('	')
        // data: createArr()
      },
      {
        name: '储能功率(KW)(优化策略)',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        data: str2.split('	')
        // data: createArr()
      }
    ]
    state.chunengshikeoptions = [
      {
        name: '储能原始策略',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        data: str3.split('	')
        // data: createArr()
      },
      {
        name: '储能优化策略',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        data: str4.split('	')
        // data: createArr()
      }
    ]
    state.chunengleijioptions = [
      {
        name: '储能原始策略',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        data: str5.split('	')
        // data: createArr()
      },
      {
        name: '储能优化预计累计收益',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        data: str6.split('	')
        // data: createArr()
      }
    ]
  })
}

getdashboarddata()

</script>

<style lang="scss" scoped>
</style>