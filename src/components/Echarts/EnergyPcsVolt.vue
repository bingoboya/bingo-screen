<template>
    <!-- <div>储能系统有功功率</div> -->
    <VueEcharts :options="state.myOptions" />
</template>
<script setup>
import VueEcharts from 'components/Echarts/VueEcharts.vue'
const props = defineProps({
  options: {
    type: Object,
    default: () => {}
  },
})
const state = reactive({
  myOptions: {}
})
const { options } = toRefs(props)
watch(options, () => {
  state.myOptions = {
    title: {
      text: '储能系统有功功率'
    },
    grid: {
      top: 50,
      left: '2%',
      right: '2%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: options
  }
})
</script>
