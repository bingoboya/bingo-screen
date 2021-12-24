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

const { options } = toRefs(props)
watch(options, () => {
  const legendTitle = toRaw(props.legendTitle)
  // console.log('yTitle11:', legendTitle)
  const colors = ['#5470C6', '#EE6666'];
  state.myOptions = {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      right: '38',
      left: '38',
      bottom: '18',
      top: '32'
    },

    // legend: {
    //   // type: 'scroll',orient: 'vertical',
    //   // right: '14%',
    //   bottom: 0,
    //   itemGap: 2,
    //   data: legendTitle,
    //   textStyle: {
    //     fontSize: 8
    //   }
    // },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: { // 横轴刻度样式
          color: 'black',
          fontSize: 8
        },
        // prettier-ignore
        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: props.yTitle[0],
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
        name: props.yTitle[1],
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
          formatter: '{value} KW',
          fontSize: 8,
          color: 'red'
        }
      }
    ],
    series: options
    // series: [
    //   {
    //     name: '储能系统有功功率',
    //     type: 'line',
    //     yAxisIndex: 0,
    //     data: [
    //       -200.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
    //     ],
    //     lineStyle: {
    //       width: 0.5
    //     }
    //   },
    //   {
    //     name: '储能系统无功功率',
    //     type: 'line',
    //     yAxisIndex: 1,
    //     data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    //   }
    // ]
  };
})
</script>