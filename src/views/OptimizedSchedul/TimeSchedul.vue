<template>
  <div>
    <el-table
      :data="state.tableData"
      :header-cell-style="{ background: '#fafafa', color: '#282828' }"
      border
      style="width: 100%"
      size="mini"
    >
      <!-- <el-table-column fixed prop="name" label="时刻" width="100" align="center" />
      <el-table-column prop="m01" label="00:00" width="80" align="center" />
      <el-table-column prop="m02" label="00:15" width="80" align="center" />-->
      <el-table-column
        v-for="(item, index) in state.columnData"
        :key="index"
        :fixed="item.name === 'name'"
        :prop="item.name"
        :label="item.moment"
        width="80"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const props = defineProps({
  tableData: {
    type: Array,
    default: ['原始策略', '日前策略', '实时策略']
    // default: () => {[]}
  },
  dataList: {
    type: Array,
    default: () => []
  }
})
const { tableData, dataList } = toRefs(props)
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
  columnData: [
    { name: 'm01', moment: '00:00' },
    { name: 'm02', moment: '00:15' }
  ],
  tableData: [
    // {
    //   name: '原始策略',
    //   m01: 2,
    //   m02: 21,
    //   m03: 22,
    //   m04: 23,
    //   m05: 42,
    //   m06: 24
    // },
    // {
    //   name: '日前策略',
    //   m01: 2,
    //   m02: 21,
    //   m03: 22,
    //   m04: 23,
    //   m05: 42,
    //   m06: 24
    // },
    // {
    //   name: '实时策略',
    //   m01: 2,
    //   m02: 21,
    //   m03: 22,
    //   m04: 23,
    //   m05: 42,
    //   m06: 24
    // }
  ]
})
watch(() => dataList.value, (newValue, oldValue) => {
  // console.log('111111', [...toRaw(dataList.value)])
  setDataList([...toRaw(dataList.value)])
})
const setDataList = (dataListArr) => {
  // console.log('ssssss', dataListArr)
  state.tableData.length = 0
  // const nameArr = ['原始策略', '日前策略', '实时策略']
  const nameArr = tableData.value
  nameArr.forEach((item, index) => {
    if(!dataListArr) return
    const aa = {}
    const bb = dataListArr[index]
    // console.log('bb', dataListArr, bb)
    for (let i = 1; i < 97; i++) {
      const s = i < 10 ? `m0${i}` : `m${i}`
      aa[s] = bb[i - 1]
      // aa[s] = Math.random().toFixed(2)
      aa.name = item
    }
    state.tableData.push(aa)
  })
  console.log('state.tableData', state.tableData)
  const columnDataArr = calcuDevisOnDay(96).map((item, index) => {
    return {
      name: `m${(index + 1) < 10 ? `0${index + 1}` : `${index + 1}`}`,
      moment: item
    }
  })
  state.columnData = [{ name: 'name', moment: '时刻' }, ...columnDataArr]
}
setDataList()
// console.log(calcuDevisOnDay(96))
</script>

<style lang="scss" scoped>
</style>