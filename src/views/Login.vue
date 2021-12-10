<template>
  <div>
    login
    <a-button @click="goHome" type="primary">回首页</a-button>
  </div>
  
</template>

<script setup>
import request from '@/utils/request'
import {Local} from '@/utils/storage'
// const { appContext: {config: {globalProperties: { $request }}} } = getCurrentInstance()
// console.log(5525,$request, getCurrentInstance())
const router = useRouter()
const goHome = () => {
  router.push('/')
}
onMounted(() => {
  Local.setItem('age1', 202)
  Local.setItem('age1', 203)
  Local.setItem('userinfo', {age: 30, name: 'jack'})
  request.get('/login', {name: 'bingo'}).then((res)=>{
    console.log('res', res)
  })
})
</script>

<style lang="scss" scoped>

</style>