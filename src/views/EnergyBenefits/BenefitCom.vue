<template>
  <div style="width: 100%;height: 100%;">
    <div>
      <el-config-provider :locale="zhCn">
        <el-date-picker
          v-if="dataType === 'year'"
          v-model="state.curStartYear"
          size="mini"
          type="year"
          :clearable="false"
          @change="handleChangeYear"
          :disabled-date="disableStartDate"
          style="width: 100px;"
        />
        <span v-if="dataType === 'year'">~</span>
        <el-date-picker
          v-if="dataType === 'year'"
          v-model="state.curEndYear"
          size="mini"
          type="year"
          :clearable="false"
          @change="handleChangeYear"
          :disabled-date="disableEndDate"
          style="width: 100px;"
        />

        <el-date-picker
          v-if="dataType === 'month'"
          v-model="state.curMonth"
          type="monthrange"
          range-separator="到"
          size="mini"
          unlink-panels
          :clearable="false"
          start-placeholder="开始月"
          end-placeholder="结束月"
          @change="changeMonth"
          @calendar-change="monthRangeCalendarChange"
          :disabledDate="monthRangeDisablesDate"
        />

        <!-- <el-date-picker
          v-model="state.value2"
          type="month"
          @change="value2change"
          :disabledDate="value2RangeDisablesDate"
          placeholder="Pick a month"
        />
        <el-date-picker
          v-model="state.value3"
          type="month"
          @change="value3change"
          placeholder="Pick a month"
          :disabledDate="value3RangeDisablesDate"
        /> -->

        <el-date-picker
          v-if="dataType === 'day'"
          v-model="state.curDay"
          type="daterange"
          size="mini"
          :clearable="false"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          @change="changeDateDay"
          @calendar-change="dateRangeCalendarChange"
          :disabledDate="dateRangeDisablesDate"
        ></el-date-picker>
      </el-config-provider>
    </div>
    <div style="width: 100%;height: 100%;display: flex;flex-direction: column;">
      <div class="echart-wrapper" style="width: 100%;flex:1;margin-bottom: 30px;">
        <!-- 电量统计 -->
        <EnergyBenefit
          style="background: #edeaea;width: 100%;height: 100%;border-radius: 8px;"
          :options="state.electricityStatistics"
          :legendTitle="['充电电量', '放电电量']"
          :title="'充放电量统计(KWh)'"
          :xAxis="state.selectedDays"
        />
      </div>
      <div class="echart-wrapper" style="width: 100%;flex:1;margin-bottom: 60px;">
        <!-- 收益 -->
        <EnergyBenefit
          style="background: #edeaea;width: 100%;height: 100%;border-radius: 8px;"
          :options="state.inCome"
          :legendTitle="['收益']"
          :title="'电度收益统计(元)'"
          :xAxis="state.selectedDays"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import request from '@/utils/request'
