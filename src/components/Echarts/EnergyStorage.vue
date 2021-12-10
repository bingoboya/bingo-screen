<template>
  <!-- <div>储能损益</div> -->
  <VueEcharts :options="state.myOptions" />
</template>
<script setup>
import * as echarts from 'echarts';
import VueEcharts from 'components/Echarts/VueEcharts.vue'
const props = defineProps({
  options: Object
})
const state = reactive({
  myOptions: {}
})

watch(()=>props.options, () => {
  // 接口返回延迟，so 需要监听props的变化，更新数据
  // console.log(999999, toRaw(props.options.barData), toRaw(props.options.lineData), toRaw(props.options.category));
  state.myOptions = {
    backgroundColor: '#0f375f',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#333',
        },
      },
    },
    legend: {
      data: ['line', 'bar'],
      textStyle: {
        color: '#ccc',
      },
    },
    xAxis: {
      // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      // 横坐标 data 不变时，图表更新数据时就没问题
      data: toRaw(props.options.category),
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
    },
    yAxis: {
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
    },
    series: [
      {
        name: 'line',
        type: 'line',
        smooth: true,
        showAllSymbol: 'auto',
        symbol: 'emptyCircle',
        symbolSize: 15,
        data: toRaw(props.options.lineData),
      },
      {
        name: 'bar',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#14c8d4' },
            { offset: 1, color: '#43eec6' },
          ]),
        },
        data: toRaw(props.options.barData),
      },
      {
        name: 'line',
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(20,200,212,0.5)' },
            { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
            { offset: 1, color: 'rgba(20,200,212,0)' },
          ]),
        },
        z: -12,
        data: toRaw(props.options.lineData),
      },
      {
        name: 'dotted',
        type: 'pictorialBar',
        symbol: 'rect',
        itemStyle: {
          color: '#0f375f',
        },
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
        data: toRaw(props.options.lineData),
      },
    ],
  }
})
</script>
