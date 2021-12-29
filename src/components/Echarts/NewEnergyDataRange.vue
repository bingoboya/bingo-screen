<template>
  <!-- PCS交流有功功率/无功功率 -->
  <VueEcharts style="height: 100%;width: 100%" :options="state.myOptions" />
</template>
<script setup>
import VueEcharts from 'components/Echarts/VueEcharts.vue'
const props = defineProps({
  titleDataList: {
    type: Array,
    default: () => []
  },
  valueDataList: {
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

const {titleDataList,valueDataList} = toRefs(props)
watch(titleDataList, () => {
  // console.log('数据区间2', toRaw(titleDataList.value), toRaw(valueDataList.value))
  state.myOptions = {
    title: {
      text: '数据区间'
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
      // data: ['本月', '上月']
    },

    grid: {
      left: '20',
      right: '4',
      bottom: '3',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: toRaw(titleDataList.value)
        // data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true
      }
    ],
    series: [
      {
        name: '',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 0
        },
        emphasis: {
          focus: 'series'
        },
        data: toRaw(valueDataList.value)
        // data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 90, 230, 210]
      }
    ]
  };
})
</script>