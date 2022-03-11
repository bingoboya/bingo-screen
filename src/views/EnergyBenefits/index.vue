<template>
  <a-tabs v-model:activeKey="state.activeKey" type="card" style="width: 100%;">
    <a-tab-pane :key="1" tab="日收益" style="height: 100%;">
      <BenefitCom v-if="state.activeKey === 1" :dataType="'day'" />
    </a-tab-pane>
    <a-tab-pane :key="2" tab="月收益">
      <BenefitCom v-if="state.activeKey === 2" :dataType="'month'" />
    </a-tab-pane>
    <a-tab-pane :key="3" tab="年收益">
      <BenefitCom v-if="state.activeKey === 3" :dataType="'year'" />
    </a-tab-pane>
  </a-tabs>
  <!-- <BenefitCom /> -->
</template>

<script setup>
import request from '@/utils/request'
import qs from 'qs'
import BenefitCom from './BenefitCom.vue'
const state = reactive({
  activeKey: 1
})
</script>
<style lang="scss">
.ant-tabs-content {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.echart-wrapper {
  flex: 1;
  margin: 0 10px;
  background: #edeaea;
  border-radius: 8px;
}
</style>