import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Layout from 'views/Layout.vue'



export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '主页' },
    hidden: false,
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ 'views/Dashboard/index.vue'),
        name: 'Dashboard',
        meta: { activeName: 7, title: '首页', icon: 'index', affix: true, noCache: true }
      },
      {
        path: 'user',
        component: () => import( /* webpackChunkName: "UserInfo" */ 'views/UserInfo/index.vue'),
        hidden: false,
        meta: { activeName: 7, title: '个人中心' },
      },
      {
        path: '/warnmsg',
        component: () => import( /* webpackChunkName: "UserInfo" */ 'views/WarnMsg/index.vue'),
        hidden: false,
        meta: { activeName: 7, title: '警告信息' },
      },
      {
        path: 'datamon',
        component: () => import('views/DataMoniter/index.vue'),
        hidden: false,
        redirect: '/datamon/moniterall',
        meta: { activeName: 7, title: '数据监控' },
        children: [
          {
            path: 'moniterall',
            component: () => import('components/Moniterall/index.vue'),
            name: 'Moniterall',
            meta: { activeName: 7, title: '监控全局', icon: 'index', affix: true, noCache: true }
          },
          {
            path: 'moniterpcs',
            component: () => import('components/Moniterpcs/index.vue'),
            name: 'Moniterpcs',
            meta: { activeName: 7, title: '监控PCS', icon: 'index', affix: true, noCache: true }
          },
          {
            path: 'moniterbms',
            component: () => import('components/Moniterbms/index.vue'),
            name: 'Moniterbms',
            meta: { activeName: 7, title: '监控BMS', icon: 'index', affix: true, noCache: true }
          },
          {
            path: 'moniterbattery',
            component: () => import('components/Moniterbattery/index.vue'),
            name: 'Moniterbattery',
            meta: { activeName: 7, title: '监控电池簇', icon: 'index', affix: true, noCache: true }
          },

          {
            path: 'searchall',
            component: () => import('components/Searchall/index.vue'),
            name: 'Searchall',
            meta: { activeName: 7, title: '查询全局', icon: 'index', affix: true, noCache: true }
          },
          {
            path: 'searchpcs',
            component: () => import('components/Searchpcs/index.vue'),
            name: 'Searchpcs',
            meta: { activeName: 7, title: '查询PCS', icon: 'index', affix: true, noCache: true }
          },
          {
            path: 'searchbms',
            component: () => import('components/Searchbms/index.vue'),
            name: 'Searchbms',
            meta: { activeName: 7, title: '查询BMS', icon: 'index', affix: true, noCache: true }
          },
          {
            path: 'searchbattery',
            component: () => import('components/Searchbattery/index.vue'),
            name: 'Searchbattery',
            meta: { activeName: 7, title: '查询电池簇', icon: 'index', affix: true, noCache: true }
          },
          {
            path: 'datarange',
            component: () => import('components/DataRange/index.vue'),
            name: 'Datarange',
            meta: { activeName: 7, title: '区间数据', icon: 'index', affix: true, noCache: true }
          },
          // {
          //   path: 'demo',
          //   component: () => import('components/Demo/index.vue'),
          //   name: 'demo',
          //   meta: { activeName: 7, title: 'demo', icon: 'index', affix: true, noCache: true }
          // },
          {
            path: 'easydemo',
            component: () => import('components/Demo/easydemo.vue'),
            name: 'easydemo',
            meta: { activeName: 7, title: 'demo', icon: 'index', affix: true, noCache: true }
          }
        ]
      }
    ]
  },
  
  {
    path: '/login',
    meta: { activeName: 7, title: '登录', noCache: true},
    component: () => import( /* webpackChunkName: "Login" */ 'views/Login.vue'),
    hidden: false
  },
  {
    path: '/404',
    component: () => import( /* webpackChunkName: "404" */ 'components/common/404.vue'),
    hidden: false,
    meta: { activeName: 7}
  },
  {
    path: '/401',
    component: () => import( /* webpackChunkName: "401" */ 'components/common/401.vue'),
    hidden: false,
    meta: {activeName: 7}
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap
})

export default router