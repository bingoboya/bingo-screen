import router from './index'
// import store from '@/store'
// import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// import { getToken } from '@/utils/auth' // getToken from cookie
// import { buildMenus } from '@/api/system/menu'
// import { filterAsyncRouter } from '@/store/modules/permission'
NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist
console.log(3);
router.beforeEach((to, from, next) => {
  console.log(2);
  NProgress.start()
  if (true) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // console.log('不去登陆页时--', store.getters.roles)
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        // console.log('binoooo', store.getters.roles)
        // alert(1)
        //  TODO 增加一个单独根据token获取用户信息的get接口
        store.dispatch('GetInfo').then(() => { // 拉取user_info
        // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      // 登录时未拉取 菜单，在此处拉取
      } else
      if (store.getters.loadMenus) {
        // console.log('登录时未拉取 菜单', store.getters.loadMenus);
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus')
        loadMenus(next, to)
      } else {
        // console.log('都不是--', store.getters.loadMenus)
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  // console.log('加载路由表')
  // 需要缓存的路由在 meta中配置 needCache: true 就可以， 不需要缓存的路由配置 needCache: false 或者不配置
  const menusBuild = [
    {
      path: '/sysmanage',
      component: 'Layout',
      redirect: 'noredirect',
      alwaysShow: true,
      name: 'sysmanage',
      meta: { activeName: 7, title: '系统管理', icon: 'menu' },
      children: [
        { // 用户管理
          path: '/accountmanage',
          hidden: false,
          component: 'sysmanage/user/index.vue',
          name: 'user-info',
          meta: { activeName: 7, needCache: false, icon: 'menu', title: '用户管理' }
        }
      ]
    },
    { // 审批流程
      path: '/approval',
      component: 'Layout',
      redirect: 'noredirect',
      alwaysShow: true,
      name: 'approval',
      meta: { activeName: 7, title: '工作空间', icon: 'menu' },
      children: [
        { // 任务列表
          path: 'tasklist',
          hidden: false,
          component: 'usermanage/approval/tasklistwrapper',
          name: 'task-list-wrapper',
          meta: { activeName: 7, icon: 'menu', title: '任务列表' }
        },
        { // 合同审批列表页
          path: 'contractapproval',
          hidden: false,
          component: 'usermanage/approval/contractlist',
          name: 'ContractApproval',
          meta: { activeName: 7, icon: 'menu', title: '合同审批' }
        },
        {// 合同审批详情页:流程id
          path: 'contractapprbase/:approval_id',
          hidden: true,
          component: 'usermanage/approval/contractapprbase.vue',
          name: 'contract-apprbase',
          meta: { activeName: 7, needCache: true, icon: 'menu', title: '合同审批详情' }
        }
      ]
    },
    {
      path: '/usermanage',
      component: 'Layout',
      redirect: 'noredirect',
      name: 'usermanage',
      meta: { activeName: 7, title: '数据管理', icon: 'menu' },
      children: [
        { // 合同信息
          path: 'contractinformation',
          component: 'usermanage/provincearea/contractinformation',
          name: 'provincearea-contractinformation',
          redirect: 'noredirect',
          meta: { activeName: 7, icon: 'menu', title: '合同信息' },
          children: [
            {
              path: 'salecontract',
              component: 'usermanage/provincearea/contractinformation/salecontract',
              name: 'contractinformation-salecontract',
              meta: { activeName: 7, icon: 'menu', title: '售电合同' }
            },
            {
              path: 'buycontract',
              component: 'usermanage/provincearea/contractinformation/buycontract',
              name: 'Bingobuycontract',
              meta: { activeName: 7, icon: 'menu', title: '购电合同' }
            },
            {
              // 购电-合同详情 TODO
              path: 'contractindetail/:contract_id',
              hidden: true,
              component: 'usermanage/provincearea/contractinformation/buycontract/contractindetail',
              // name: 'Bingoboy',
              name: 'contractinformation-contractindetail',
              meta: { activeName: 7, needCache: true, icon: 'menu', title: '合同详情' }
            },
            {
              // 售电-合同详情
              path: 'salecontractindetail/:contract_id',
              hidden: true,
              component: 'usermanage/provincearea/contractinformation/salecontract/contractindetail',
              name: 'contractinformation-salecontractindetail',
              meta: { activeName: 7, needCache: true, icon: 'menu', title: '合同详情' }
            }
          ]
        },
        { // 机构信息
          path: 'institutioninfo',
          hidden: false,
          component: 'usermanage/provincearea/institutionalinformation',
          name: 'institution-info',
          meta: { activeName: 7, icon: 'menu', title: '机构信息' }
        },
        {// 机构基本信息页面
          path: 'institutbaseinfo/:institut_id',
          hidden: true,
          component: 'usermanage/provincearea/institutionalinformation/institutbaseinfo.vue',
          name: 'institut-baseinfo',
          meta: { activeName: 7, needCache: true, icon: 'menu', title: '机构基本信息' }
        },
        {// 户表基本信息页面
          path: 'userlistbaseinfo/:userlist_id',
          hidden: true,
          component: 'usermanage/provincearea/institutionalinformation/userlistbaseinfo.vue',
          name: 'userlist-baseinfo',
          meta: { activeName: 7, needCache: true, icon: 'menu', title: '户表基本信息' }
        },
        { // 市场规则信息
          path: 'marketruleinfo',
          hidden: true,
          component: 'usermanage/provincearea/marketruleinformation',
          name: 'marketrule-info',
          meta: { activeName: 7, icon: 'menu', title: '市场规则信息' }
        },
        { // 市场规则信息详情
          path: 'marketruledetail/:marketrule_id',
          hidden: true,
          component: 'usermanage/provincearea/marketruleinformation/marketruledetail.vue',
          name: 'marketrule-detail',
          meta: { activeName: 7, needCache: true, icon: 'menu', title: '市场规则信息详情' }
        },
        { // 居间人
          path: 'intersogueinfo',
          hidden: false,
          component: 'usermanage/provincearea/intersogueinformation',
          name: 'intersogue-info',
          meta: { activeName: 7, icon: 'menu', title: '居间人' }
        },
        {// 居间人基本信息
          path: 'interbaseinfo/:article_id',
          hidden: true,
          component: 'usermanage/provincearea/intersogueinformation/interbaseinfo.vue',
          name: 'inter-baseinfo',
          meta: { activeName: 7, needCache: true, icon: 'menu', title: '居间人基本信息' }
        },
        { // 常用曲线管理
          path: 'curvemanagement',
          hidden: false,
          component: 'usermanage/provincearea/curvemanagement',
          name: 'curve-management',
          // redirect: 'noredirect',
          meta: { activeName: 7, icon: 'menu', title: '常用曲线管理' }
          // children: [
          //   {
          //     path: 'curvemanagementsearch',
          //     component: 'usermanage/curvemanagement/curvemanagementsearch',
          //     name: 'curvemanagement-curvemanagementsearch',
          //     meta: { activeName: 7, icon: 'menu', title: '常用曲线查询' }
          //   },
          //   {
          //     path: 'mycurvemanagement',
          //     component: 'usermanage/curvemanagement/mycurvemanagement',
          //     name: 'curvemanagement-mycurvemanagement',
          //     meta: { activeName: 7, icon: 'menu', title: '我的常用曲线' }
          //   }
          // ]
        }
      ]
    },
    {
      path: '/crm',
      component: 'Layout',
      redirect: 'noredirect',
      name: 'crm',
      meta: { activeName: 7, title: 'CRM系统', icon: 'menu' },
      children: [
        // {
        //           path: 'crmnav',
        //           hidden: false,
        //           component: 'usermanage/crmsystem/crmnav',
        //           name: 'crmsystem-crmnav',
        //           meta: { activeName: 7, icon: 'menu', title: 'CRM导航页' }
        //         },
        //         {
        //           path: 'marketinfomanage',
        //           hidden: false,
        //           component: 'usermanage/crmsystem/marketinfomanage',
        //           name: 'crmsystem-marketinfomanage',
        //           meta: { activeName: 7, icon: 'menu', title: '主体信息维护' },
        //           children: [
        {
          path: 'user',
          hidden: false,
          component: 'usermanage/crmsystem/marketinfomanage/user',
          name: 'marketinfomanage-user',
          meta: { activeName: 7, icon: 'menu', title: '用户信息' }
        },
        {
          path: 'medium',
          hidden: false,
          component: 'usermanage/crmsystem/marketinfomanage/medium',
          name: 'marketinfomanage-medium',
          meta: { activeName: 7, icon: 'menu', title: '居间人信息' }
        },
        {
          path: 'plant',
          hidden: false,
          component: 'usermanage/crmsystem/marketinfomanage/plant',
          name: 'marketinfomanage-plant',
          meta: { activeName: 7, icon: 'menu', title: '电厂信息' }
        }
        // {
        //   path: 'charts',
        //   hidden: false,
        //   component: 'usermanage/crmsystem/marketinfomanage/charts',
        //   name: 'marketinfomanage-charts',
        //   meta: { activeName: 7, icon: 'menu', title: '驾驶舱' }
        // }
        // ]
        // },
        // {
        //   path: 'workplanexamine',
        //   hidden: false,
        //   component: 'usermanage/crmsystem/workplanexamine',
        //   name: 'crmsystem-workplanexamine',
        //   meta: { activeName: 7, icon: 'menu', title: '工作计划查看与审批' }
        // },
        // {
        //   path: 'workplansummary',
        //   hidden: false,
        //   component: 'usermanage/crmsystem/workplansummary',
        //   name: 'crmsystem-workplansummary',
        //   meta: { activeName: 7, icon: 'menu', title: '工作计划与总结' }
        // }, {
        //   path: 'statistiek',
        //   hidden: false,
        //   component: 'usermanage/crmsystem/statistiek',
        //   name: 'crmsystem-statistiek',
        //   meta: { activeName: 7, icon: 'menu', title: '数据统计' }
        // }
      ]
    }
  ]

  buildMenus().then(res => {
    // TODO 临时写死路由
    // res = menusBuild
    const sdata = JSON.parse(JSON.stringify(res))
    const rdata = JSON.parse(JSON.stringify(res))
    const rewriteRoutes = filterAsyncRouter(rdata, true)
    const sidebarRoutes = filterAsyncRouter(sdata)
    rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })

    // console.log('动态添加可访问路由表:', rewriteRoutes)
    // console.log('侧边蓝路由表:-', sidebarRoutes)

    store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
      router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
    store.dispatch('SetSidebarRouters', sidebarRoutes)
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
