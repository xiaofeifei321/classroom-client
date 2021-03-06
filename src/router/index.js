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
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/register', component: () => import('@/views/register/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '主页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/classroom',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Classroom',
        component: () => import('@/views/classroom/index'),
        meta: { title: '班级管理', icon: 'cm-icon-flag' }
      },
      {
        path: ':id(\\d+)',
        name: 'Student',
        component: () => import('@/views/student/index'),
        meta: { title: '学生管理', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/sign-task',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'SignTask',
        component: () => import('@/views/sign-task/index'),
        meta: { title: '考勤管理', icon: 'cm-icon-notification' }
      },
      {
        path: ':id(\\d+)',
        name: 'SignIn',
        component: () => import('@/views/sign/index'),
        meta: { title: '签到任务', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/homework-task',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'HomeworkTask',
        component: () => import('@/views/homework-task/index'),
        meta: { title: '作业管理', icon: 'cm-icon-detail' }
      },
      {
        path: ':id(\\d+)',
        name: 'Homework',
        component: () => import('@/views/homework/index'),
        meta: { title: '作业任务', noCache: true },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
