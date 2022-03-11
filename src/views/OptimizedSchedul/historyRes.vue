<template>
  <div style="width: 100%;">
    <div style="margin-bottom: 20px;">
      <selo :cusTitle="14.31" @aa='aa' />
    </div>
    <div style="margin-bottom: 20px;">
      <a-table size="small" :columns="state.celueColumnsData" :data-source="state.celueDataSource" bordered :pagination="false" />
    </div>
    <div style="width: 100%;height:300px; margin: 0 10px; background: #edeaea; border-radius: 4px;">
      <Strategy :legendTitle="state.legendTitle" :yAxisOptions="state.yAxisOptions" :options="state.chunengshikeshijioptions" :title="'储能时刻收益(实际)'" />
    </div>
  </div>
</template>

<script setup>
import request from '@/utils/request'
import qs from 'qs'
import selo from './selo.vue'
import Strategy from 'components/Echarts/Strategy.vue'
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
      vitrual: 1623.1,
      real: 1712.9
    }
  ],
  chunengshikeshijioptions: [], // 储能时刻收益(实际)
  yAxisOptions: [],
  legendTitle: ['储能功率(KW)(日前优化策略)', '储能优化预计累积收益', '储能优化实际累计收益']
})
const aa = (selectedDate, val) => {
  state.celueDataSource[0].time = selectedDate
  state.celueDataSource[0].real = val
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
    state.yAxisOptions = [
      {
        type: 'value',
        // name: 'props.yTitle[0]',
        nameTextStyle: {
          color: '#5470C6',
          fontSize: 8
        },
        show: true,
        position: 'left',
        offset: 0,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#5470C6',
          }
        },
        axisLabel: {
          formatter: '{value} KW',
          fontSize: 8,
          color: '#5470C6'
        }
      },
      {
        type: 'value',
        // name: 'props.yTitle[1]',
        nameTextStyle: {
          color: 'red',
          fontSize: 8
        },
        show: true,
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'red'
          }
        },
        axisLabel: {
          formatter: '{value} 元',
          fontSize: 8,
          color: 'red'
        }
      }
    ]
    const str1 = '0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	-1000	-1000	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	0	0	0	0	0	0	0	0	0	0	1000	1000	1000	1000	1000	1000	1000	1000	0	0	0	0	0	0	0	0	-1000	-1000	-1000	-1000	-1000	-1000	-1000	0	0	0'
    const str2 = '0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	-17.4	-19.9	-19.9	-19.9	-22.4	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	-59.7	131.3	348.4	348.4	348.4	348.4	348.4	348.4	348.4	348.4	348.4	570.4	791.0	1012.8	1233.4	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1454.6	1306.7	1174.2	1046.7	913.7	771.7	607.2	445.4	259.0	259.0	259.0	259.0	259.0	259.0	259.0	259.0	259.0	441.1	623.3	805.3	998.1	1197.9	1421.3	1623.1	1623.1	1623.1	1623.1'
    const str3 = '0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	163.4	328.8	328.8	328.8	328.8	328.8	328.8	328.8	328.8	328.8	484.5	684.5	855.7	1035.2	1206.5	1206.5	1206.5	1206.5	1206.5	1206.5	1206.5	1206.5	1206.5	1206.5	1206.5	1092.6	978.5	864.6	750.1	634.3	519.8	406.0	287.3	287.3	287.3	287.3	287.3	287.3	287.3	287.3	287.3	493.2	698.6	906.0	1115.0	1320.3	1520.4	1712.9	1712.9	1712.9	1712.9'
    state.chunengshikeshijioptions = [
      {
        name: '储能功率(KW)(日前优化策略)',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        yAxisIndex: 0,
        data: str1.split('	')
        // data: createArr()
      },
      {
        name: '储能优化预计累积收益',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        yAxisIndex: 1,
        data: str2.split('	')
      },
      {
        name: '储能优化实际累计收益',
        type: 'line',
        // stack: 'Total',
        // smooth: true,
        symbol: "none",
        yAxisIndex: 1,
        data: str3.split('	')
      }
    ]
  })
}
getdashboarddata()
</script>

<style lang="scss" scoped>
</style>