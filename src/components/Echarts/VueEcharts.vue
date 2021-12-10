<template>
  <div :class="[className, 'echarts']"></div>
</template>

<script>
  import { watch, onMounted } from 'vue'
  import * as Echarts from 'echarts';
  import 'echarts-liquidfill'

  import { v4 as uuidv4 } from 'uuid'

  export default {
    name: 'VueEcharts',
    props: {
      options: Object,
      theme: [String, Object]
    },
    setup(ctx) {
      let dom
      let chart
      let className = `echarts${uuidv4()}`
      const initChart = () => {
        if (!chart) {
          dom = document.getElementsByClassName(className)[0]
          chart = Echarts.init(dom)
          // chart = Echarts.init(dom, ctx.theme)
        }
        if (ctx.options) {
          chart.setOption(ctx.options)
        }
      }
      onMounted(() => {
        initChart()
      })
      watch(() => ctx.options, () => {
        console.log('watch-option');
        initChart()
      })
      return {
        className
      }
    }
  }
</script>

<style lang="scss" scoped>
  .echarts {
    width: 100%;
    height: 100%;
    padding: 4px;
    &:hover{
        box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%);
      }
  }
</style>