import qs from 'qs'
import EnergyBenefit from 'components/Echarts/EnergyBenefit.vue'
import dayjs from 'dayjs';
const props = defineProps({
  dataType: {
    type: String,
    default: ''
  }
})
console.log('dataType', props.dataType)
const {dataType} = toRefs(props)
console.log('dataType', dataType.value)
const getdashboarddata = (query) => {
  request({
    url: '/weather/droplist' + '?' + qs.stringify(query),
    method: 'get'
  }).then((res) => {
    const [arr1, arr2, arr3] = calcuDataArr(dataType.value)
    console.log('arr1, arr2, arr3', arr1, arr2, arr3)
    res = {
      "electricityStatistics": [
        {
          "name": "充电电量",
          "type": "bar",
          "barGap": 0,
          "emphasis": {
            "focus": "series"
          },
          "data": arr1
        },
        {
          "name": "放电电量",
          "type": "bar",
          "emphasis": {
            "focus": "series"
          },
          "data": arr2
        }
      ],
      "inCome": [
        {
          "name": "收益",
          "type": "bar",
          "barGap": 0,
          "emphasis": {
            "focus": "series"
          },
          "data": arr3
        }
      ]
    }
    const { electricityStatistics, inCome } = res
    state.electricityStatistics = electricityStatistics
    state.inCome = inCome
  })
}
const datemonth = (minDate,maxDate) => {
    if (minDate && maxDate) {
    let minYear = minDate.getFullYear();
    let minMonth = minDate.getMonth()+1;
    let maxYear = maxDate.getFullYear();
    let maxMonth = maxDate.getMonth()+1;
    return (maxYear*12+maxMonth) - (minYear*12+minMonth)
  } else {
    return ''
  }
}
const handleChangeYear = () => {
  console.log('change-month', state.curStartYear)
  const dateStart = new Date(state.curStartYear)
  const dateEnd = new Date(state.curEndYear)
  const diffYear =  dateEnd.getFullYear() - dateStart.getFullYear()
  console.log('diffYear', diffYear)
  // const difDays = (dateEnd - dateStart) / (1000 * 60 * 60 * 24) + 1
  // console.log('相差多少天', state.curStartYear, difDays)
  // 计算两个日期中间的每个日期
  // 计算开始日期的月份有多少天
  const startMonth = dateStart.getMonth() + 1
  const endMonth = dateEnd.getMonth() + 1
  const startYear = dateStart.getFullYear()
  const endYear = dateEnd.getFullYear()
  const startDays = new Date(dateStart.getFullYear(), startMonth, 0).getDate()
  // 计算结束日期的月份有多少天
  const endDays = new Date(dateEnd.getFullYear(), endMonth, 0).getDate()
  let arr1 = []
  arr1 = [...Array(diffYear + 1)].map((item, index) => {
    const year = dateStart.getFullYear() + index
    return `${year}`
  })
  state.selectedDays = [...arr1]
  getdashboarddata()
  console.log('每个日期', arr1)
 }
