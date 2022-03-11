<template>
  <div class="home-wrapper">
    <div class="home-top">
      <div class="logo-wrapper" style>
        <!-- <HomeOutlined /> -->
        <div>
          <img alt="wly" style="width: 32px;height:32px;" :src="Logo" />
        </div>
        <div class="logo-text">万里扬-数据监控</div>
      </div>
        <div class="nav_wrapper">
          <NavWrapper />
        </div>
        <!-- 选择站点 -->
      <!-- <div class="change_position">
        <a-select
          v-model:value="selectValue"
          style="width: 200px"
          :options="options"
          @select="handleSelect"
          placeholder="选择站点"
        />
      </div> -->
      <div class="user_dropdown">
        <UserDropdown />
      </div>
    </div>
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import UserDropdown from 'components/UserDropdown/index.vue'
import Logo from '@/assets/logo.png'
// import { HomeOutlined } from '@ant-design/icons-vue';
import NavWrapper from './NavWrapper/index.vue'

// const socket = inject("socket");
// socket.on("connection", (res) => {
//   console.log("#connection: ", res);
// });
// socket.on("sendmsgtoclientlayout", (res) => {
//   console.log("#sendmsgtoclientlayout: ", res);
// });
// setTimeout(() => {
//   console.log('发送信息');
//   socket.emit('message', 232323)
// }, 4000);
console.log('asdasdas')




const selectValue = ref(undefined)
const router = useRouter()
const handleSelect = (val) => {
  console.log(val);
  router.push(val)
}

const options = ref([
  {
    value: '/user',
    label: '金华储能1',
    route: '/user'
  },
  {
    value: '/',
    label: '金华储能2',
    route: '/'
  },
  {
    value: '/datamon',
    label: '金华储能3',
    route: '/datamon'
  },
])
// let homeLeftWidth = ref('200px')
// setTimeout(() => {
//   homeLeftWidth.value = '300px'
// }, 2000);
</script>

<style lang="scss" scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  .home-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    width: 100%;
    // height: 40px;
    padding: 10px 20px 0;
    // width: v-bind('homeLeftWidth');
    .logo-wrapper {
      min-width: 184px;
      align-items: center;
      display: flex;
      height: 100%;
      .logo-text {
        font-size: 18px;
        font-weight: 800;
        white-space: nowrap;
      }
    }

    .nav_wrapper {
      min-width: 0;
      flex:1;
      height: 100%;
      .ant-menu-horizontal {
        border-bottom: none;
        display: flex;
        justify-content: center;
      }
    }
    .change_position {
      align-items: center;
      display: flex;
      .prefix {
        border-radius: 3px 0 0 3px !important;
        height: calc(100% - 2px);
        padding: 0 14px;
        color: rgb(31, 27, 27);
        background: rgb(187, 185, 185);
      }
      :deep(.el-input__prefix) {
        left: 1px !important;
      }
    }
  }
  .home-nav {
    height: 40px;
    background: rgb(126, 113, 113);
  }
  .content-wrapper {
    // padding: 10px;
    width: 100%;
    overflow: hidden;
    flex: 1;
    display: flex;
    // background: rgb(231, 228, 228)
    // background: #f0f2f5;
  }
}
</style>