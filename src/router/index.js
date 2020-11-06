import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/

export const constantRouterMap = [{
  path: '/login',
  component: () =>
    import ('@/views/login/index'),
  hidden: true
},
  {
    path: '/404',
    component: () =>
      import ('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {title: '首页', icon: 'homeMenu'},
    children: [{
      path: 'dashboard',
      name: 'DashboardIndex',
      meta: {title: '首页', affix: true},
      component: () =>
        import ('@/views/dashboard/index')
    }]
  },
 {
    path: '/projectFiles',
    component: Layout,
    redirect: '/projectFiles/projectFiles',
    name: 'projectFiles',
    meta: {title: '项目档案 ', icon: 'monthMenu'},
    children: [
      {
      path: 'projectFiles',
      name: 'projectFiles',
      meta: {title: '项目档案'},
      component: () =>
        import ('@/views/projectFiles/projectFiles')
     },
    {
      path: 'edit',
      component: () => import('@/views/projectFiles/edit'),
      name: 'projectsEdit',
      meta: {
        title: '项目编辑',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'create',
      component: () => import('@/views/projectFiles/create'),
      name: 'projectsCreate',
      meta: {
        title: '项目添加',
        noCache: true
      },
      hidden: true
    },
   ]
  },
 {
    path: '/resourceScheduling',
    component: Layout,
    redirect: '/resourceScheduling/resourceScheduling',
    name: 'resourceScheduling',
    meta: {title: '资源排程 ', icon: 'monthMenu'},
    children: [{
      path: 'resourceScheduling',
      name: 'resourceScheduling',
      meta: {title: '资源排程'},
      component: () =>
        import ('@/views/resourceScheduling/resourceScheduling')
    }]
  },
  {
    path: '/projectPlan',
    component: Layout,
    redirect: '/projectPlan/projectPlan',
    name: 'projectPlan',
    meta: {title: '项目计划 ', icon: 'monthMenu'},
    children: [{
      path: 'projectPlan',
      name: 'projectPlan',
      meta: {title: '项目计划'},
      component: () =>
        import ('@/views/projectPlan/projectPlan')
    }]
  },
  {
    path: '/logManagement',
    component: Layout,
    redirect: '/logManagement/logManagement',
    name: 'logManagement',
    meta: {title: '日志管理', icon: 'monthMenu'},
    children: [
      {
      path: 'logManagement',
      name: 'logManagement',
      meta: {title: '日志管理'},
      component: () =>
        import ('@/views/logManagement/logManagement')
      },
      {
        path: 'edit',
        component: () => import('@/views/logManagement/edit'),
        name: 'logManagementEdit',
        meta: {
          title: '日志编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'create',
        component: () => import('@/views/logManagement/create'),
        name: 'logManagementCreate',
        meta: {
          title: '日志添加',
          noCache: true
        },
        hidden: true
      },
    ]
  },
  {
    path: '/logCalender',
    component: Layout,
    redirect: '/logCalender/logCalender',
    name: 'logCalender',
    meta: {title: '日志日历 ', icon: 'monthMenu'},
    children: [{
      path: 'logCalender',
      name: 'logCalender',
      meta: {title: '日志日历'},
      component: () =>
        import ('@/views/logCalender/logCalender')
    }]
  },
  {
    path: '/taskSheet',
    component: Layout,
    redirect: '/taskSheet/taskSheet',
    name: 'taskSheet',
    meta: {title: '任务单 ', icon: 'monthMenu'},
    children: [{
      path: 'taskSheet',
      name: 'taskSheet',
      meta: {title: '任务单'},
      component: () =>
        import ('@/views/taskSheet/taskSheet')
      },
      {
        path: 'edit',
        component: () => import('@/views/taskSheet/edit'),
        name: 'taskSheetEdit',
        meta: {
          title: '任务编辑',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'create',
        component: () => import('@/views/taskSheet/create'),
        name: 'taskSheetCreate',
        meta: {
          title: '任务添加',
          noCache: true
        },
        hidden: true
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
