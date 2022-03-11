<template>
  <!-- PCS交流有功功率/无功功率 -->
  <VueEcharts style="border-radius: 4px;height: 100%;width: 100%" :options="state.myOptions" />
</template>
<script setup>
import VueEcharts from 'components/Echarts/VueEcharts.vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  yAxisOptions: {
    type: Array,
    default: [
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
      // {
      //   type: 'value',
      //   // name: 'props.yTitle[1]',
      //   nameTextStyle: {
      //     color: 'red',
      //     fontSize: 8
      //   },
      //   show: true,
      //   position: 'right',
      //   axisLine: {
      //     show: true,
      //     lineStyle: {
      //       color: 'red'
      //     }
      //   },
      //   axisLabel: {
      //     formatter: '{value} 元',
      //     fontSize: 8,
      //     color: 'red'
      //   }
      // }
    ]
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
const { options, title, legendTitle, yAxisOptions } = toRefs(props)
const labelOption = {
  show: true,
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
}
watch(options, () => {
  console.log('watch', options.value, )
  const yAxis = [
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
      // {
      //   type: 'value',
      //   // name: 'props.yTitle[1]',
      //   nameTextStyle: {
      //     color: 'red',
      //     fontSize: 8
      //   },
      //   show: true,
      //   position: 'right',
      //   axisLine: {
      //     show: true,
      //     lineStyle: {
      //       color: 'red'
      //     }
      //   },
      //   axisLabel: {
      //     formatter: '{value} 元',
      //     fontSize: 8,
      //     color: 'red'
      //   }
      // }
    ]
  state.myOptions = {
    title: {
      text: title.value
    },
    tooltip: {
      trigger: 'axis',
      // formatter: (params)=> {
      //   let templete = '23元';
      //   console.log('params', params)
      //   for (let i = 0 ; i<params.length; i++) {
      //     let item=params[i];
      //     if (item.seriesType === 'line') {
      //       templete+=(item.seriesName+`: `+item.data+'%')+'<br>'
      //     } else {
      //       templete+=(item.seriesName+`: `+item.data)+'<br>'
      //     }
      //   }
      //   return templete
      // },
    },
    legend: {
      data: legendTitle.value,
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '24px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: calcuDevisOnDay(96)
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    // yAxis: {
    //   type: 'value'
    // },
    yAxis: yAxisOptions.value,
    series: options
    // series: [
    //   {
    //     name: 'Video Ads',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [150, 232, 201, 154, 190, 330, 410]
    //   },
    //   {
    //     name: 'Direct',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [-320, 332, 301, 334, 390, 330, 320]
    //   },
    //   {
    //     name: 'Search Engine',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [820, 932, 901, 934, 1290, 1330, 1320]
    //   }
    // ]
  };
})
</script>