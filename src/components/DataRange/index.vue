<template>
  <!-- 数据区间 -->
  <div style="height:100%;overflow: hidden;display: flex;flex-direction: column;">
    <div style="height: 40px;">
      <a-range-picker
        show-time
        v-model:value="state.query.selectDateRange"
        :allowClear="false"
        style="width: 380px"
      />
      <a-cascader
        v-model:value="state.query.selectEquipment"
        :show-search="{ filter }"
        expand-trigger="hover"
        style="margin-left: 20px;width: 400px"
        :options="options"
        placeholder="选择设备"
      />
    </div>
    <div
      style="flex:1;
        margin: 20px 0px;
        background: #edeaea;
        border-radius: 8px;"
    >
      <NewEnergyDataRange
        style="background: #edeaea;border-radius: 8px;"
        :titleDataList="state.titleDataList"
        :valueDataList="state.valueDataList"
      />
    </div>
    <div style="height: 300px;display: flex;flex-direction: column;">
      <div style="background: #c0d2e9;display: flex;height: 34px;align-items: center;">
        <div style="flex:3;text-align: center;">时点</div>
        <div style="flex:7;text-align: center;">{{ title }}</div>
      </div>
      <div class="container" ref="container">
        <div class="empty" :style="{ height: `${emptyHeight}px` }"></div>
        <div class="list" :style="{ width: '100%', transform: `translateY(${translateY})` }">
          <div
            v-for="item in listData"
            :key="item"
            class="item"
            :style="{ height: `${itemHeight}px`, 'align-items': 'center', display: 'flex', width: '100%' }"
          >
            <div style="flex:3;text-align: center;">{{ item.time }}</div>
            <div style="flex:7;text-align: center;">{{ item.fvalue }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import request from '@/utils/request'
import dayjs from 'dayjs';
import { cleanObject } from '@/utils/tools'
import NewEnergyDataRange from 'components/Echarts/NewEnergyDataRange.vue'
import qs from "qs"
import _ from 'lodash'
const props = defineProps({
  modalParams: {
    type: Array,
    default: () => []
  },
  modalTitle: {
    type: String,
    default: ''
  },
})
const itemHeight = 34
const emptyHeight = ref(0)
let itemCount = ref(null)
const container = ref(null)
const start = ref(0)
const translateY = ref(0)
const options = ref([])
const title = ref('')
const { modalParams, modalTitle } = toRefs(props)
console.log(424243, modalTitle.value)
title.value= modalTitle.value
const state = reactive({
  titleDataList: [],
  valueDataList: [],
  query: {
    selectDateRange: [
      dayjs(`${dayjs().format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss'),
      dayjs(`${dayjs().format('YYYY-MM-DD')} 23:59:59`, 'YYYY-MM-DD HH:mm:ss')
    ],
    selectEquipment: toRaw(modalParams.value)
  },
  oriData: []
})
// console.log('Array', toRaw(modalParams.value))
const filter = (inputValue, path) => {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
};
const getOptions = () => {
  request({
    url: `/weather/droplist`,
    method: 'get'
  }).then((res) => {
    console.log('res.data', res);
    res.forEach(element => {
      element.value = element.deviceId
      element.label = element.name
      element.data.forEach(val => {
        val.label = val.name
        val.value = val.data
      })
      element.device.forEach(item => {
        item.label = item.name
        item.value = item.orderId
        item.children = element.data
      })
      element.children = element.device
    });
    options.value = res
  })
}
// const oriDatas = Array.from({ length: 100 }, (v, k) => {
//   return {
//     "time": `2020.12.24 0-${k}`,
//     "fvalue": `${k}`
//   }
// })
const listData = computed(() => {
  return itemCount.value && state.oriData.slice(start.value, start.value + itemCount.value + 1)
})
// const onChange = (value, dateString) => {
//   state.query.selectDateRange = dateString
// }
const getDataList = () => {
  const { selectEquipment, selectDateRange } = toRaw(state.query)
  
  const query = {
    startTime: selectDateRange[0].format('YYYY-MM-DD HH:mm:ss'),
    endTime: selectDateRange[1].format('YYYY-MM-DD HH:mm:ss'),
    deviceId: selectEquipment[0],
    orderId: selectEquipment[1],
    var: selectEquipment[2]
  }
  request({
    url: `/weather/section?${qs.stringify(cleanObject(query))}`,
    method: 'get'
  }).then((res) => {
    title.value = res.title
    state.oriData = res.data
    state.titleDataList = res.data.map(item => item.time)
    state.valueDataList = res.data.map(item => item.fvalue)
    emptyHeight.value = itemHeight * state.oriData.length
  })
}
watch(() => _.cloneDeep(state.query), async (n, o) => {
  await getOptions()
  // console.log('监听', n, n.selectEquipment);
  if (n.selectEquipment.length === 0) return
  getDataList()
}, { immediate: true })

onMounted(() => {
  // console.log(111, container, container.value.clientHeight);
  itemCount.value = Math.ceil(container.value.clientHeight / itemHeight)
  container.value.addEventListener('scroll', e => {
    const { scrollTop } = e.target
    start.value = Math.floor(scrollTop / itemHeight)
    translateY.value = (scrollTop - 34) + 'px'
  })
})

</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  overflow: auto;
  display: flex;
  // padding: 0 10px;
  .item {
    /* 奇数行 */
    &:nth-child(odd) {
      background: #ccc;
    }
    /* 偶数行 */
    &:nth-child(even) {
      background: rgb(228, 230, 228);
    }
  }
}
</style>