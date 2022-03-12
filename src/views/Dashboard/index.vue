<template>
  <div class="main-page-wrapper">
    <div class="main-top">
      <div class="main-top-left">
        <div class="main-top-left-top">
          <div style="background: #5197FB;" class="custom-basic-card">
            <div class="header">
              <div class="circle"></div>
              <div>金华储能</div>
            </div>
            <div class="footer">
              <div>业主：金华</div>
              <div>站点地址：金华站点</div>
            </div>
          </div>
          <div style="background: #FB908D" class="custom-basic-card">
            <div class="header">
              <div class="circle"></div>
              <div>基本信息</div>
            </div>
            <div class="footer">
              <div>电池类型：磷酸铁锂</div>
              <div>接入电压：10KV</div>
              <div>接入站点：金华站点</div>
            </div>
          </div>
          <div style="background: #42C8A7" class="custom-basic-card">
            <div class="header">
              <div class="circle"></div>
              <div>运行状态</div>
            </div>
            <div class="footer">
              <div style="margin-bottom: 6px;display: flex;align-items: center;">
                <div style="margin-right: 10px;">PCS:</div>
                <div>
                  <span style="color: green;background: #fff;padding: 0px 10px;border-radius: 8px;">正常</span>
                  <!-- <span v-if="state.runningState.pcsState === 1" style="color: green;background: #fff;padding: 0px 10px;border-radius: 8px;">正常</span>
                  <span v-else style="color: rgb(194, 31, 3);background: #fff;padding: 0px 10px;border-radius: 8px;">异常</span> -->
                
                </div>
              </div>
              <div style="margin-bottom: 6px;display: flex;align-items: center;">
                <div style="margin-right: 10px;">BMS:</div>
                <div>
                  <span style="color: green;background: #fff;padding: 0px 10px;border-radius: 8px;">正常</span>
                  <!-- <span v-if="state.runningState.bmsState === 1" style="color: green;background: #fff;padding: 0px 10px;border-radius: 8px;">正常</span>
                  <span v-else style="color: rgb(194, 31, 3);background: #fff;padding: 0px 10px;border-radius: 8px;">异常</span> -->
                </div>
              </div>
              
              <div style="color: #fff">告警信息: {{ 0 }} 条</div>
              <!-- <div style="color: #fff">告警信息: {{ state.runningState.errorCount }} 条</div> -->
              <div>安全运行: {{ 100 }} 天</div>
              <!-- <div>安全运行: {{ state.runningState.dayCount }} 天</div> -->
            </div>
          </div>
        </div>
        <div class="battery-card">
          <SalesProPie style="background: #edeaea;border-radius: 8px;" :options="state.socdata" />
        </div>
      </div>
      <div class="main-top-right">
        <div style="height: 30px;text-align: center;">储能系统平均运行效率：{{ 90 }} %</div>
        <!-- <div style="height: 30px;text-align: center;">储能系统平均运行效率：{{ state.avgEfficiency }} %</div> -->
        <div class="system-wrapper">
          <div
            class="custom-card-wrapper"
            v-for="(item, index) in state.energyRunCart"
            :key="index"
            style="display: flex;flex-direction: column;
                    align-items: center;
                  justify-content: center;"
          >
            <div>
              <div style="font-size:12px;">{{ item.title }}</div>
            </div>
            <div style="display: flex;align-items: baseline;">
              <div style="font-size: 22px;">{{ item.val }}</div>
              <div style="font-size:12px;">{{ item.unit }}</div>
            </div>
          </div>
        </div>
        <div class="echart-wrapper">
          <NewEnergyStorage
            style="background: #edeaea;border-radius: 8px;"
            :options="state.energyStorageBenefits"
          />
        </div>
      </div>
    </div>
    <div class="main-bottom">
      <div class="chart-card">
        <NewEnergyPcs
          style="border-radius: 4px;background: rgb(238, 236, 236);"
          :legendTitle="['储能系统有功功率', '储能系统无功功率']"
          :yTitle="['储能系统有功功率', '储能系统无功功率']"
          :options="state.sysPoweroptions"
        />
      </div>
      <div class="chart-card" style=" position: relative;height: 100%;">
        <div class="bingo">
          <a-select
            ref="select"
            size="small"
            v-model:value="state.pcsPowerValue"
            :options="selcOptions()"
            @change="handleChangePcsPower"
            style="font-size: 12px;width: 200px"
          />
        </div>
        <NewEnergyPcs
          style="border-radius: 4px;background: rgb(238, 236, 236);"
          :legendTitle="state.pcsPowerOptionsTitle"
          :yTitle="['交流有功功率', '交流无功功率']"
          :options="state.pcsPowerOptions"
        />
      </div>
      <div class="chart-card" style="position: relative;height: 100%;">
        <div class="bingo">
          <a-select
            ref="select"
            size="small"
            v-model:value="state.pcsVolCurValue"
            :options="selcOptions()"
            @change="handleChangePcsVolCur"
            style="font-size: 12px;width: 200px"
          />
        </div>
        <NewEnergyPcs
          style="border-radius: 4px;background: rgb(238, 236, 236);"
          :legendTitle="state.pcsVolCurOptionsTitle"
          :yTitle="['相电压', '相电流']"
          :options="state.pcsVolCurOptions"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
