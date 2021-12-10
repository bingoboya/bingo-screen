<template>
  <a-menu v-model:selectedKeys="current" @select="handleSelect" mode="horizontal">
    <a-menu-item key="/dashboard">
      <template #icon>
        <mail-outlined />
      </template>
      主页
    </a-menu-item>
    <a-menu-item key="/datamon">
      <template #icon>
        <appstore-outlined />
      </template>
      数据监控
    </a-menu-item>
    <a-menu-item key="app1" disabled>
      <template #icon>
        <appstore-outlined />
      </template>
      优化调度
    </a-menu-item>
    <a-menu-item key="app2" disabled>
      <template #icon>
        <appstore-outlined />
      </template>
      储能损益
    </a-menu-item>
    <a-menu-item key="app3" disabled>
      <template #icon>
        <appstore-outlined />
      </template>
      警告信息
    </a-menu-item>
    <a-menu-item key="/user">
      <template #icon>
        <SettingOutlined />
      </template>
      用户
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { onBeforeRouteUpdate } from "vue-router";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
const route = useRoute()
const router = useRouter()
const routeName = toRaw(route).query.value.name
const current = ref(['/dashboard']);
onBeforeRouteUpdate((to, from) => {
  console.log(to, from, "=====", to.query.name);
})
// current.value = routeName === '/datamon' ? ['/datamon'] : [selectedKeys]
// const computRoute = computed(() => route.query)
watchEffect(() => {
  const routePath = toRaw(route).path.value
  const includdatamon = routePath.includes('/datamon')
  console.log('watchEffect路由', routePath, includdatamon);
  // 只要切换路由时，新的路由中没有 ‘/datamon’,说明跳出【数据监控】模块的路由，需要清除控制默认打开侧边栏的cookie
  !includdatamon && window.sessionStorage.removeItem('openpenkey')
  current.value = includdatamon ? ['/datamon'] : [routePath]
})
const handleSelect = (key, keyPath) => {
  router.push({
    path: key.key,
    query: {
      name: key.key
    }
  })
}
</script>

<style lang="scss" scoped>
</style>