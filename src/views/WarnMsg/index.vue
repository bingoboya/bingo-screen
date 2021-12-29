<template>
  <!-- 告警中心 -->
  <div style="background: #eee;">
    <div style="padding: 20px">
      <a-range-picker
        show-time
        v-model:value="state.query.selectDateRange"
        :allowClear="false"
        style="width: 380px"
      />
      <a-select
        v-model:value="state.query.deviceValue"
        :options="state.deviceList"
        mode="multiple"
        :show-arrow="true"
        max-tag-count="responsive"
        allowClear
        placeholder="设备"
        style="width: 200px;margin: 0 10px;"
      />
      <a-select
        v-model:value="state.query.deviceIdValue"
        :options="state.deviceIdList"
        mode="multiple"
        :show-arrow="true"
        max-tag-count="responsive"
        allowClear
        placeholder="设备编号"
        style="width: 200px;margin-right:10px;"
      />
      <a-select
        v-model:value="state.query.optionsValue"
        :options="state.optionsList"
        mode="multiple"
        :show-arrow="true"
        max-tag-count="responsive"
        allowClear
        placeholder="数据项"
        style="width: 200px"
      />
    </div>
    <div ref="countRef" style="height:100%;background: #eee;padding: 20px;">
      <a-table
        :dataSource="state.dataSource"
        :columns="state.columns"
        :pagination="false"
        size="middle"
        bordered
        class="ant-table-striped"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        :scroll="{ y: (scry - 200) }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-tooltip placement="topLeft" destroyTooltipOnHide	>
              <template #title>
                <span>{{ record.name }}</span>
              </template>
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ record.name }}</div>
            </a-tooltip>
          </template>
          <template v-if="column.key === 'address'">
            <a-tooltip placement="topLeft" destroyTooltipOnHide	>
              <template #title>
                <span>{{ record.address }}</span>
              </template>
              <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ record.address }}</div>
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from 'dayjs';
import request from '@/utils/request'
import { cleanObject } from '@/utils/tools'
import qs from "qs"
import _ from 'lodash'
const countRef = ref(null)
const scry = ref(10)
const state = reactive({
  dataSource: [
    {
      key: '1',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '2',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '3',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '4',
      name: '名字',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '5',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '6',
      name: '名字',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '7',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '8',
      name: '名字',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '9',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '10',
      name: '名字',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '11',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '12',
      name: '名字',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '13',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '14',
      name: '名字',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '15',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '16',
      name: '名字',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '17',
      name: '设备名设备名设备名设备名设备名设备名设备名设备名设备名设备名',
      age: 32,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
    {
      key: '18',
      name: '名字',
      age: 42,
      address: '事件事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述描述',
    },
  ],
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 80,
      align: 'center'
    },
    {
      title: '设备名称/编号',
      dataIndex: 'name',
      key: 'name',
      // ellipsis: true, // 自动省略
      // ellipsis: 'showTitle'
    },
    {
      title: '发生日期及时刻',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '事件描述',
      dataIndex: 'address',
      key: 'address',
      ellipsis: 'showTitle'
    },
    {
      title: '持续时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '恢复日期及时刻',
      dataIndex: 'address',
      key: 'address',
    },
  ],
  query: {
    optionsValue: [],
    deviceValue: [],
    deviceIdValue: [],
    selectDateRange: [
      dayjs(`${dayjs().format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss'),
      dayjs(`${dayjs().format('YYYY-MM-DD')} 23:59:59`, 'YYYY-MM-DD HH:mm:ss')
    ],
  },
  // 设备
  deviceList: [{ label: 'PCS', value: 'pcs' }, { label: '电池堆', value: 'bms' }],
  // 设备编号列表
  deviceIdList: [],
  // 数据项列表
  optionsList: [],
  oriData: []
})
const getTableScroll = ({ extraHeight, ref } = {}) => {
  if (typeof extraHeight == "undefined") {
    //  默认底部分页64 + 边距10
    extraHeight = 74
  }
  let tHeader = null
  if (ref && ref.current) {
    tHeader = ref.current.getElementsByClassName("ant-table-thead")[0]
  } else {
    tHeader = document.getElementsByClassName("ant-table-thead")[0]
  }
  //表格内容距离顶部的距离
  let tHeaderBottom = 0
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom
  }
  // 窗体高度-表格内容顶部的高度-表格内容底部的高度
  // let height = document.body.clientHeight - tHeaderBottom - extraHeight
  let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`
  // 空数据的时候表格高度保持不变,暂无数据提示文本图片居中
  if (ref && ref.current) {
    let placeholder = ref.current.getElementsByClassName('ant-table-placeholder')[0]
    if (placeholder) {
      placeholder.style.height = height
      placeholder.style.display = "flex"
      placeholder.style.alignItems = "center"
      placeholder.style.justifyContent = "center"
    }
  }
  return height
}
onMounted(() => {
  // const scry = getTableScroll({ref: countRef})
  scry.value = countRef.value.clientHeight
  console.log('scry', countRef.value.clientHeight)
  // scry.value = scry
})
const getOptions = () => {
  request({
    url: `/weather/droplist`,
    method: 'get'
  }).then((res) => {
    const vb = []
    const aa = res.filter(item => item.deviceId === 'pcs' || item.deviceId === 'bms')
    aa.forEach(element => {
      if (element.deviceId === 'pcs') {
        element.device.forEach(devi => {
          devi.label = devi.name.replace('PCS', '')
          devi.value = devi.orderId
        })
      }
      element.data.forEach(val => {
        if (val.data.includes('signal')) {
          val.label = val.name
          val.value = val.data
          vb.push(val)
        }
      })
    });
    // console.log('res', aa, vb);
    state.optionsList = vb
    state.deviceIdList = aa[0].device
  })
}
getOptions()
watch(() => _.cloneDeep(state.query), async (n, o) => {
  console.log('监听', n);
  // getDataList()
}, { immediate: true })
</script>

<style lang="scss" scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>