<template>
  <div>login</div>
  <el-button @click="goHome">{{$abc}}回首页</el-button>
</template>

<script setup>
import request from '@/utils/request'
// import { useRouter, useRoute } from 'vue-router'
// const { appContext: {config: {globalProperties: { $request }}} } = getCurrentInstance()
// console.log(5525,$request, getCurrentInstance())
const router = useRouter()
const goHome = () => {
  router.push('/')
}
onMounted(() => {
  request.get('/login', {name: 'bingo'}).then((res)=>{
    console.log(res)
  })
})
</script>

<style lang="scss" scoped>

</style>