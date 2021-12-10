<template>
  <div class="main-page-wrapper">
    <div class="main-top">
      <div class="main-top-left">
        <div class="main-top-left-top">
          <div class="custom-card" style="margin-top: 5px;height: 100%;">
            <div>金华储能</div>
            <div>业主：{{ state.baseInfo.name }}</div>
            <div>站点地址：{{ state.baseInfo.addr }}</div>
          </div>
          <div class="custom-card" style="margin-top: 5px;height: 100%;">
            <div>基本信息</div>
            <div>电池类型：{{ state.baseInfo.battery }}</div>
            <div>接入电压：{{ state.baseInfo.volt }}</div>
            <div>接入站点：{{ state.baseInfo.incharStation }}</div>
          </div>
          <div class="custom-card" style="margin-top: 5px;height: 100%;">
            <div>运行状态</div>
            <div>PCS: {{ state.baseInfo.pcsState }}</div>
            <div>BMS: {{ state.baseInfo.bmsState }}</div>
            <div>告警信息: {{ state.baseInfo.error }}条</div>
            <div>安全运行: {{ state.baseInfo.days }}天</div>
          </div>
        </div>
        <div class="custom-card" style="margin-top: 5px;height: 200px;">
          <SalesProPie :options="state.socdata" />
        </div>
      </div>
      <div class="main-top-right">
        <div style="height: 30px;text-align: center;">储能系统平均运行效率：XX%</div>
        <div class="system-wrapper">
          <div
            class="custom-card"
            v-for="(item, index) in state.energyRunCart"
            :key="index"
          >
            <div class="custom-card-header">
              <div style="height: 10px;font-size:12px;">{{ item.title }}</div>
              <div style="height: 10px;font-size:12px;">KW</div>
            </div>
            <div class="custom-card-content">{{ item.number }}</div>
          </div>
        </div>
        <div class="echart-wrapper chart-card">
          <EnergyStorage :options="state.energyStorageData" />
        </div>
      </div>
    </div>
    <div class="main-bottom">
      <div class="chart-card" style="width: 100%;flex:1;">
        <EnergySystem :options="state.optionspcs" />
      </div>
      <div class="chart-card" style="flex:1;">
        <EnergyPcs :options="state.optionspcssystem" />
      </div>
      <!-- <div style="flex:1;">
        <EnergyPcs :options="state.optionspcssystem" />
      </div>-->
      <div class="chart-card" style="width: 100%;flex:1;">
        <EnergyPcsVolt :options="state.optionspcsa" />
      </div>
    </div>
  </div>
</template>
<script setup>
import SalesProPie from 'components/Echarts/SalesProPie.vue'
import request from '@/utils/request'
import EnergySystem from 'components/Echarts/EnergySystem.vue'
import EnergyPcs from 'components/Echarts/EnergyPcs.vue'
import EnergyStorage from 'components/Echarts/EnergyStorage.vue'
import EnergyPcsVolt from 'components/Echarts/EnergyPcsVolt.vue'
const state = reactive({
  baseInfo: {},
  energyRunCart: [],
  energyRunCharts: {},
  optionspcs: {},
  optionspcsa: {},
  optionspcssystem: {},
  socdata: 0,
  energyStorageData: {},
  test1Data: 2,
  testData: {
    one: { 'name': 'bingo1' },
    two: { 'name': 'bingo2' },
    three: { 'name': 'bingo3' },
    four: [1, 2, 3, 4, 5]
  }
})
const getdashboarddata = () => {
  request.get('/dashboarddata', { name: 'bingo' }).then((res) => {
    // console.log('res', res)
    state.baseInfo = res.baseInfo
    state.energyRunCart = res.energyRun.runCart
    state.energyRunCharts = res.energyRun.runCharts
    state.socdata = res.baseInfo.soc
    state.optionspcs = res.optionspcs
    state.optionspcsa = res.optionspcsa
    state.optionspcssystem = res.optionspcssystem
    const { barData, lineData, category } = res.energyRun.runCharts
    console.log(556565665, barData, lineData, category);
    state.energyStorageData = res.energyRun.runCharts

  })
}
getdashboarddata()
const task = setInterval(() => {
  getdashboarddata()
}, 3000);
onBeforeUnmount(() => {
  clearInterval(task)
})
</script>
<style lang="scss" scoped>
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
        flex: 1;
        margin: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10px 10px;
        // grid-auto-rows: 50px;
      }
      .echart-wrapper {
        flex: 1;
        // background: rgb(156, 154, 154);
      }
    }
  }
  .main-bottom {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    flex: 3;
    .chart-card {
      margin: 0 10px;
      border-radius: 4px;
      background: #ffffff;
    }
  }
}
</style>