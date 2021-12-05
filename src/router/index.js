import {createRouter, createWebHistory} from 'vue-router'

import Home from 'views/Home.vue'
import Welcome from 'views/Welcome.vue'


const constantRouterMap = [
  {
    name: 'home',
    path: '/', 
    meta: {title: '首页'},
    component: Home,
    redirect: 'welcome',
    children: [
      {name: 'welcome', meta: {title: '欢迎'}, path: '/welcome', component: Welcome},
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   meta: { activeName: 7 },
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: (resolve) => require(['@/views/home'], resolve),
  //       name: 'Dashboard',
  //       meta: { activeName: 7, title: '首页', icon: 'index', affix: true, noCache: true }
  //     }
  //   ]
  // },
  { 
    path: '/login',
    meta: { activeName: 7, title: '登录', noCache: true },
    component: () => import(/* webpackChunkName: "Login" */ 'views/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ 'views/features/404.vue'),
    hidden: true,
    meta: { activeName: 7 }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ 'views/features/401.vue'),
    hidden: true,
    meta: { activeName: 7 }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap
})

export default router