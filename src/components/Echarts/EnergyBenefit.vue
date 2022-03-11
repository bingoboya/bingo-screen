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
  title: {
    type: String,
    default: ''
  },
  yTitle: {
    type: Array,
    default: () => []
  },
  xAxis: {
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
const { options, legendTitle, title, xAxis } = toRefs(props)
watch([options, xAxis], () => {
  console.log('xAxis', xAxis.value)
  state.myOptions = {
    title: {
      text: title.value
    },
    tooltip: {
      trigger: 'axis',
      // axisPointer: {
      //   type: 'shadow'
      // }
    },
    legend: {
      data: legendTitle.value,
      // bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '24px',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // axisTick: { show: false },
        data: xAxis.value
        // data: ['2012/1/12', '2012/1/2', '2012/1/3', '2012/1/4', '2012/1/5', '2012/1/6']
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          //y轴刻度线
          show: true
        },
        axisLine: {
          show: true, // Y轴
          lineStyle: {
            color: '#000' // 颜色
          }
        },
      }
    ],
    series: options
    // series: [
    //   {
    //     name: '充电电量',
    //     type: 'bar',
    //     barGap: 0,
    //     label: labelOption,
    //     emphasis: {
    //       focus: 'series'
    //     },
    //     data: [320, 332, 301, 334, 390]
    //   },
    //   {
    //     name: '放电电量',
    //     type: 'bar',
    //     label: labelOption,
    //     emphasis: {
    //       focus: 'series'
    //     },
    //     data: [220, 182, 191, 234, 290]
    //   },
    // ]
  };
})
</script>