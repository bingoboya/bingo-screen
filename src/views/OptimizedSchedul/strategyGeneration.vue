<template>
  <div style="display: flex;flex-direction:column;height: 100%;">
    <div>
      <!-- <div>策略生成</div> -->
      <div>
        <a-tabs v-model:activeKey="state.activeKey" @change="getdashboarddata">
          <a-tab-pane :key="1" tab="电价预测">
            <div>
              <a-button @click="getdashboarddata" style="margin-right: 10px;">刷新预测</a-button>
              <a-button>导入数据</a-button>
            </div>
            <div style="width: 100%;height:300px; margin: 10px 0px; background: #edeaea; border-radius: 4px;">
              <Strategy :legendTitle="state.legendTitledianjiayuceoptions" :options="state.dianjiayuceoptions" :title="'电价预测(元/MWh)'" />
            </div>
            <TimeSchedul :dataList="state.elecPriceList" :tableData="state.electricityPriceForecast" />
          </a-tab-pane>
          <a-tab-pane :key="2" tab="负荷预测">
            <div>
              <a-button @click="getdashboarddata" style="margin-right: 10px;">刷新预测</a-button>
              <a-button>导入数据</a-button>
            </div>
            <div style="width: 100%;height:300px; margin: 10px 10px; background: #edeaea; border-radius: 4px;">
              <Strategy :legendTitle="state.legendTitlefuheyuceoptions" :options="state.fuheyuceoptions" :title="'负荷预测(KW)'" />
            </div>
            <TimeSchedul :dataList="state.loadDataList" :tableData="state.loadForecast" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div style="margin: 10px 0;display: flex;justify-content: space-around">
      <a-button @click="goSchedul">返回</a-button>
      <a-button @click="goStrategyoptimization">生成策略</a-button>
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
  activeKey: 1,
  legendTitledianjiayuceoptions: ['电价预测'],
  legendTitlefuheyuceoptions: ['负荷预测'],
  electricityPriceForecast: ['电价'],
  loadForecast: ['负荷'],
  dianjiayuceoptions: [], // 电价预测
  fuheyuceoptions: [], // 负荷预测
  loadDataList: [],
  elecPriceList: [],
})
const createArr = () => {
  const arr = []
  for (let i = 0; i < 96; i++) {
    arr.push((Math.random() * 100).toFixed(2))
  }
  console.log('arr', arr)
  return arr
}
const getdashboarddata = (query) => {
  request({
    url: '/api/getincome' + '?' + qs.stringify(query),
    method: 'get'
  }).then((res) => {
    const str1 = '1876.4	1860.0	1864.4	1846.1	1875.8	1839.2	1905.5	1901.9	1834.2	1891.6	1858.5	1912.8	1824.0	1814.4	1849.6	1874.5	1837.3	1764.7	1793.9	1832.4	1674.1	1645.7	1644.8	1659.2	1603.9	1632.9	1639.1	1622.3	2098.8	2145.1	2139.5	2078.3	2955.0	2886.0	2932.3	2881.2	2892.4	2895.7	2892.3	2845.8	2784.9	2781.3	2778.9	2835.1	2511.1	2491.9	2554.4	2492.5	2150.2	2152.2	2158.5	2148.1	2727.0	2767.0	2692.3	2729.6	2748.1	2771.9	2727.6	2737.0	2815.5	2850.5	2843.3	2873.7	2759.9	2835.3	2786.3	2828.0	2476.4	2474.2	2490.7	2524.3	2329.0	2288.8	2298.2	2268.9	2204.8	2191.8	2165.0	2207.9	2118.2	2127.9	2196.8	2173.0	1930.3	1919.1	1940.6	1937.9	1729.5	1809.4	1719.9	1812.9	1804.5	1798.6	1744.8	1728.2';
    state.loadDataList = [str1.split('	')]
    state.fuheyuceoptions = [
      {
        name: '负荷预测',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: state.loadDataList[0]
        // data: createArr()
      }
    ]
    const str2 = '437.0	448.4	453.5	450.2	438.9	428.4	420.4	415.6	400.1	387.1	361.5	364.8	333.5	315.7	300.0	0.0	0.0	69.7	10.0	0.0	0.0	10.0	149.3	285.0	320.0	349.6	389.7	408.9	439.2	448.4	451.0	459.0	467.4	504.0	558.0	690.6	677.2	689.7	639.9	650.7	689.7	686.1	687.2	719.0	754.3	763.9	868.5	683.4	546.6	538.1	548.2	571.9	559.0	641.2	643.1	888.1	882.4	887.1	882.4	884.7	651.6	659.6	676.0	654.4	683.6	688.6	688.2	736.1	720.5	775.0	591.6	530.0	509.8	532.1	567.7	658.2	647.0	745.6	558.0	580.0	726.8	801.3	675.1	628.6	749.3	749.3	728.3	728.9	728.0	771.1	799.1	893.7	807.3	608.5	598.9	580.0'
    state.elecPriceList = [str2.split('	')]
    state.dianjiayuceoptions = [
      {
        name: '电价预测',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: state.elecPriceList[0]
      }
    ]
  })
}

getdashboarddata()
const goSchedul = () => {
  router.push({
    path: '/optimizedSchedul/schedul'
  })
}
const goStrategyoptimization = () => {
  // 跳转到策略优化
  router.push({
    path: '/optimizedSchedul/strategyoptimization'
  })
}
</script>

<style lang="scss" scoped>
</style>