const changeMonth = () => {
  console.log('change-month', state.curMonth)
  const dateStart = new Date(state.curMonth[0])
  const dateEnd = new Date(state.curMonth[1])
  const diffmonth = datemonth(dateStart, dateEnd) + 1
  console.log('diffmonth', diffmonth)
  // const difDays = (dateEnd - dateStart) / (1000 * 60 * 60 * 24) + 1
  // console.log('相差多少天', state.curMonth, difDays)
  // 计算两个日期中间的每个日期
  // 计算开始日期的月份有多少天
  const startMonth = dateStart.getMonth() + 1
  const endMonth = dateEnd.getMonth() + 1
  const startYear = dateStart.getFullYear()
  const endYear = dateEnd.getFullYear()
  const startDays = new Date(dateStart.getFullYear(), startMonth, 0).getDate()
  // 计算结束日期的月份有多少天
  const endDays = new Date(dateEnd.getFullYear(), endMonth, 0).getDate()
  let arr1 = []
  if(startYear === endYear) {
    arr1 = [...Array(diffmonth)].map((item, index) => {
      const month = startMonth + index
      return `${dateStart.getFullYear()}/${month}`
    })
  }
  else if(startYear !== endYear) {
    const a1 = [...Array(12 - dateStart.getMonth())].map((item, index) => {
      const month = dateStart.getMonth() + index
      return `${dateStart.getFullYear()}/${month + 1}`
    })
    const a2 = [...Array(dateEnd.getMonth() + 1)].map((item, index) => {
      const month = 1 + index
      return `${dateEnd.getFullYear()}/${month}`
    })
    arr1 = [...a1, ...a2]
  }
  state.selectedDays = [...arr1]
  getdashboarddata()
  console.log('每个日期', arr1)
}
const calcuDataArr = (dataType) => {
  const lenMonths = 3
  const lenDays = state.selectedDays.length
  const len = lenDays
  const device = dataType === 'day' ? 1 : dataType === 'month' ? 30 : 365
  const maxElectData = 1900 * device
  const minElectData = 1500 * device
  const maxpriceData = 4000 * device
  const minpriceData = 2500 * device
  const arr1 = [...Array(len)].map(item => {
    return Math.round(Math.random() * (maxpriceData - minpriceData)) + minpriceData;
  })
  const arr2 = [...arr1].map(item => {
    return item*(Math.round(Math.random() * (90 - 85)) + 85)/100
  })
  const arr3 = [...Array(len)].map(item => {
    return Math.round(Math.random() * (maxElectData - minElectData)) + minElectData;
  })
  return [arr1, arr2, arr3]
}
const value2change = () => {
  console.log('value2change')
}
const value3change = () => {
  console.log('value3change')
}
const aapanelchange = () => {
  console.log('aapanelchange')
}
const value2RangeDisablesDate = (time) => {
  const curDate = state.value3
  let mintime = new Date()
  let maxtime = new Date()
  mintime = new Date(mintime.setTime( curDate.getFullYear() - 1 ), curDate.getMonth())
  maxtime = new Date(maxtime.setTime( curDate.getFullYear() + 1 ), curDate.getMonth())
  // console.log('curDate.getMonth()------', curDate, curDate.getFullYear() - 1, mintime)
  // return time.getTime() <= mintime || time.getTime() > maxtime
}
const value3RangeDisablesDate = (time) => {
  const curDate = state.value2
  let mintime = new Date()
  let maxtime = new Date()
  mintime = new Date(mintime.setTime( curDate.getFullYear() - 1 ), curDate.getMonth())
  maxtime = new Date(maxtime.setTime( curDate.getFullYear() + 1 ), curDate.getMonth())
  // console.log('curDate.getMonth()------', curDate, curDate.getFullYear() - 1, mintime)
  return time.getTime() <= mintime || time.getTime() > maxtime
}
const monthRangeCalendarChange = (selecMonths) => {
  console.log(2222222222, selecMonths)
  state.curSelectMonth = selecMonths
}
const monthRangeDisablesDate = (time) => {
  // console.log('fuk', time)
  // if(state.curSelectMonth && state.curSelectMonth[0] && state.curSelectMonth[1] === null){
  //   const curSelectedDay = state.curSelectMonth[0]

  //   const timeRange = 1*24*60*60*1000 // 一天
  //   const _minTime = curSelectedDay.getTime() - timeRange * 62 //最小时间可选前n天
  //   const _maxTime = curSelectedDay.getTime() + timeRange * 61 //最大时间可选n天后
  //   // tim是设置向前可选一个月，但是遇到31天的时间不够精确，TODO
  //   // const curday = curSelectedDay.getDate()
  //   // const _minMonth = new Date(curSelectedDay.getFullYear(), curSelectedDay.getMonth() - 1, curday)
  //   // return time.getTime() > _maxTime || time.getTime() <= _minMonth.getTime()
  //   return time.getTime() > _maxTime || time.getTime() <= _minTime
  // }
  return time.getTime() > new Date() || time.getTime() <= new Date(2019, 12, 0)
}
const dateRangeCalendarChange = (selecDays) => {
  console.log(11111111, selecDays)
  state.curSelectDay = selecDays
}
const changeDateDay = () => {
  const dateStart = new Date(state.curDay[0])
  const dateEnd = new Date(state.curDay[1])
  // const difDays = (dateEnd - dateStart) / (1000 * 60 * 60 * 24) + 1
  // console.log('相差多少天', state.curDay, difDays)
  // 计算两个日期中间的每个日期
  // 计算开始日期的月份有多少天
  const startMonth = dateStart.getMonth() + 1
  const endMonth = dateEnd.getMonth() + 1
  const startDays = new Date(dateStart.getFullYear(), startMonth, 0).getDate()
  // 计算结束日期的月份有多少天
  const endDays = new Date(dateEnd.getFullYear(), endMonth, 0).getDate()
  let arr1 = []
  if(startMonth === endMonth) {
    arr1 = [...Array(dateEnd.getDate() - dateStart.getDate() + 1)].map((item, index) => {
      const day = dateStart.getDate() + index
      return `${dateStart.getFullYear()}/${dateStart.getMonth() + 1}/${day}`
    })
  }
  else if(startMonth !== endMonth) {
    const a1 = [...Array(startDays - dateStart.getDate() + 1)].map((item, index) => {
      const day = dateStart.getDate() + index
      return `${dateStart.getFullYear()}/${dateStart.getMonth() + 1}/${day}`
    })
    const a2 = [...Array(dateEnd.getDate())].map((item, index) => {
      const day = 1 + index
      return `${dateEnd.getFullYear()}/${dateEnd.getMonth() + 1}/${day}`
    })
    arr1 = [...a1, ...a2]
  }
  state.selectedDays = [...arr1]
  getdashboarddata()
  console.log('每个日期', arr1)
}

