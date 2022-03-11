<template>
  <div>
    <!-- 日历 -->
    <!-- <selo :cusTitle="101" /> -->
    <!-- 历史结果 table -->
    <!-- <a-table size="small" :columns="state.celueColumnsData" :data-source="state.celueDataSource" bordered :pagination="false" /> -->
    <!-- Strategy optimization 策略优化 table -->
    <TimeSchedul :tableData="state.strategyOptimizationData" />
    <!-- Electricity price forecast 电价预测 table-->
    <TimeSchedul :tableData="state.electricityPriceForecast" />
    <!-- Load Forecasting 负荷预测 table-->
    <TimeSchedul :tableData="state.loadForecast" />
    <!-- powerElect 功率&电量 table-->
    <TimeSchedul :tableData="state.powerElect" />
    <!--  echart -->
    <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :options="state.chunengoptions" :title="'储能充放电策略'" />
    </div>
    <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :options="state.dianjiayuceoptions" :title="'电价预测(元/MWh)'" />
    </div>
    <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :options="state.fuheyuceoptions" :title="'负荷预测(KW)'" />
    </div>
    <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :options="state.chunengyouhuaoptions" :title="'储能优化充放电策略'" />
    </div>
    <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :options="state.chunenggonglvoptions" :title="'储能充放电功率'" />
    </div>
    <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :options="state.chunengshikeoptions" :title="'储能时刻收益'" />
    </div>
    <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :options="state.chunengleijioptions" :title="'储能累计收益(预计)'" />
    </div>
    <!-- <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :options="state.chunengshikeshijioptions" :title="'储能时刻收益(实际)'" />
    </div> -->
  </div>
</template>
<script setup>
import selo from './selo.vue'
import TimeSchedul from './TimeSchedul.vue'
import Strategy from 'components/Echarts/Strategy.vue'
import request from '@/utils/request'
import qs from 'qs'
const calcuDevisOnDay = (dividePart) => {
  // dividePart 平均分成几份  96/24
  // 把24小时平均分成96份，获取每个节点的时间
  const totalTime = 24 * 3600 * 1000
  const spanTime = totalTime / dividePart
  const startTime = new Date()
  startTime.setHours(0, 0, 0, 0)
  let currentTime = startTime.getTime()
  const timeList = ['00:00']
  for (let i = 0; i < 95; i++) {
    currentTime += spanTime
    const myDate = new Date(currentTime)
    const str = myDate.toTimeString() // "10:55:24 GMT+0800 (中国标准时间)"
    const timeStr = str.substring(0, 5)
    timeList.push(timeStr) // ['10:55', '11:00']
  }
  // this.devisOnDay = timeList // ['10:55', '11:00']
  // console.log('dividePart', dividePart, this.devisOnDay)
  return timeList
}
const state = reactive({
  celueColumnsData: [
    {
      title: '优化策略',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '下发人',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '下发时间',
      dataIndex: 'time',
      key: 'address1',
      ellipsis: true,
    },
    {
      title: '预计收益(元)',
      dataIndex: 'vitrual',
      key: 'address2',
      ellipsis: true,
    },
    {
      title: '实际收益(元)',
      dataIndex: 'real',
      key: 'address3',
      ellipsis: true,
    }
  ],
  celueDataSource: [
    {
      key: '1',
      name: '优化策略1',
      age: 'bingo',
      time: '2022-02-28',
      vitrual: 1229,
      real: 442
    }
  ],
  strategyOptimizationData: ['原始策略', '日前策略', '实时策略'],
  electricityPriceForecast: ['电价'],
  loadForecast: ['负荷'],
  powerElect: ['功率', '电量'],
  chunengoptions: [], // 储能充放电策略
  dianjiayuceoptions: [], // 电价预测
  fuheyuceoptions: [], // 负荷预测
  chunengyouhuaoptions: [], // 储能优化充放电策略
  chunenggonglvoptions: [], // 储能充放电功率
  chunengshikeoptions: [], // 储能时刻收益
  chunengleijioptions: [], // 储能累计收益(预计)
  chunengshikeshijioptions: [], // 储能时刻收益(实际)
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
    state.fuheyuceoptions = [
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      }
    ]
    state.dianjiayuceoptions = [
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      }
    ]
    state.chunengshikeshijioptions = [
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      }
    ]
    state.chunengoptions = [
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      }
    ]
    state.chunengyouhuaoptions = [
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      }
    ]
    state.chunengshikeoptions = [
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      }
    ]
    state.chunengleijioptions = [
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      }
    ]
    state.chunenggonglvoptions = [
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        smooth: true,
        symbol: "none",
        data: createArr()
      }
    ]
  })
}

getdashboarddata()

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