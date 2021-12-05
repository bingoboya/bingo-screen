


<template>
  <el-button type="primary" @click="changeRoute">切换到s路由</el-button>
  <el-button @click="$store.commit('add')">点击加价</el-button>
  <HelloWorldVue />
  {{$store.state.counter}}
  <HelloWorldVues />
  <el-date-picker v-model="value1" type="date" placeholder="Pick a day" />
</template>

<script setup>
import HelloWorldVue from './HelloWorld.vue'
import HelloWorldVues from './HelloWorlds.vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons'
import { watch } from '@vue/runtime-core'

const router = useRouter()
const route = useRoute()

const value1 = ref('')
watch(value1, (n, o) => {
  console.log('舰艇value1', n, o);
})
const aa = () => {
  console.log(2);
}
const changeRoute = () => {
  router.push({
    name: 'sow',
    query: {
      'age': 23
    }
  })
  // router.push('/hellows')
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .test{
    color: red
  }
}
</style>
