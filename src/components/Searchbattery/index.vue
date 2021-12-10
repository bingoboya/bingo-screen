<template>
  <div class="moniterpcs_wrapper">
    <div class="pcs_top">
      <div>
        <a-range-picker v-model:value="state.value11" :locale="locale" show-time />
        <a-select
          v-model:value="state.value1"
          mode="multiple"
          style="width: 300px"
          allowClear
          placeholder="电池簇#01~06（下拉选择、可多选）"
          :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
        />
        <a-select
          v-model:value="state.value2"
          style="width: 300px"
          allowClear
          placeholder="设备名称（单选）"
          :options="[...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))"
        />
        <a-input v-model:value="state.value3" placeholder="数据查找" allowClear />
      </div>
    </div>

    <div class="pcs_bottom">
      <div>
        <div style="border-bottom: 1px solid;">遥测量</div>
        <div style="display: flex;">
          <div>电池簇#01</div>
          <div class="system-wrapper">
            <div class="custom-card" v-for="(item, index) in state.energyRunCart" :key="index">
              <div class="custom-card-header">
                <div style="height: 10px;font-size:12px;">{{ item.title }}</div>
                <div style="height: 10px;font-size:12px;">KW</div>
              </div>
              <div class="custom-card-content">{{ item.number }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex;">
          <div>电池簇#02</div>
          <div class="system-wrapper">
            <div class="custom-card" v-for="(item, index) in state.energyRunCart" :key="index">
              <div class="custom-card-header">
                <div style="height: 10px;font-size:12px;">{{ item.title }}</div>
                <div style="height: 10px;font-size:12px;">KW</div>
              </div>
              <div class="custom-card-content">{{ item.number }}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style="border-bottom: 1px solid;">遥信量</div>
        <div style="display: flex;">
          <div>电池簇#01</div>
          <div class="system-wrapper">
            <div class="custom-card" v-for="(item, index) in state.energyRunCart" :key="index">
              <div class="custom-card-header">
                <div style="height: 10px;font-size:12px;">{{ item.title }}</div>
                <div style="height: 10px;font-size:12px;">KW</div>
              </div>
              <div class="custom-card-content">{{ item.number }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex;">
          <div>电池簇#02</div>
          <div class="system-wrapper">
            <div class="custom-card" v-for="(item, index) in state.energyRunCart" :key="index">
              <div class="custom-card-header">
                <div style="height: 10px;font-size:12px;">{{ item.title }}</div>
                <div style="height: 10px;font-size:12px;">KW</div>
              </div>
              <div class="custom-card-content">{{ item.number }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import request from '@/utils/request';
const state = reactive({
  value1: [],
  value2: null,
  value3: null,
  value11: [],
  energyRunCart: []
})
const getData = () => {
  request.get('/dashboarddata', { name: 'bingo' }).then((res) => {
    // console.log('getData', res.energyRun.runCart);
    state.energyRunCart = res.energyRun.runCart
  })
}
getData()
let task = setInterval(() => {
  getData()
}, 3000)
watch([() => state.value1, () => state.value2, () => state.value3, () => state.value11], (n, o) => {
  console.log('watch--日期', n, !!(n[0]), !!(n[1]), !!(n[2]), !!(n[3]));
  const hasn0 = (!!(n[0]) && Object.keys(n[0]).length !== 0)
  const hasn1 = !!(n[1])
  const hasn2 = !!(n[2])
  const hasn3 = (!!(n[3]) && Object.keys(n[3]).length !== 0)
  if(hasn0 || hasn1 || hasn2 || hasn3) {
    console.log('至少还有一个有值, 关闭定时')
    if(task){
      clearInterval(task)
    }
  }else{
    console.log('都没有值, 开启定时器', task)
    if(task) {
      clearInterval(task)
    }
      task = setInterval(() => {
        getData()
      }, 3000)
  }
})
onUnmounted(() => {
  clearInterval(task)
})
</script>

<style lang="scss" scoped>
.system-wrapper {
  flex: 1;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px 10px;
  // grid-auto-rows: 50px;
}
.moniterpcs_wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .pcs_top {
    padding-right: 10px;
    // background-color: aquamarine;
  }
  .pcs_bottom {
    padding-right: 10px;
    // background-color: rgb(118, 139, 132);
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>