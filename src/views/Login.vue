<template>
  <div>login</div>
  <el-button @click="goHome">回首页</el-button>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>

</style>