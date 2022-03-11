<template>
  <div>
    <!-- 星期 -->
    <div style="display: flex;align-items: center;">
      <div style="white-space: nowrap;">当月累计：{{totalPrice}}万元</div>
      <div class="controls">
        <el-button  @click="lastMonth" :disabled="controlsYear === 2020 && controlsMonth === 1" size="small">&lt;</el-button>
        <span>{{ controlsYear }}年{{ controlsMonth }}月</span>
        <el-button :disabled="controlsYear === new Date().getFullYear() && controlsMonth === new Date().getMonth() + 1" @click="nextMonth" size="small">&gt;</el-button>
      </div>
    </div>
    <div style="display: flex;justify-content: center">
      <div class="week" style="width: 600px;display: grid; grid-template-columns: repeat(7, 1fr); grid-row-gap: 4px; grid-column-gap: 4px;">
        <div style="align-items: center; justify-content: center; display: flex;" v-for="(item, index) in weeks" :key="index">{{ item }}</div>
      </div>
    </div>
    <div style="display: flex;justify-content: center">
      <div style="width: 600px;display: grid; grid-template-columns: repeat(7, 1fr); grid-row-gap: 4px; grid-column-gap: 4px;">
        <!-- 显示当前月的1号不为周一时，前面空缺的上个月的日子 -->
        <div v-for="(item, index) in beforeDays" style="background: #fff;color: #ccc;">
        <!-- {{ lastMonthDays - currMonthIsWeek + (index + 1) }} -->
        </div>
        <!-- 当前月 appointed 已经预约的类名 before_curr_date_days 上个月和下个月的日期 -->
        <div v-for="(item, index) in curMonthDays" >
          <div class="aaa"
          @click="item.val === '' ? '' : clickItem(item, index + 1)"
          style="height: 40px;border: none;font-weight: 600;color: #f4f4f4;border-radius: 4px;display: flex;flex-direction:column;align-items:center;"
          :style="{cursor: item.val === '' ? 'not-allowed' : '',background: item.val === '' ? 'rgb(156 156 156)' : item.val > 0 ? '#d03c3c' : 'green'}">
            <div>
              {{ index + 1 }}
              </div>
            <div style="font-weight: 400;font-size:12px;">
              {{item.val > 0 ? '+' : ''}}{{item.val}}
            </div>
          </div>
        </div>
        <!-- 显示当前月的最后一天没有排到第35个格时，剩余的下月的日子 -->
        <div v-for="(item, index) in afterDays" style="background: #fff;color: #ccc;">
          <!-- {{ index + 1 }} -->
        </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalPrice: 0,
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      beforeDays: 0, // 上月还剩几天
      lastMonthDays: 0, // 上月共多少天
      curMonthDays: [], // 本月一共几天
      afterDays: 0, // 下月还剩几天
      currMonthIsWeek: 0, // 本月一号是周几
      controlsYear: new Date().getFullYear(), // 日期控制栏是多少年份
      controlsMonth: new Date().getMonth() + 1, // 日期控制栏是多少月份
      totalRow: 5, // 当前月份占几行
    }
  },
  props: {
    cusTitle: {
      type: Number,
      default: 0,
    },
    currYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
    currMonth: {
      type: Number,
      default: new Date().getMonth() + 1,
    },
    currDay: {
      type: Number,
      default: new Date().getDate(),
    },
  },
  mounted() {
    // 初始化日期选择器
    this.initDatePicker(this.controlsMonth);
  },
  methods: {
    clickItem(item, index){
      console.log('clickItem--', item, index, `${this.controlsYear}-${this.controlsMonth}-${index}`)
      this.$emit('aa', `${this.controlsYear}-${this.controlsMonth}-${index}`, item.val)
    },
    initDatePicker(month, yeah = new Date().getFullYear()) {
      const curMonthhaveDays = new Date(yeah, month, 0).getDate();
      this.lastMonthDays = new Date(yeah, month - 1, 0).getDate();
      // const aa = new Date('2022,03,01')
      // console.log(111, aa.getDay(), new Date('2022,3,1').getDay())
      this.currMonthIsWeek = new Date(`${yeah},${month},1`).getDay();
      this.beforeDays = this.currMonthIsWeek;
      this.totalRow = this.beforeDays + curMonthhaveDays > this.totalRow * 7 ? 6 : 5;
      this.afterDays = this.totalRow * 7 - this.currMonthIsWeek - curMonthhaveDays;
      const aa = Array(curMonthhaveDays).fill({}).map((item => {
        return {val: (Math.random()*(1900-1500) + (1500)).toFixed(2)}
      }))
      const bb = aa.map((item, index) => {
        const curSelecDate = new Date(this.controlsYear, this.controlsMonth - 1, index + 1)
        console.log('curSelecDate', curSelecDate)
        if (curSelecDate > new Date()) {
          return {val: ''}
        } else {
          return {val: (Math.random()*(1900-1500) + (1500)).toFixed(2)}
        }
      })
      console.log(aa, 'aa', bb)
      this.curMonthDays = bb
      const sumVal = this.curMonthDays.map(item => Number(item.val)).reduce((preval, curval) => preval + curval, 0)
      this.totalPrice = (sumVal / 10000).toFixed(2)
      console.log('this.totalPrice', this.totalPrice )
    },
    lastMonth() { // 点击上一月
      this.controlsMonth--;
      // 控制不可以选择过去的日子
      if (this.controlsYear == this.currYear && this.controlsMonth < this.currMonth) {
        // this.controlsMonth = this.currMonth;
      }
      if (this.controlsMonth < 1) {
        this.controlsMonth = 12;
        this.controlsYear--;
      }
      this.initDatePicker(this.controlsMonth, this.controlsYear);
    },
    nextMonth() { // 点击下一月
      this.controlsMonth++;
      if (this.controlsMonth > 12) {
        this.controlsMonth = 1;
        this.controlsYear++;
      }
      this.initDatePicker(this.controlsMonth, this.controlsYear);
    },
  }
}
</script>
<style lang="scss" scoped>

// $boxWidth: 50px; // 50px 单元格的宽度
// $invalidDateColor:  #ccc // 无效日期（过去的日子）的表示颜色
// 星期栏
.aaa {
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 12px 0 rgb(0, 0, 0, 0.1);
    transform: scale(1.2);  //鼠标经过的时候改变
  }
}
.week div:nth-child(1),
.week div:nth-last-child(1) {
  color: pink;
}
// 年月日前进、后退日期控制栏
.controls {
  display: flex;
  flex:1;
  justify-content: space-around;
  align-items: center;
  height: 48px; // 48px
  padding: 0 80px; // 80px
  border-bottom: 1px solid #f4f4f4;
  .el-button--small{
    min-height: 20px !important;
    padding: 2px 10px !important;
  }
}

</style>