<template>
  <!-- PCS交流有功功率/无功功率 -->
  <VueEcharts style="height: 100%;width: 100%" :options="state.myOptions" />
</template>
<script setup>
import VueEcharts from 'components/Echarts/VueEcharts.vue'
const props = defineProps({
  options: {
    type: Object,
    default: () => { }
  },
  yTitle: {
    type: Array,
    default: () => []
  },
  legendTitle: {
    type: Array,
    default: () => []
  }
})
const state = reactive({
  myOptions: {},
})
const getDaysInOneMonth = (year, month)=>{
  month = parseInt(month, 10);
  var d= new Date(year, month, 0);
  return d.getDate();
}
const curDate = new Date()
const curYear = curDate.getFullYear()
const curMonth = curDate.getMonth() + 1
const curMonthDays = curDate.getDate()
const lastMonthDays = getDaysInOneMonth(curYear, curMonth - 1)
const maxDays = Math.max(curMonthDays, lastMonthDays)
const xAxisDays = [...Array(maxDays)].map((val, index) => {
  return index + 1
})
const { options } = toRefs(props)
watch(options, () => {
  state.myOptions = {
    title: {
      text: '储能收益'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['本月', '上月']
    },

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxisDays
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: options
    // series: [
    //   {
    //     name: '本月',
    //     type: 'line',
    //     stack: 'Total',
    //     areaStyle: {},
    //     smooth: true,
    //     emphasis: {
    //       focus: 'series'
    //     },
    //     data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 90, 230, 210]
    //   },

    //   {
    //     name: '上月',
    //     type: 'line',
    //     stack: 'Total',
    //     smooth: true,
    //     label: {
    //       show: true,
    //       position: 'top'
    //     },
    //     areaStyle: {},
    //     emphasis: {
    //       focus: 'series'
    //     },
    //     data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 1290, 130, 130]
    //   }
    // ]
  };
})
</script>