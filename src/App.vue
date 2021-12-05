


<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <el-config-provider :locale="locale">
      <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>