// const socket = inject("socket");
import SalesProPie from 'components/Echarts/SalesProPie.vue'
import request from '@/utils/request'
import qs from 'qs'
import _ from 'lodash'
// import EnergySystem from 'components/Echarts/EnergySystem.vue'
// import EnergyPcs from 'components/Echarts/EnergyPcs.vue'
import NewEnergyPcs from 'components/Echarts/NewEnergyPcs.vue'
import NewEnergyStorage from 'components/Echarts/NewEnergyStorage.vue'
// import EnergyStorage from 'components/Echarts/EnergyStorage.vue'
// import EnergyPcsVolt from 'components/Echarts/EnergyPcsVolt.vue'
const state = reactive({
  baseInfo: {},
  energyRunCart: [],
  energyRunCharts: {},
  sysPoweroptions: [],
  energyStorageBenefits: [], // 储能收益
  pcsVolCurOptions: [],
  pcsVolCurOptionsTitle: [],
  cachePcsVolCurOptions: [],
  pcsPowerOptionsTitle: [],
  pcsPowerOptions: [],
  cachePcsPowerOptions: [],
  socdata: 0,
  energyStorageData: {},
  closesetSocket: false,
  pcsPowerValue: '01#舱',
  pcsVolCurValue: '01#舱',
  avgEfficiency: 0, //运行效率
  runningState: {}
})
const selcOptions = () => {
  const list = []
  for (let i = 1; i <= 12; i++) {
    const tit = i < 10 ? `0${i}` : i
    list.push({
      label: `${tit}#舱`,
      value: `${tit}#舱`,
    });
  }
  return list
}

const getdashboarddata = (query) => {
  request({
    url: '/weather/homepage' + '?' + qs.stringify(query),
    method: 'get'
  }).then((res) => {
    console.log('cemsSysInfoEfficiency---', res)
    const { cemsSysInfoEfficiency, runningState, baseInfo, pcsPowerSeries, pcsVolCurSeries, sysPowerSeries } = res
    console.log('weather/homepage', res)
    state.runningState = runningState
    sysPowerSeries.forEach((item, index) => {
      item.lineStyle = {
        width: 0.5
      }
      item.yAxisIndex = index
      item.smooth = true
      item.showSymbol = false
    })
    
    state.energyStorageBenefits = calcufit()
    console.log('energyStorageBenefits', state.energyStorageBenefits)
    state.sysPoweroptions = sysPowerSeries
    state.cachePcsVolCurOptions = pcsVolCurSeries
    handleChangePcsVolCur(state.pcsVolCurValue)
    state.cachePcsPowerOptions = pcsPowerSeries
    handleChangePcsPower(state.pcsPowerValue)
    state.socdata = res.soc
    state.avgEfficiency = res.avgEfficiency
    state.energyRunCart = fomate(cemsSysInfoEfficiency)
  })
}
const getDaysInOneMonth = (year, month)=>{
  month = parseInt(month, 10);
  var d= new Date(year, month, 0);
  return d.getDate();
}
const calcufit = () => {
  const curDate = new Date()
  const curYear = curDate.getFullYear()
  const curMonth = curDate.getMonth() + 1
  const curMonthDays = curDate.getDate()
  const lastMonthDays = getDaysInOneMonth(curYear, curMonth - 1)
  const curMonthDataArr = Array(curMonthDays).fill(1700)
  const lastMonthDataArr = Array(lastMonthDays).fill(1700)
  console.log('lastMonthDays', lastMonthDays, curMonth, curMonthDays, curMonthDataArr, lastMonthDataArr)
  const mockEnergyStorageBenefits = [
      {
        name: '本月',
        type: 'line',
        areaStyle: {},
        smooth: true,
        symbol: "none",
        emphasis: {
          focus: 'series'
        },
        data: curMonthDataArr
        // data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 90, 230, 210]
      },
      {
        name: '上月',
        type: 'line',
        symbol: "none",
        smooth: true,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: lastMonthDataArr
        // data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 1290, 130, 130]
      }
    ]
  return mockEnergyStorageBenefits
}
const handleChangePcsVolCur = (val) => {
  console.log('handleChangePcsVolCur', val)
  const cacheData = toRaw(state.cachePcsVolCurOptions)
  const ret = cacheData.filter(item => {
    if (item.name.indexOf(val) !== -1) {
      item.lineStyle = {
        width: 0.5
      }
      item.smooth = true
      item.showSymbol = false
      if (item.name.indexOf('相电压') !== -1) {
        item.yAxisIndex = 0 // 设置Y轴
      }
      if (item.name.indexOf('相电流') !== -1) {
        item.yAxisIndex = 1 // 设置Y轴
      }
      return item
    }
  })
  const w = ret.map(value => value.name)
  state.pcsVolCurOptionsTitle = w

  // // console.log('handleChangePcsPower----', cacheData, ret, w)
  // console.log('yTitle112222', w)
  state.pcsVolCurOptions = ret
}
const handleChangePcsPower = (val) => {
  console.log('handleChangePcsPower', val)
  const cacheData = toRaw(state.cachePcsPowerOptions)
  const ret = cacheData.filter(item => {
    if (item.name.indexOf(val) !== -1) {
      item.lineStyle = {
        width: 0.5
      }
      item.smooth = true
      item.showSymbol = false
      if (item.name.indexOf('有功功率') !== -1) {
        item.yAxisIndex = 0 // 设置Y轴
      }
      if (item.name.indexOf('无功功率') !== -1) {
        item.yAxisIndex = 1 // 设置Y轴
      }
      return item
    }
  })
  const w = ret.map(value => value.name)
  state.pcsPowerOptionsTitle = w

  // console.log('handleChangePcsPower----', cacheData, ret, w)
  console.log('yTitle112222', w)
  state.pcsPowerOptions = ret
}