const dateRangeDisablesDate = (time) => {
  if(state.curSelectDay && state.curSelectDay[0] && state.curSelectDay[1] === null){
    const curSelectedDay = state.curSelectDay[0]
    const timeRange = 1*24*60*60*1000 // 一天
    const _minTime = curSelectedDay.getTime() - timeRange * 32 //最小时间可选前n天
    const _maxTime = curSelectedDay.getTime() + timeRange * 31 //最大时间可选n天后
    // tim是设置向前可选一个月，但是遇到31天的时间不够精确，TODO
    // const curday = curSelectedDay.getDate()
    // const _minMonth = new Date(curSelectedDay.getFullYear(), curSelectedDay.getMonth() - 1, curday)
    // return time.getTime() > _maxTime || time.getTime() <= _minMonth.getTime()
    return time.getTime() > _maxTime || time.getTime() <= _minTime
  }
}
const curDate = new Date()
// 七天前
const sevenDayEarly = new Date(curDate - 24 * 60 * 60 * 1000 * 7)
// 六个月前
const sixMonthEarly = new Date(curDate.setMonth( curDate.getMonth() - 5 ))
// 三年前
const threeYearEarly = new Date(curDate.setFullYear(curDate.getFullYear() - 1))
const state = reactive({
  selectedDays: [],
  value2: sixMonthEarly,
  value3: new Date(),
  curSelectMonth: null,
  curSelectDay: null,
  curMonth: [
    sixMonthEarly,
    new Date()
  ],
  curDay: [ // 初始时间是当天往前追溯7天
    sevenDayEarly,
    // new Date(),
    new Date()
  ],
  curStartYear: new Date(threeYearEarly),
  curEndYear: new Date(),
  inCome: [],
  electricityStatistics: [],
  dayRange: [
    dayjs(`${dayjs().format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss'),
    dayjs(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}`, 'YYYY-MM-DD HH:mm:ss')
  ]
})
if(dataType.value === 'day') {
  changeDateDay()
}
if(dataType.value === 'month') {
  changeMonth()
}
if(dataType.value === 'year') {
  handleChangeYear()
}

const disableStartDate = (time) => {
  if (state.curStartYear) {
    return time.getFullYear() > state.curEndYear.getFullYear() || time.getFullYear() <= 2019
  } else {
    // return time.getFullYear() < new Date().getFullYear()
  }
}
const disableEndDate = (time) => {
  if (state.curEndYear) {
    return time.getFullYear() < state.curStartYear.getFullYear() || time.getFullYear() > new Date().getFullYear()
  } else {
    // return time.getFullYear() < new Date().getFullYear()
  }
}



getdashboarddata()
const task = setInterval(() => {
  // getdashboarddata()
}, 3000);
onBeforeUnmount(() => {
  clearInterval(task)
})
</script>

<style lang="scss" scoped>
.echart-wrapper {
  flex: 1;
  margin: 0 10px;
  background: #edeaea;
  border-radius: 8px;
}
</style>