<template>
  <div>
    login
    <a-button @click="goHome" type="primary">回首页</a-button>
  </div>
  
</template>

<script setup>
import request from '@/utils/request'
import {Local} from '@/utils/storage'
import qs from 'qs'
import _ from 'lodash'
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
  const query = {name: 'bingo'}
  request({
    url: `/weather/login?${qs.stringify(query)}`,
    method: 'get'
  }).then((res)=>{
    console.log('res', res)
  })
})
</script>

<style lang="scss" scoped>

</style>