const fomate = (initData) => {
  const arr = [
    { mark: 'rapw', title: '额定功率', val: 2, unit: 'kW' },
    { mark: 'rcap', title: '额定容量', val: 2, unit: 'kWh' },
    { mark: 'req', title: '可充电量', val: 2, unit: 'kWh' },
    { mark: 'rdq', title: '可放电量', val: 2, unit: 'kWh' },
    { mark: 'npcs', title: 'PCS数量', val: 2, unit: '个' },
    { mark: 'npcs', title: 'BMS数量', val: 2, unit: '个' },
    { mark: 'reqp', title: '可充功率', val: 2, unit: 'kW' },
    { mark: 'rdqp', title: '可放功率', val: 2, unit: 'kW' },
    { mark: 'ulsoc', title: 'SOC运行上限', val: 2, unit: '%' },
    { mark: 'llsoc', title: 'SOC运行下限', val: 2, unit: '%' },
    { mark: 'teq', title: '总充电量', val: 2, unit: 'kWh' },
    { mark: 'tdq', title: '总放电量', val: 2, unit: 'kWh' },
  ]
  arr.forEach(item => {
    item.val = initData[item.mark]
  })
  console.log(arr)
  return arr
}


let setSocket = () => {
  // socket.on("sendmsgtoclientdashboard", (res) => {
  //   aa.value = res
  //   if (!state.closesetSocket) {
  //     threatSocket(res)
  //   }
  // });
  socket.on('connect', function () {
    console.log("连接成功1");
  });
  socket.on('push_event', function (data) {
    console.log('push_event', data);

  });
  socket.on('push_event2', function (data) {
    console.log('push_event2', data);
  });
}

const threatSocket = (res) => {
  console.log("#sendmsgtoclientdashboard: ", res);
}

onMounted(() => {
  // setSocket()
})

getdashboarddata()
const task = setInterval(() => {
  // getdashboarddata()
}, 3000);
onBeforeUnmount(() => {
  clearInterval(task)
  // 停止threatSocket
  state.closesetSocket = true
})
</script>
<style lang="scss" scoped>
.battery-card {
  background: #eee;
  border-radius: 8px;
  margin-top: 5px;
  height: 200px;
  &:hover {
    box-shadow: 0 2px 12px 0 rgb(0, 0, 0, 0.1);
  }
}
.custom-basic-card {
  margin-top: 5px;
  // height: 100%;
  background: #eee;
  color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 2px 12px 0 rgb(0, 0, 0, 0.1);
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 14px;
    border-bottom: 1px solid #fff;
    .circle {
      width: 10px;
      height: 10px;
      margin-right: 10px;
      border-radius: 50%;
      background: #fff;
    }
  }
  .footer {
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 500;
  }
}
.bingo {
  z-index: 999;
  left: calc(50% - 100px);
  position: absolute;
}
.main-page-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .main-top {
    display: flex;
    flex: 7;
    .main-top-left {
      display: flex;
      padding: 10px;
      padding-bottom: 0;
      flex: 2;
      flex-direction: column;
      .main-top-left-top {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
    }
    .main-top-right {
      display: flex;
      flex: 8;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .system-wrapper {
        background: rgb(235, 233, 233);
        border-radius: 8px;
        padding: 10px;
        flex: 1;
        margin: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10px 10px;
        // grid-auto-rows: 50px;
        .custom-card-wrapper {
          background: #fff;
          border-radius: 8px;
          border: 1px solid rgb(226, 219, 219);
          &:hover {
            box-shadow: 0 2px 12px 0 rgb(0, 0, 0, 0.1);
          }
        }
      }
      .echart-wrapper {
        flex: 1;
        margin: 0 10px;
        background: #edeaea;
        border-radius: 8px;
      }
    }
  }
  .main-bottom {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    flex: 3;
    .chart-card {
      margin: 0 10px;
      border-radius: 4px;
      background: rgb(238, 236, 236);
      width: 100%;
      flex: 1;
    }
  }
}
</style>